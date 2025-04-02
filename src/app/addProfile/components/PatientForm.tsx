// components/PatientForm.tsx
"use client";

import { useState, useEffect } from "react";
import db  from "../../../../lib/utils/firestore";
import { collection, addDoc } from "firebase/firestore";
import {toast} from 'react-hot-toast';
import { useRouter } from "next/navigation"; 

type Medication = {
  drug: string;
  dosage: string;
};

type Vaccination = {
  vaccination: string;
  date: string;
};
type DR = {
  date: string;
  time: string;
  level: string;
  percentage: string;
};

const PatientForm = () => {
  const router = useRouter();

  const [picture, setPicture] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [medicationHistory, setMedicationHistory] = useState<Medication[]>([]);
  const [allergies, setAllergies] = useState<string>("");
  const [vaccinationHistory, setVaccinationHistory] = useState<Vaccination[]>([]);
  const [drHistory, setdrHistory] = useState<DR[]>([]);
  const [lifestyleRemark, setLifestyleRemark] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds compulsory loading

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);


  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPicture(event.target.files[0]);
    }
  };

  const handleVaccinationChange = (index: number, field: keyof Vaccination, value: string) => {
    const newVaccinationHistory = vaccinationHistory.map((vaccination, i) => {
      if (i === index) {
        return { ...vaccination, [field]: value };
      }
      return vaccination;
    });
    setVaccinationHistory(newVaccinationHistory);
  };

  const handleMedChange = (index: number, field: keyof Medication, value: string) => {
    const newMedHistory = medicationHistory.map((medication, i)=>{
      if(i==index){
        return {...medication, [field]: value};
      }
      return medication;
    });
    setMedicationHistory(newMedHistory);
  };

  const handleAddVaccination = () => {
    setVaccinationHistory([...vaccinationHistory, { vaccination: "", date: "" }]);
  };

  const handleAddMed = () => {
    setMedicationHistory([...medicationHistory, {drug: "", dosage: ""}]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!picture || !fullName || !gender || !phoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const pictureBase64 = await convertToBase64(picture);

    const patientData = {
      picture: pictureBase64,
      fullName,
      dob,
      gender,
      phoneNumber,
      medicationHistory,
      allergies,
      vaccinationHistory,
      lifestyleRemark,
      drHistory
    };

    try {
      await addDoc(collection(db, "patients"), patientData);
      toast.success("Patient data submitted successfully!");
      router.push('/');
    } catch (error) {
      console.error("Error submitting patient data: ", error);
      toast.error("Error submitting patient data.");
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  if(isLoading){
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
       <span className="loading loading-infinity loading-xl"></span> <strong>DoctorDR </strong>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-7 bg-black shadow-md rounded-3xl mt-6 mb-3">
        <p className="my-3 mb-4 text-4xl font-bold text-gray-900 dark:text-white">Add Patient</p>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Full Name</legend>
        <input
          placeholder="(eg. John Doe)"
          className="input"
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <p className="fieldset-label">
        <span className="text-red-500">*</span> mandatory</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Date of Birth</legend>
        <input
              className="input"
              type="date"
              value={dob}
              onChange={(e) => {setDob(e.target.value)}}
            />
        <p className="fieldset-label">
          <span className="text-red-500">*</span> mandatory</p>
        </fieldset>
      
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Select Gender</legend>
        <select
          className="select"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <p className="fieldset-label">
          <span className="text-red-500">*</span> mandatory</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Phone No.</legend>
        <input
          className="input"
          type="tel"
          placeholder="(without country code)"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <p className="fieldset-label">
        <span className="text-red-500">*</span> mandatory</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Allergies</legend>
        <input
          className="input"
          type="text"
          id="allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Lifestyle Remark</legend>
        <input
          className="input"
          type="text"
          id="lifestyleRemark"
          value={lifestyleRemark}
          onChange={(e) => setLifestyleRemark(e.target.value)}
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Medications</legend>
        {medicationHistory.map((medication, index) => (
          <div key={index} className="mb-2">
            <input
              className="input"
              type="text"
              placeholder="Enter the Drug"
              value={medication.drug}
              onChange={(e) => handleMedChange(index, "drug", e.target.value)}
            />
            <div className="mt-2">
            <input
              className="input"
              type="text"
              placeholder="Enter the Dosage"
              value={medication.dosage}
              onChange={(e) => handleMedChange(index, "dosage", e.target.value)}
            />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline btn-primary"
          onClick={handleAddMed}
        >
          Add Medication
        </button>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Vaccinations</legend>
        {vaccinationHistory.map((vaccination, index) => (
          <div key={index} className="mb-2">
            <input
              className="input"
              type="text"
              placeholder="Vaccination"
              value={vaccination.vaccination}
              onChange={(e) => handleVaccinationChange(index, "vaccination", e.target.value)}
            />
            <div className="mt-2">
            <input
              className="input"
              type="date"
              value={vaccination.date}
              onChange={(e) => handleVaccinationChange(index, "date", e.target.value)}
            />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline btn-primary"
          onClick={handleAddVaccination}
        >
          Add Vaccination
        </button>
        </fieldset>
        <fieldset className="fieldset">
        <legend className="fieldset-legend">Profile Picture</legend>
        <input
          className="file-input"
          type="file"
          accept="image/jpeg"
          onChange={handlePictureChange}
        />
       <label className="fieldset-label">Max size 2MB</label>
       <p className="fieldset-label">
       <span className="text-red-500">*</span> mandatory</p>
       </fieldset>

      <div className="mt-2 mb-4">
      <button
        type="submit"
        className="btn btn-active btn-primary">
        Submit
      </button>
      </div>
    </form>
  );
};

export default PatientForm;