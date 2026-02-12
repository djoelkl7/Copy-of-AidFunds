

import React from 'react';
import AnimatedSection from './AnimatedSection';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-light-bg-secondary dark:bg-primary-dark">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <AnimatedSection>
              <img 
                src="https://picsum.photos/800/600?random=1" 
                alt="Our Team"
                className="rounded-lg shadow-2xl"
              />
            </AnimatedSection>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <AnimatedSection delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-white">About AidFunds</h2>
              <div className="w-24 h-1 bg-primary-red mb-6 mx-auto md:mx-0"></div>
              <p className="text-light-text-secondary dark:text-gray-300 mb-4 leading-relaxed">
                At AidFunds, we are driven by a single mission: to democratize finance and make sophisticated investment strategies accessible to everyone. We believe that financial growth should not be limited to the privileged few.
              </p>
              <p className="text-light-text-secondary dark:text-gray-300 leading-relaxed">
                Our platform combines innovative technology with deep financial expertise to provide you with powerful tools, personalized insights, and a seamless user experience. Whether you're a seasoned investor or just starting, we're here to guide you towards a brighter financial future.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;