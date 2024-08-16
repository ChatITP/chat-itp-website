import React from 'react';
import Block from './Block'; 

const BlockSelector = ({ suggestions, onSelect }) => (
  <div className="flex flex-wrap mt-4 justify-center gap-2">
    {suggestions.map((suggestion, index) => (
      suggestion && (
        <div key={index} className="m-1">
          <Block text={suggestion} index={index} color="bg-red" onSelect={onSelect} />
        </div>
      )
    ))}
  </div>
);

export default BlockSelector;


