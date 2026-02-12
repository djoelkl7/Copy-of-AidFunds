import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

// FIX: Replaced JSX.Element with React.ReactElement to resolve namespace issue.
const ServiceCard: React.FC<{ icon: React.ReactElement; title: string; description: string; link?: string; }> = ({ icon, title, description, link }) => (
  <div className="bg-light-bg-secondary dark:bg-primary-gray p-6 sm:p-8 rounded-lg border-l-4 border-primary-red transform hover:-translate-y-2 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    <div className="flex items-center mb-4">
      <div className="text-primary-red mr-4">{icon}</div>
      <h3 className="text-xl font-bold text-light-text dark:text-white">{title}</h3>
    </div>
    <p className="text-light-text-secondary dark:text-gray-400 flex-grow">{description}</p>
    {link && (
      <div className="mt-6">
        <Link to={link} className="font-semibold text-primary-red hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 group">
          Learn More <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>
    )}
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      title: 'Investment Plans',
      description: 'Choose from a variety of curated investment plans tailored to your risk appetite and financial goals.',
      link: '/investment-plans',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
      title: 'Asset Management',
      description: 'Our experts actively manage your portfolio to maximize returns and mitigate risks in a dynamic market.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: 'Financial Consulting',
      description: 'Get personalized financial advice from our certified consultants to make informed decisions.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
      title: 'Market Analysis',
      description: 'Access real-time market data, trend analysis, and predictive insights to stay ahead of the curve.',
    },
  ];

  return (
    <section id="services" className="py-12 md:py-20 bg-light-bg dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">Our Services</h2>
            <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={100 + (index * 100)}>
              <ServiceCard {...service} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;