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

const Block = ({ text, index, onSelect }) => (
  <button
    className={`py-2 px-4 rounded-full shadow-md text-sm font-semibold ${
      text === '?' ? 'bg-white/20 text-white' : colors[index % colors.length]
    } text-black`}
    onClick={() => onSelect(text)}
  >
    {text}
  </button>
);

export default Block;


