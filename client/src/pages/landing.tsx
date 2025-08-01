// src/pages/landing.tsx - TEMPORARY SIMPLIFIED VERSION FOR DEBUGGING
import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Landing() {
  // No state, no useEffect, no data fetching for this simplified version
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#2a2a2a] text-white font-inter p-6 text-center">
      <div className="w-20 h-20 border-4 border-[#FFB90F] rotate-45 mx-auto mb-8 relative">
        <div className="absolute inset-3 bg-[#FFB90F]/20 rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFB90F] rounded-full"></div>
      </div>
      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
        Welcome to the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB90F] to-[#FFA500]">
          Platform!
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
        This is a simplified Landing page for testing purposes.
      </p>
      <Link href="/">
        <Button className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
          Back to Coming Soon (Home)
        </Button>
      </Link>
    </div>
  );
}
