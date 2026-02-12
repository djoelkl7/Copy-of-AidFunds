import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      id="home"
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center py-20"
      style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          The Future of <span className="text-primary-red">Finance</span> is Here
        </h2>
        <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300">
          Experience seamless, secure, and smart investing with our revolutionary platform. We empower your financial journey with cutting-edge technology and expert insights.
        </p>
        <button className="bg-primary-red text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-red-700 transition duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;