import React from "react";
import Image from "next/image";
import Tag from "./Tag";
import shuffle from "shuffle-array";
import { tagState } from "../../../contexts/examples";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FaArrowsRotate } from "react-icons/fa6";

const defaultTagsPool = [
  "Performance",
  "Traditional",
  "Innovative",
  "C++",
  "3D",
  "Futuristic",
  "Generative",
  "Wearables",
  "Prototyping",
  "Cybernetics",
  "Fabrication",
  "Sound Design",
  "Unity",
  "Touch Designer",
  "ITP",
];

const TagList = () => {
  const [tags, setTags] = useRecoilState(tagState);

  /**
   * Randomize the tags and update the context.
   * If a tag is selected, it will not be changed.
   */
  const randomizeUnselectedTags = () => {
    setTags((prevTags) => {
      // Get selected tag names
      const selectedTagNames = [];
      prevTags.forEach((tag) => {
        if (tag.isSelected) {
          selectedTagNames.push(tag.name);
        }
      });

      // Get unselected tag names and shuffle
      const unselectedTagNames = defaultTagsPool.filter((tag) => !selectedTagNames.includes(tag));
      shuffle(unselectedTagNames);
      const newTags = [...prevTags];

      return newTags.map((tag) => {
        if (!tag.isSelected) {
          return {
            ...tag,
            name: unselectedTagNames.pop(),
          };
        }
        return tag;
      });
    });
  };

  /**
   * Toggle the selected state of a tag.
   * @param {number} index - The index of the tag to be toggled.
   */
  const handleTagClick = (clickIndex) => {
    setTags((prevTags) => {
      return prevTags.map((tag, index) => {
        if (clickIndex === index) {
          return {
            ...tag,
            isSelected: !tag.isSelected,
          };
        }
        return tag;
      });
    });
  };

  /**
   * Enter the edit mode of a tag.
   * @param {number} clickIndex - The index of the tag to be edited.
   */
  const handleEditClick = (clickIndex) => {
    setTags((prevTags) => {
      return prevTags.map((tag, index) => {
        if (clickIndex === index) {
          return {
            ...tag,
            isEditing: !tag.isEditing,
          };
        }
        return tag;
      });
    });
  };

  /**
   * Exit the edit mode of a tag.
   * Save the new name and update the context
   * @param {number} clickIndex - The index of the tag to be edited.
   * @param {string} newName - The new name of the tag.
   */
  const handleEdited = (clickIndex, newName) => {
    setTags((prevTags) => {
      return prevTags.map((tag, index) => {
        if (clickIndex === index) {
          if (newName === "") {
            return {
              ...tag,
              isEditing: false,
              name: defaultTagsPool[Math.floor(Math.random() * defaultTagsPool.length)],
              isSelected: false,
            };
          } else {
            return {
              ...tag,
              name: newName,
              isEditing: false,
            };
          }
        }
        return tag;
      });
    });
  };

  useEffect(() => {
    /**
     * Initialize the tag state with random unselected tags.
     */
    const initializeTags = () => {
      const tagNames = [...defaultTagsPool];
      shuffle(tagNames);
      const newTags = [];
      tagNames.slice(0, 5).forEach((tagName) => {
        newTags.push({ name: tagName, isSelected: false });
      });
      setTags(newTags);
    };

    initializeTags();
  }, [setTags]);
  return (
    <div className="flex space-x-2">
      <div className="flex space-x-2">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            isSelected={tag.isSelected}
            isEditing={tag.isEditing}
            onClick={() => handleTagClick(index)}
            onEditClick={() => handleEditClick(index)}
            onEdited={(newName) => handleEdited(index, newName)}
          >
            {tag.name}
          </Tag>
        ))}
      </div>
      <button className="flex-none" onClick={randomizeUnselectedTags}>
        <FaArrowsRotate />
      </button>
    </div>
  );
};

export default TagList;
