import React from 'react';

const colors = [
  'bg-red',
  'bg-orange',
  'bg-lightBlue',
  'bg-yellow',
  'bg-green',
  'bg-white',
  'bg-teal',
  'bg-white',
  'bg-white',
];

const Block = ({ text, index, onSelect, color }) => (
  <button
    className={`py-2 px-4 rounded-xl drop-shadow-lg text-sm font-semibold ${
      text === '?' ? 'bg-white/20 text-black' : colors[index % colors.length]
    } text-black hover:border-2 hover:border-white `}
    onClick={() => onSelect(text)}
    
  >
    {text}
  </button>
);

export default Block;


