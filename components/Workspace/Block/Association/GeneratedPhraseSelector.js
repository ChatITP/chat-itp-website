import React from "react";
import GeneratedPhrase from "./GeneratedPhrase";

const GeneratedPhraseSelector = ({ suggestions, isLoading, color, handleSelect }) => {
  if (isLoading) {
    return (
      <div>
        <div>
          <GeneratedPhrase color={color}>...</GeneratedPhrase>
        </div>
        <div>
          <GeneratedPhrase color={color}>...</GeneratedPhrase>
        </div>
        <div>
          <GeneratedPhrase color={color}>...</GeneratedPhrase>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {suggestions.map((phrase, index) => (
          <div key={index}>
            <GeneratedPhrase
              color={color}
              onClick={() => {
                handleSelect(phrase);
              }}
            >
              {phrase}
            </GeneratedPhrase>
          </div>
        ))}
      </div>
    );
  }
};

export default GeneratedPhraseSelector;
