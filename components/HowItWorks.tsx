

import React from 'react';
import AnimatedSection from './AnimatedSection';

const Step: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-red text-white font-bold text-xl">
        {number}
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold leading-6 text-light-text dark:text-white">{title}</h3>
      <p className="mt-2 text-base leading-6 text-light-text-secondary dark:text-gray-400">{description}</p>
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Create an Account',
      description: 'Sign up for free in minutes. Provide your basic information and complete our secure identity verification process.',
    },
    {
      number: '2',
      title: 'Deposit Funds',
      description: 'Securely add funds to your account using a variety of payment methods, including bank transfer, credit card, or cryptocurrency.',
    },
    {
      number: '3',
      title: 'Start Investing',
      description: 'Explore our investment options, choose the plan that suits you, and start growing your wealth with just a few clicks.',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-light-bg-secondary dark:bg-primary-dark">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">How It Works</h2>
            <p className="text-light-text-secondary dark:text-gray-400 mt-2">Start your investment journey in three simple steps.</p>
            <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
          </div>
        </AnimatedSection>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={100 + (index * 100)}>
                <Step {...step} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;