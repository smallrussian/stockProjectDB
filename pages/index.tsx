import React, { useState } from "react";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="text-center text-white space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Your App</h1>
        <p className="text-xl md:text-2xl">
          A short description of your app or what it does goes here.
        </p>
        <div className="space-x-4">
          <Link
            href="/signup"
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-md hover:bg-gray-200"
          >
            Sign Up
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-md hover:bg-gray-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
