

import React from 'react';
import FAQItem from './FAQItem';
import AnimatedSection from './AnimatedSection';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'What is the minimum investment amount?',
      answer: 'The minimum investment amount varies depending on the plan you choose. Our starter plans begin at just $100, making it accessible for everyone to start their investment journey.'
    },
    {
      question: 'How secure is my data and investment?',
      answer: 'We prioritize your security above all else. We use bank-level encryption, two-factor authentication, and regular security audits to ensure your data and funds are always protected.'
    },
    {
      question: 'Can I withdraw my funds at any time?',
      answer: 'Yes, you can withdraw your funds at any time. Withdrawal requests are processed within 1-3 business days, depending on your chosen withdrawal method.'
    },
    {
      question: 'What kind of fees do you charge?',
      answer: 'We believe in transparent pricing. Our fee structure is simple, with a small percentage-based management fee and no hidden charges. You can find detailed information on our pricing page.'
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-20 bg-light-bg-secondary dark:bg-primary-dark">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
          </div>
        </AnimatedSection>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={100 + (index * 100)}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;