import React from "react";
import { useState } from "react";
import Phrase from "./Phrase";
import useAuthRequest from "@/hooks/useAuthRequest";
import GeneratedPhraseSelector from "./GeneratedPhraseSelector";

const colorPalette = ["#ff9c9c", "#ffd9a3", "#c8dff7", "#fff495", "#c9f3d7", "#b3ffa0", "#a9ffef"];

const AssociationPrompt = () => {
  const [promptPhrases, setPromptPhrases] = useState([
    { text: "", color: colorPalette[2], isSelected: false, isPlaceholder: true, isLoading: false },
  ]);

  const [generatedPhrases, setGeneratedPhrases] = useState({
    suggestions: ["What", "is the most common", "historical theme"],
    isLoading: false,
  });

  const request = useAuthRequest();

  /**
   * Called when a phrase is clicked
   * @param {*} id
   */
  const handlePhraseClick = (id) => {
    generateSuggestions(id);
    setPromptPhrases((promptPhrases) => {
      const updatedPromptPhrases = promptPhrases.map((phrase, index) => {
        if (index === id) {
          return { ...phrase, isSelected: true };
        } else {
          return { ...phrase, isSelected: false };
        }
      });
      return updatedPromptPhrases;
    });
  };

  /**
   * Called when a click is outside of the phrase, update the text
   * @param {*} id
   * @param {*} text
   */
  const handlePhraseClickOut = (id, text) => {
    if (text !== "" && promptPhrases[id].text !== text) {
      splitText(text, id);
    }

    setPromptPhrases((promptPhrases) => {
      const updatedPromptPhrases = [];
      promptPhrases.forEach((phrase, index) => {
        if (index === id) {
          // If the text is empty remove the phrase if it is not the last in the array
          if (text !== "") {
            // split the text into smaller phrases if text has changed
            if (phrase.text !== text) {
              updatedPromptPhrases.push({
                ...phrase,
                text,
                isSelected: false,
                isPlaceholder: false,
                isLoading: true,
              });
            } else {
              updatedPromptPhrases.push({
                ...phrase,
                text,
                isSelected: false,
                isPlaceholder: false,
              });
            }
          } else if (index === promptPhrases.length - 1 && promptPhrases[index].isPlaceholder) {
            updatedPromptPhrases.push({ ...phrase, isSelected: false });
          }
        } else {
          updatedPromptPhrases.push(phrase);
        }
      });
      if (!updatedPromptPhrases[updatedPromptPhrases.length - 1].isPlaceholder) {
        // make sure the color is not the same as the previous phrase
        const colors = colorPalette.filter(
          (color) => color !== updatedPromptPhrases[updatedPromptPhrases.length - 1].color
        );
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        updatedPromptPhrases.push({
          text: "",
          color: newColor,
          isSelected: false,
          isPlaceholder: true,
        });
      }
      return updatedPromptPhrases;
    });
  };

  const handleReplacePhrase = (id, text) => {
    setPromptPhrases((promptPhrases) => {
      const updatedPromptPhrases = [];
      promptPhrases.forEach((phrase, index) => {
        if (index === id) {
          updatedPromptPhrases.push({
            ...phrase,
            text,
            isSelected: false,
            isPlaceholder: false,
          });
          if (index === promptPhrases.length - 1) {
            // make sure the color is not the same as the previous phrase
            const colors = colorPalette.filter(
              (color) => color !== updatedPromptPhrases[updatedPromptPhrases.length - 1].color
            );
            const newColor = colors[Math.floor(Math.random() * colors.length)];
            updatedPromptPhrases.push({
              text: "",
              color: newColor,
              isSelected: false,
              isPlaceholder: true,
            });
          }
        } else {
          updatedPromptPhrases.push(phrase);
        }
      });
      return updatedPromptPhrases;
    });
  };

  /**
   * Split the text into phrases
   * @param {*} text
   */
  const splitText = async (text, insertIndex) => {
    const response = await request("post", "/api/llm/split", { text });
    const result = response.data.split;

    // make sure the color is not the same at the neighbors
    let leftColor = "#000000";
    let rightColor = "#000000";
    if (insertIndex > 0) leftColor = promptPhrases[insertIndex - 1].color;

    if (insertIndex < promptPhrases.length - 1) rightColor = promptPhrases[insertIndex + 1].color;
    const newPhrases = result.map((phrase) => {
      // assign a new color to the phrase and update the neighbor colors
      const colors = colorPalette.filter((color) => color !== leftColor && color !== rightColor);
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      leftColor = newColor;
      return {
        text: phrase,
        color: newColor,
        isSelected: false,
        isPlaceholder: false,
        isLoading: false,
      };
    });
    setPromptPhrases((prev) => {
      const updatedPromptPhrases = [...prev];
      updatedPromptPhrases.splice(insertIndex, 1, ...newPhrases);
      return updatedPromptPhrases;
    });

    return result;
  };

  const generateSuggestions = async (replaceIndex) => {
    setGeneratedPhrases({ suggestions: [], isLoading: true });
    const response = await request("post", "/api/llm/suggestions", {
      text: promptPhrases.map((phrase) => phrase.text).join(" "),
    });
    setGeneratedPhrases({ suggestions: response.data, isLoading: false });
  };

  const isEditing = promptPhrases.some((phrase) => phrase.isSelected);
  const selectionColor = promptPhrases.find((phrase) => phrase.isSelected)?.color;
  const selectID = promptPhrases.findIndex((phrase) => phrase.isSelected);

  return (
    <div className="bg-[#252525] w-[500px] relative  pl-6 pr-8 py-6 rounded-lg">
      <div className="relative leading-10 w-full pb-4">
        {promptPhrases.map((prompt, index) => (
          <Phrase
            key={index}
            color={prompt.color}
            isEditing={isEditing}
            isSelected={prompt.isSelected}
            isPlaceholder={prompt.isPlaceholder}
            isLoading={prompt.isLoading}
            onClick={() => handlePhraseClick(index)}
            onClickOut={(text) => handlePhraseClickOut(index, text)}
            isEnd={index === promptPhrases.length - 1 || promptPhrases[index + 1]?.isSelected}
          >
            {prompt.text}
          </Phrase>
        ))}
      </div>
      {isEditing && (
        <div className="pt-4 border-gray2 border-t-2">
          <GeneratedPhraseSelector
            suggestions={generatedPhrases.suggestions}
            isLoading={generatedPhrases.isLoading}
            color={selectionColor}
            handleSelect={(text) => {
              handleReplacePhrase(selectID, text);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AssociationPrompt;
