"use client"
import { useEffect, useState } from "react"
import db from "../../../../lib/utils/firestore"
import {collection, getDocs, doc, getDoc} from "firebase/firestore";

export default function Table() {
    const [patients, setPatients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchPatients = async () => {
        const querySnapshot = await getDocs(collection(db, 'patients'));
        const patientsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientsData);
        setIsLoading(false);
      };
  
      fetchPatients();
    }, []);

    if(isLoading){
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
       <span className="loading loading-infinity loading-xl"></span><strong>DoctorDR </strong>
      </div>
    }
  
  return (
    <div className="overflow-x-auto ">
      <p className="mx-9 mb-4 text-4xl font-bold text-gray-900 dark:text-white">Step 1: Select the Patient</p>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Date of Birth</th>
        <th>Phone Number</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {patients.map((patient)=>(
      <tr key={patient.id}>
      <th>
        <label>
          
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src={patient.picture}
                alt={patient.fullName} />
            </div>
          </div>
          <div>
            <div className="font-bold">{patient.fullName}</div>
            <div className="text-sm opacity-50">{patient.gender}</div>
          </div>
        </div>
      </td>
      <td>
        {patient.dob}
        <br />
        <span className="badge badge-ghost badge-sm">{patient.lifestyleRemark}</span>
      </td>
      <td>{patient.phoneNumber}</td>
      <th>
       <a href={`/showdr/result/${patient.id}`}> <button className="btn btn-ghost btn-xs">select</button> </a>
      </th>
    </tr>
      ))}

      
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Date of Birth</th>
        <th>Phone Number</th>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>
  )
}
