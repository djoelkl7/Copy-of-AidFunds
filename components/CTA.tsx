

import React from 'react';
import SignUpForm from './SignUpForm';
import AnimatedSection from './AnimatedSection';

const CTA: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-light-bg-secondary dark:bg-primary-gray">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-white">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-light-text-secondary dark:text-gray-300 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            Join thousands of successful investors who trust AidFunds to grow their wealth. Sign up today and take the first step towards financial freedom.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <SignUpForm />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTA;