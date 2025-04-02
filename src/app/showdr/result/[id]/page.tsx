'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFirestore, collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import app  from '../../../../../lib/utils/firebaseConfig'; // Adjust the path to your firebaseConfig
import toast from 'react-hot-toast';
import axios from 'axios';

export default function UploadAndProcess() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [level, setLevel] = useState('');
  const [percentage, setPercentage] = useState('');
  const params = useParams();
  const router = useRouter();
  const db = getFirestore(app);
  const patientId = params.id;
  const [isLoading, setIsLoading]=useState(true);

  const [prediction, setPrediction] = useState<{ predicted_class: string; accuracy: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds compulsory loading

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data);
      setLevel(response.data?.predicted_class || "");
      var accuracy_string = `${prediction?.accuracy}`;
      setPercentage(accuracy_string);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image.');
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async () => {
    if (!selectedImage || !level || !percentage) {
      toast.error('Please upload an image and fill in level and percentage.');
      return;
    }

    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

      const patientDocRef = doc(db, 'patients', patientId as string);

      await updateDoc(patientDocRef, {
        drHistory: arrayUnion({
          date: currentDate,
          time: currentTime,
          level: level,
          percentage: percentage,
        }),
      });
      toast.success("Patient data logged successfully!");
      router.push(`/patient/${patientId}`);

      // Navigate to the result page
      // router.push(`/showdr/result/${patientId}`);

    } catch (error) {
      console.error('Error updating Firestore:', error);
      toast.error('Failed to update data. Please try again.');
    }
  };
  if(isLoading){
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
       <span className="loading loading-infinity loading-xl"></span><strong>DoctorDR </strong>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
    <ul className="steps steps-horizontal lg:steps-horizontal flex justify-center mb-4">
      <li className="step step-primary">Select</li>
      <li className="step step-primary">Run & Log</li>
      </ul>

      <p className="mx-9 mb-4 text-4xl font-bold text-gray-900 dark:text-white">Step 2: Upload Eye Image</p>
      <div className="flex justify-center">
        <input type="file" className="file-input file-input-success" onChange={handleImageChange} />
      </div>
      <div className="flex justify-center mt-7">
        <button className="btn btn-soft btn-success" onClick={handleUpload}>
          Run ML Model
        </button>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Level</legend>
        <input
          disabled
          type="text"
          placeholder="Level"
          className="input input-bordered w-full max-w-xs mb-2"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Percentage</legend>
        <input
          disabled
          type="text"
          placeholder="Percentage"
          className="input input-bordered w-full max-w-xs"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        </fieldset>
      </div>
      <div className="flex justify-center mt-7">
        <button className="btn btn-soft btn-success" onClick={handleProceed}>
          Log data
        </button>
      </div>
    </div>
  );
}