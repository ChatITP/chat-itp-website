import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import Phrase from "./Phrase";
import useAuthRequest from "@/hooks/useAuthRequest";
import GeneratedPhraseSelector from "./GeneratedPhraseSelector";

const colorPalette = ["#ff9c9c", "#ffd9a3", "#c8dff7", "#fff495", "#c9f3d7", "#b3ffa0", "#a9ffef"];

const AssociationPrompt = ({ promptRef, initialPromptPhrases }) => {
  const [promptPhrases, setPromptPhrases] = useState([]);

  useEffect(() => {
    console.log("initialPromptPhrases", initialPromptPhrases);
    if (initialPromptPhrases.length === 1) {
      const phrases = {
        text: initialPromptPhrases[0],
        color: colorPalette[0],
        isSelected: false,
        isPlaceholder: false,
        isLoading: true,
      };
      setPromptPhrases([phrases]);
      splitTextInit(initialPromptPhrases[0], 0);
      return;
    }

    const phrases = initialPromptPhrases.map((phrase, index) => {
      return {
        text: phrase,
        color: colorPalette[index % colorPalette.length],
        isSelected: false,
        isPlaceholder: false,
        isLoading: false,
      };
    });
    phrases.push({
      text: "",
      color: colorPalette[phrases.length % colorPalette.length],
      isSelected: false,
      isPlaceholder: true,
      isLoading: false,
    });
    setPromptPhrases(phrases);
  }, [initialPromptPhrases]);

  const [generatedPhrases, setGeneratedPhrases] = useState({
    suggestions: [],
    isLoading: false,
  });

  const request = useAuthRequest();

  /**
   * Join the prompt phrases into a single string
   * @returns the prompt phrases joined into a single string
   */
  const joinPhrases = () => {
    return promptPhrases.map((phrase) => phrase.text).join(" ");
  };

  promptRef.current = joinPhrases();
  /**
   * Called when a phrase is clicked
   * @param {*} id
   */
  const handlePhraseClick = (id) => {
    if (promptPhrases[id].isPlaceholder) {
      generateSuggestions();
    } else {
      generateReplacements(id);
    }
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

  /**
   * Split the text into phrases, idempotent function call during initialization
   * @param {*} text
   */
  const splitTextInit = async (text, insertIndex) => {
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

    setPromptPhrases(() => newPhrases);
    return result;
  };

  /**
   * Generate suggestions that adds a new phrase to the end of the prompt.
   */
  const generateSuggestions = async () => {
    setGeneratedPhrases({ suggestions: [], isLoading: true });
    const response = await request("post", "/api/llm/suggestions", {
      text: promptPhrases.map((phrase) => phrase.text).join(" "),
    });
    setGeneratedPhrases({ suggestions: response.data, isLoading: false });
  };

  /**
   * Generate suggestions to replace an existing phrase in the prompt.
   * @param {number} replaceIndex - the index of the phrase to replace
   */
  const generateReplacements = async (replaceIndex) => {
    setGeneratedPhrases({ suggestions: [], isLoading: true });

    const prompt = promptPhrases
      .map((phrase, index) => {
        if (index === replaceIndex) {
          return `<<<${phrase.text}>>>`;
        }
        return phrase.text;
      })
      .join(" ");

    const response = await request("post", "/api/llm/replace", {
      text: prompt,
    });

    setGeneratedPhrases({ suggestions: response.data, isLoading: false });
  };

  const isEditing = promptPhrases.some((phrase) => phrase.isSelected);
  const selectionColor = promptPhrases.find((phrase) => phrase.isSelected)?.color;
  const selectID = promptPhrases.findIndex((phrase) => phrase.isSelected);

  return (
    <div className="w-full relative p-6">
      <div className="relative w-full pb-6">
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
        <div className="pt-6 border-gray2 border-t-2">
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
