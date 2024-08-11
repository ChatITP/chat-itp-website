import React from "react";
import { useState } from "react";
import Phrase from "./Phrase";
import useAuthRequest from "@/hooks/useAuthRequest";

const colorPalette = ["#ff0000", "#00ff00", "#0000ff", "#ffffff"];

const AssociationPrompt = () => {
  const [promptPhrases, setPromptPhrases] = useState([
    {
      text: "What",
      color: colorPalette[0],
      isSelected: false,
      isPlaceholder: false,
      isLoading: false,
    },
    {
      text: "is the most important",
      color: colorPalette[1],
      isSelected: false,
      isPlaceholder: false,
      isLoading: false,
    },
    { text: "", color: colorPalette[2], isSelected: false, isPlaceholder: true, isLoading: false },
  ]);

  const [generatedPhrases, setGeneratedPhrases] = useState([
    { text: "What" },
    { text: "is the most common" },
    { text: "historical theme" },
  ]);
  const request = useAuthRequest();

  /**
   * Called when a phrase is clicked
   * @param {*} id
   */
  const handlePhraseClick = (id) => {
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
      handleSplitText(text, id);
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
          }
        } else {
          updatedPromptPhrases.push(phrase);
        }
      });
      if (!updatedPromptPhrases[updatedPromptPhrases.length - 1].isPlaceholder) {
        console.log("Adding new phrase");
        // make sure the color is not the same as the previous phrase
        const colors = colorPalette.filter(
          (color) => color !== updatedPromptPhrases[updatedPromptPhrases.length - 2].color
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

  /**
   * Split the text into phrases
   * @param {*} text
   */
  const handleSplitText = async (text, insertIndex) => {
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

  const isEditing = promptPhrases.some((phrase) => phrase.isSelected);

  return (
    <div className="bg-[#252525] w-[500px] leading-10 pl-6 pr-8 py-6 relative">
      {promptPhrases.map((prompt, index) => (
        <Phrase
          key={index}
          color={prompt.color}
          isEditing={isEditing}
          isSelected={prompt.isSelected}
          isPlaceholder={prompt.isPlaceholder}
          onClick={() => handlePhraseClick(index)}
          onClickOut={(text) => handlePhraseClickOut(index, text)}
          isEnd={index === promptPhrases.length - 1}
        >
          {prompt.text}
        </Phrase>
      ))}
      <div className="pt-4">{/* <GeneratedPhraseSelector /> */}</div>
    </div>
  );
};

export default AssociationPrompt;
