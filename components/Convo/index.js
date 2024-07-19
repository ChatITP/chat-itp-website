import React, { useState } from 'react';
import InputComponent from '@/components/Convo/input'; // Adjust path if necessary

const Home = () => {
  const [tags, setTags] = useState([]);
  const phrases = [
    "What’s the most innovative theme of ITP Projects?",
    "Describe the most innovative 3d game modeling projects from the 1980s that utilized early computer graphics.",
    "In 2075, ITP students will use AR to redefine social interactions. Describe a project and its implications on privacy and connections.",
    "Imagine that all the ITP student work represents the DNA of a university program. Describe a university program based on this DNA",
    "Write an advertisement poem about ITP Spring Show.",
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">ChatITP</h1>
      <InputComponent tags={tags} setTags={setTags} phrases={phrases} />
    </div>
  );
};

export default Home;
