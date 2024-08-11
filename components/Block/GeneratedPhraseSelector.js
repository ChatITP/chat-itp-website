import React from "react";
import GeneratedPhrase from "./generatedPhrase";

const GeneratedPhraseSelector = ({ generatedPhrases, color }) => {
  return (
    <div className="leading-10">
      {generatedPhrases.map((phrase, index) => (
        <div key={index}>
          <GeneratedPhrase color={color}>{phrase.text}</GeneratedPhrase>
        </div>
      ))}
    </div>
  );
};

export default GeneratedPhraseSelector;
