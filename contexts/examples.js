import { atom } from "recoil";

const tagState = atom({
  key: "tags",
  default: [],
});

const showExamplesState = atom({
  key: "showExamples",
  default: true,
});

const exampleState = atom({
  key: "examples",
  default: [
    {
      text: "What's the most innovative theme of ITP Projects?",
      phrases: ["What's", "the most innovative", "theme", "of ITP Projects?"],
    },
    {
      text: "Describe the most innovative 3d game modeling projects from the 1980s that utilized early computer graphics.",
      phrases: [
        "Describe",
        "the most innovative",
        "3d game modeling projects",
        "from the 1980s",
        "that utilized early computer graphics.",
      ],
    },
    {
      text: "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections.",
      phrases: [
        "In 2075,",
        "ITP students",
        "will use AR",
        "to redefine social interactions.",
        "Describe",
        "a project",
        "and its implications on privacy and connections.",
      ],
    },
    {
      text: "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA.",
      phrases: [
        "Imagine",
        "that all the ITP student work",
        "represents the DNA",
        "of a university program.",
        "Describe",
        "a university program",
        "based on this DNA.",
      ],
    },
    {
      text: "Write an advertisement poem about ITP Spring Show.",
      phrases: ["Write", "an advertisement poem", "about ITP Spring Show."],
    },

    {
      text: "How did ITP projects evolve in terms of multimedia storytelling from the 2000s to the 2010s?",
      phrases: [
        "How did ITP projects evolve",
        "in terms of multimedia storytelling",
        "from the 2000s",
        "to the 2010s?",
      ],
    },
    {
      text: "Design the “ITP version” of these common objects: Toaster, bubble tea, supercomputer, paper clip, pet chihuahua, underpants.",
      phrases: [
        "Design",
        "the “ITP version”",
        "of these common objects:",
        "Toaster, bubble tea, supercomputer, paper clip, pet chihuahua, underpants.",
      ],
    },
  ],
});

export { tagState, showExamplesState, exampleState };
