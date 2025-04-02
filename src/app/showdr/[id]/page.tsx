'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams(); // Use useParams() in client component
  const id = params.id; // Access the id parameter

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <p className="mx-9 mb-4 text-4xl font-bold text-gray-900 dark:text-white">Step 2: Upload Eye Image</p>
      <div className="flex justify-center">
        <input type="file" className="file-input file-input-success" />
      </div>
      <div className="flex justify-center mt-7">
        <a href={`/showdr/result/${id}`}>
          <button className="btn btn-soft btn-success">Proceed</button>
        </a>
      </div>
    </div>
  );
}