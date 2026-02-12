
import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <AboutUs />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Blog />
      <FAQ />
      <CTA />
    </main>
  );
};

export default HomePage;
