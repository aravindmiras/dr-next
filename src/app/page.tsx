"use client"
import { AuroraBackgroundDemo } from "@/components/AuroraBackgroundDemo";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";
import svgdr from "../../public/vercel.svg"
export default function Home() {
  const [isLoading, setIsLoading]=useState(true);
  useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // 3 seconds compulsory loading
  
      return () => clearTimeout(timer); // Cleanup timer if component unmounts
    }, []);
    if(isLoading){
      return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <span className="loading loading-infinity loading-xl"></span> <strong>DoctorDR </strong>
        </div>
      );
    }
  return (
    <div className="flex flex-col justify-end h-screen">
              <Head>
        <link rel="icon" href={svgdr} />
        </Head>

      <div className="flex-grow">
    {/* Content that will take up available space */}
    <AuroraBackgroundDemo/>
    </div>
    <footer className="pt-4 bg-base-300">
    <Footer/>
    </footer>
    </div>
  );
}
