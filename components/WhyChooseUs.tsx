

import React from 'react';
import AnimatedSection from './AnimatedSection';

// FIX: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
const FeatureCard: React.FC<{ icon: React.ReactElement; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-light-bg-secondary dark:bg-primary-gray p-6 sm:p-8 rounded-lg text-center transform hover:-translate-y-2 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
    <div className="flex justify-center items-center mb-4">
      <div className="bg-primary-red p-4 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-light-text dark:text-white">{title}</h3>
    <p className="text-light-text-secondary dark:text-gray-400">{description}</p>
  </div>
);

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: 'Secure Transactions',
      description: 'Your funds and data are protected with state-of-the-art encryption and security protocols.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: 'Expert Support',
      description: 'Our dedicated team of financial experts is available 24/7 to assist you with any inquiries.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.905 11A9 9 0 0012 15h0a9 9 0 004.095-4M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" /></svg>,
      title: 'Global Reach',
      description: 'Invest in a wide range of international markets and diversify your portfolio with ease.',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-light-bg dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">Why Choose Us</h2>
            <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={100 + (index * 100)}>
              <FeatureCard {...feature} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;