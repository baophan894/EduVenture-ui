// src/LandingPage.jsx
import React from 'react';
import 'animate.css/animate.min.css'; // Thêm dòng này để import animate.css
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("login")
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
      <header className="w-full py-6 bg-[#0000FF]">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white animate__animated animate__fadeInDown">
            Welcome to FU Records
          </h1>
        </div>
      </header>
      
      <main className="flex flex-col items-center flex-1 w-full px-4 py-8">
        <section className="max-w-4xl py-8 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 animate__animated animate__fadeInUp">
            Discover Amazing Resources
          </h2>
          <p className="mt-4 text-lg text-gray-600 animate__animated animate__fadeInUp animate__delay-1s">
            Our service offers a range of amazing resources that will help you achieve your goals.
            Whether you're looking for learning support we've got you covered.
          </p>
        </section>
        
        <section className="max-w-4xl py-8 text-center">
          <h3 className="text-3xl font-semibold text-gray-800 animate__animated animate__fadeInUp animate__delay-2s">
            Join Us Today
          </h3>
          <p className="mt-4 text-lg text-gray-600 animate__animated animate__fadeInUp animate__delay-3s">
            Sign up now and start experiencing the benefits of our platform. 
            It's quick, easy, and free to get started.
          </p>
        </section>
        
        <button
          onClick={handleLoginClick}
          className="px-8 py-3 mt-8 font-bold text-white bg-[#0000FF] rounded-full hover:opacity-[0.7] animate__animated animate__pulse animate__infinite"
        >
          Go to Login
        </button>
      </main>
    </div>
  );
};

export default Landing;
