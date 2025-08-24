'use client';

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full">
        
        <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 lg:bg-none lg:backdrop-blur-none text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent mb-6">
            Something is<br />Discussed Now!
          </h1>
          <img 
            src="https://raw.githubusercontent.com/awkward-py/Open-Source-Off-Topics/main/assets/images/logoo.png" 
            alt="OT-Discussion"
            className="w-32 md:w-40"
          />
        </div>
        
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <SignIn />
          </div>
        </div>

      </div>
    </div>
  );
}
