

import React from 'react';
import Logo from './Logo';
import AnimatedSection from './AnimatedSection';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-light-bg-secondary dark:bg-black text-light-text-secondary dark:text-gray-400 py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center sm:text-left">
          
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col items-center sm:items-start h-full space-y-4">
            <AnimatedSection>
              <div className="text-xl">
                <Logo />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={50}>
              <p className="max-w-xs">The future of finance is here. Secure, smart, and accessible investing for everyone.</p>
            </AnimatedSection>
          </div>

          {/* Column 2: Quick Links */}
          <div className="h-full">
            <AnimatedSection delay={100}>
              <h4 className="font-semibold text-light-text dark:text-white mb-4">Quick Links</h4>
            </AnimatedSection>
            <ul>
              <li className="mb-2">
                <AnimatedSection delay={150}>
                  <a href="#about" className="hover:text-primary-red transition-colors duration-300">About Us</a>
                </AnimatedSection>
              </li>
              <li className="mb-2">
                <AnimatedSection delay={200}>
                  <a href="#services" className="hover:text-primary-red transition-colors duration-300">Services</a>
                </AnimatedSection>
              </li>
              <li className="mb-2">
                <AnimatedSection delay={250}>
                  <a href="#contact" className="hover:text-primary-red transition-colors duration-300">Contact</a>
                </AnimatedSection>
              </li>
              <li>
                <AnimatedSection delay={300}>
                  <a href="#faq" className="hover:text-primary-red transition-colors duration-300">FAQ</a>
                </AnimatedSection>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact Us */}
          <div className="h-full">
            <AnimatedSection delay={350}>
              <h4 className="font-semibold text-light-text dark:text-white mb-4">Contact Us</h4>
            </AnimatedSection>
            <div>
              <AnimatedSection delay={400}>
                <p className="mb-2">123 Finance Street, New York, NY</p>
              </AnimatedSection>
              <AnimatedSection delay={450}>
                <p className="mb-2">contact@aidfunds.online</p>
              </AnimatedSection>
              <AnimatedSection delay={500}>
                <p>+1 (555) 123-4567</p>
              </AnimatedSection>
            </div>
          </div>

          {/* Column 4: Follow Us */}
          <div className="h-full">
            <AnimatedSection delay={550}>
              <h4 className="font-semibold text-light-text dark:text-white mb-4">Follow Us</h4>
            </AnimatedSection>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <AnimatedSection delay={600}>
                <a href="#" className="hover:text-primary-red transition-all duration-300 transform hover:scale-105" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
              </AnimatedSection>
              <AnimatedSection delay={650}>
                <a href="#" className="hover:text-primary-red transition-all duration-300 transform hover:scale-105" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              </AnimatedSection>
              <AnimatedSection delay={700}>
                 <a href="#" className="hover:text-primary-red transition-all duration-300 transform hover:scale-105" aria-label="GitHub">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.011c0 4.43 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.011C22 6.477 17.523 2 12 2z" clipRule="evenodd" /></svg>
                </a>
              </AnimatedSection>
            </div>
          </div>
        </div>
        <AnimatedSection delay={750}>
          <div className="border-t border-gray-200 dark:border-primary-gray pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} AidFunds. All rights reserved.</p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
};

export default Footer;