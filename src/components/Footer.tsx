// components/Footer.tsx
"use client"; // Mark as client component, as we're using new Date()

import { useState, useEffect } from "react";
import { AnimatedTooltipPreview } from "./FooterProfile";

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Optional: Update the year periodically if needed
    // Example: Update every minute
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
        <AnimatedTooltipPreview/>
  );
};

export default Footer;