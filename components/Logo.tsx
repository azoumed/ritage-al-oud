import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <div className={className} aria-label="رتاج العود Logo">
    <svg 
      viewBox="0 0 220 50" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
    >
      {/* Dhow Boat Icon */}
      <g transform="translate(5, 5) scale(0.9)">
        {/* Hull */}
        <path d="M 5 30 Q 20 15, 40 25 T 75 30 L 70 35 L 10 35 Z" fill="currentColor" stroke="none" />
        {/* Mast */}
        <line x1="38" y1="26" x2="35" y2="5" stroke="currentColor" strokeWidth="2" />
        {/* Sail */}
        <path d="M 36 6 L 60 28 L 38 28 Z" fill="currentColor" />
        {/* Simple waves */}
        <path d="M 0 38 C 10 35, 20 41, 30 38 S 50 35, 60 38 S 80 35, 90 38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      
      {/* Brand Name Text */}
      <text 
        x="155" 
        y="50%" 
        dominantBaseline="central" 
        textAnchor="middle" 
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="700"
        fontSize="28"
        fill="currentColor"
      >
        رتاج العود
      </text>
    </svg>
  </div>
);

export default Logo;