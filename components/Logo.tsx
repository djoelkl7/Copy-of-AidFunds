
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-8 w-auto"
        aria-hidden="true"
      >
        <path
          d="M20 2.5L37.5 37.5H2.5L20 2.5Z"
          fill="#141414"
          stroke="#E50914"
          strokeWidth="3"
        />
        <path
          d="M20 12.5L30 30H10L20 12.5Z"
          fill="#E50914"
        />
      </svg>
      <span className="font-bold text-light-text dark:text-white">
        Aid<span className="text-primary-red">Funds</span>
      </span>
    </div>
  );
};

export default Logo;