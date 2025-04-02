'use client';
import { doc, getDoc } from 'firebase/firestore';
import db from "../../../../lib/utils/firestore";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';

export default function PatientPage() {
  const params = useParams();
  const [patient, setPatient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!params.id) {
            setError("Patient ID is missing");
            setIsLoading(false);
            return;
        }

        const docRef = doc(db, "patients", params.id as string);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Patient not found");
        } else {
          setPatient(docSnap.data());
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch patient data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <span className="loading loading-infinity loading-xl"></span> <strong>DoctorDR </strong>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mockup-browser border border-base-300 w-full">
        <div className="mockup-browser-toolbar">
          <div className="input">doctordr/patient/{params.id}</div>
        </div>
        <div className="grid place-content-center h-80">
          <strong>{error}</strong>
        </div>
      </div>
    );
  }

  if (!patient) return null; // Handle case where patient is still null after loading

  return (
    <div className="bg-base-200 min-h-screen mx-7 rounded-4xl">
      <div className="hero-content flex-col lg:flex-row">
        <img src={patient.picture} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{patient.fullName}</h1>
          <p className="my-3">
            <strong>{patient.gender}</strong> | <strong>DOB:</strong> {patient.dob} | <strong>Phone:</strong> {patient.phoneNumber}
          </p>
          <p className="my-3">
            <strong>Allergies:</strong> {patient.allergies}
          </p>
          <p className="my-3">
            <strong>Lifestyle:</strong> {patient.lifestyleRemark}
          </p>
        </div>
      </div>
      {/* Medication Table */}
      <p className="mx-3 my-3 mb-4 text-4xl font-bold text-gray-900 dark:text-white">Current Medication</p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Drug</th>
              <th>Dosage</th>
            </tr>
          </thead>
          <tbody>
            {patient.medicationHistory.map((med: { dosage: string; drug: string }, index: number) => (
              <tr key={index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{med.drug}</td>
                <td>{med.dosage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Vaccination table */}
      <p className="mx-3 my-3 mb-4 text-4xl font-bold text-gray-900 dark:text-white">Vaccination History</p>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Vaccine</th>
            </tr>
          </thead>
          <tbody>
            {patient.vaccinationHistory.map((vaccine: { date: string; vaccination: string }, index: number) => (
              <tr key={index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{vaccine.date}</td>
                <td>{vaccine.vaccination}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* DR History */}
      <p className="mx-3 my-3 mb-4 text-4xl font-bold text-gray-900 dark:text-white">Diabetic Retinopathy History</p>
      <div className="overflow-x-auto mb-4">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Time</th>
              <th>Level</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {patient.drHistory.map((dr: { date: string; time: string; level: string; percentage: string }, index: number) => (
              <tr key={index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{dr.date}</td>
                <td>{dr.time}</td>
                <td>{dr.level}</td>
                <td>{dr.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}