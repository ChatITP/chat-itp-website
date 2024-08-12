import React from "react";
import GeneratedPhrase from "./GeneratedPhrase";

const GeneratedPhraseSelector = ({ suggestions, isLoading, color, handleSelect }) => {
  console.log(suggestions);
  if (isLoading) {
    return (
      <div className="leading-10">
        <div>
          <GeneratedPhrase color={color}>...</GeneratedPhrase>
        </div>
        <div>
          <GeneratedPhrase color={color}>...</GeneratedPhrase>
        </div>
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
      <div className="leading-10">
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
