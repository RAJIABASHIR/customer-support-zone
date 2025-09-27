import React from 'react';

export default function Banner({ inProgress = 0, resolved = 0 }) {
  return (
    <section className="container mx-auto px-6 mt-8 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="relative rounded-lg p-8 text-white bg-gradient-to-br from-purple-600 to-purple-400 flex flex-col items-center justify-center min-h-[160px] shadow-md overflow-hidden">
        <img
          src="/vector1.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-lg opacity-90">In-Progress</div>
        <div className="relative z-10 text-6xl font-bold mt-2">{inProgress}</div>
      </div>
      <div className="relative rounded-lg p-8 text-white bg-gradient-to-br from-green-500 to-green-400 flex flex-col items-center justify-center min-h-[160px] shadow-md overflow-hidden">
        <img
          src="/vector1.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-lg opacity-90">Resolved</div>
        <div className="relative z-10 text-6xl font-bold mt-2">{resolved}</div>
      </div>
    </section>
  );
}