import React from 'react';
import { useDrag } from 'react-dnd';

const ItemType = {
  PHRASE: "phrase",
};

const Phrase = ({ phrase, selectedTags, highlightText, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.PHRASE,
    item: { phrase },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`border border-white/50 rounded-lg p-4 text-white cursor-pointer text-sm font-sans hover:bg-white/20 ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ minWidth: "300px", minHeight:"80px", whiteSpace: "normal" }}
      onClick={() => onClick(phrase)}
    >
      {highlightText(phrase, selectedTags)}
    </div>
  );
};

export default Phrase;

