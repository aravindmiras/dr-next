"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import ushaImage from "../../public/m5.jpg"
import somImage from "../../public/m6.jpg"
import rasiImage from "../../public/m9.jpg"
const people = [
  {
    id: 1,
    name: "Usha K",
    designation: "Web Application Developer",
    image:ushaImage.src,
  },
  {
    id: 2,
    name: "Rasika B",
    designation: "ML Developer",
    image:rasiImage.src,
  },
  {
    id: 3,
    name: "Soma Sundari R",
    designation: "Web Application Developer",
    image:somImage.src,
  },
  
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center  w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
