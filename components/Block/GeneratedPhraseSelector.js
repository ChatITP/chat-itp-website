import React from "react";
import Phrase from "./Phrase";

const GeneratedPhraseSelector = () => {
  return (
    <div>
      {phrases.map((phrase, index) => (
        <div key={index}>
          <Phrase color={phrase.color}>{phrase.text}</Phrase>
        </div>
      ))}
    </div>
  );
};

export default GeneratedPhraseSelector;
