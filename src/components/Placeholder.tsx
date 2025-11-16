import React from 'react';

interface PlaceholderProps {
  title: string;
  message: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title, message }) => (
  <div className="text-center bg-brand-gray p-8 sm:p-16 rounded-lg max-w-3xl mx-auto animate-fade-in">
    <h2 className="text-4xl font-serif font-bold text-brand-gold mb-4">{title}</h2>
    <p className="text-xl text-brand-light/80 leading-relaxed">{message}</p>
  </div>
);

export default Placeholder;