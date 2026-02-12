import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

const MoonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const SunIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const UserAvatar: React.FC<{ name: string; avatar?: string; onToggle: () => void }> = ({ name, avatar, onToggle }) => (
  <button onClick={onToggle} className="flex items-center justify-center w-10 h-10 rounded-full text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg-secondary dark:focus:ring-offset-primary-gray focus:ring-white overflow-hidden">
    {avatar ? (
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
    ) : (
        <span className="w-full h-full flex items-center justify-center bg-primary-red">
            {name.charAt(0).toUpperCase()}
        </span>
    )}
  </button>
);


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-primary-gray">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl" aria-label="AidFunds homepage">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-light-text-secondary dark:text-gray-300 hover:text-light-text dark:hover:text-white transition duration-300">
              {link.name}
            </a>
          ))}
           <button onClick={toggleTheme} className="p-2 rounded-full text-light-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-gray transition-colors duration-300" aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          {user ? (
            <div className="relative" ref={profileRef}>
              <UserAvatar name={user.name} avatar={user.avatar} onToggle={() => setIsProfileOpen(!isProfileOpen)} />
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-light-bg dark:bg-primary-gray rounded-md shadow-lg py-1 ring-1 ring-black dark:ring-gray-700 ring-opacity-5">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-light-text-secondary dark:text-gray-400">Signed in as</p>
                    <p className="text-sm font-medium text-light-text dark:text-white truncate">{user.name}</p>
                  </div>
                  <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-light-text-secondary dark:text-gray-300 hover:bg-light-bg-secondary dark:hover:bg-gray-700 w-full text-left transition-colors duration-200">
                      Your Profile
                  </Link>
                  <button onClick={handleLogout} className="block px-4 py-2 text-sm text-light-text-secondary dark:text-gray-300 hover:bg-light-bg-secondary dark:hover:bg-gray-700 w-full text-left transition-colors duration-200">
                      Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-primary-red text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
              Login
            </Link>
          )}
        </nav>
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full text-light-text dark:text-white hover:bg-gray-100 dark:hover:bg-primary-gray transition-colors duration-300" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-light-text dark:text-white focus:outline-none" aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-light-bg-secondary dark:bg-primary-gray">
          <nav className="flex flex-col items-center space-y-4 px-4 sm:px-6 pt-2 pb-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-light-text-secondary dark:text-gray-300 hover:text-light-text dark:hover:text-white transition duration-300">
                {link.name}
              </a>
            ))}
            {user ? (
               <div className="w-full text-center border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 space-y-4">
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block text-light-text-secondary dark:text-gray-300 hover:text-light-text dark:hover:text-white transition duration-300">
                    Your Profile
                </Link>
                 <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-center bg-primary-red text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                    Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-primary-red text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;