

import React from 'react';
import AnimatedSection from './AnimatedSection';

const TestimonialCard: React.FC<{ quote: string; name: string; title: string; avatar: string; }> = ({ quote, name, title, avatar }) => (
  <div className="bg-light-bg-secondary dark:bg-primary-gray p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl h-full flex flex-col justify-between transform hover:-translate-y-2 transition-all duration-300">
    <p className="text-light-text-secondary dark:text-gray-300 italic mb-6">"{quote}"</p>
    <div className="flex items-center mt-auto">
      <img className="w-12 h-12 rounded-full mr-4 object-cover" src={avatar} alt={name} />
      <div>
        <h4 className="font-bold text-light-text dark:text-white">{name}</h4>
        <p className="text-sm text-light-text-secondary dark:text-gray-400">{title}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: 'AidFunds has completely changed my perspective on investing. The platform is intuitive, and the returns have been fantastic!',
      name: 'Sarah Johnson',
      title: 'Entrepreneur',
      avatar: 'https://picsum.photos/100/100?random=2'
    },
    {
      quote: 'The 24/7 support is a game-changer. I had a question late at night, and their team was immediately available to help me.',
      name: 'Michael Chen',
      title: 'Software Engineer',
      avatar: 'https://picsum.photos/100/100?random=3'
    },
    {
      quote: 'As someone new to investing, I was hesitant. But AidFunds made it so easy to get started. I highly recommend it to anyone.',
      name: 'Jessica Williams',
      title: 'Marketing Manager',
      avatar: 'https://picsum.photos/100/100?random=4'
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-light-bg dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} delay={100 + (index * 100)}>
              <TestimonialCard {...testimonial} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;