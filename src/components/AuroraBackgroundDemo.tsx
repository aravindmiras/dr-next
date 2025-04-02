"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        "Because your eyes tell a story." 
        </div>
        <div className="mx-20 font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        We're here to help you understand it. DoctorDR utilizes pretrained ML model to detect diabetic retinopathy from retinal images. It provides accessible screening and patient data logging for proactive eye health management.
        </div>
        <a href="/showdr">
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Check Diabetic Retinopathy
        </button>
        </a>
      </motion.div>
    </AuroraBackground>
  );
}
