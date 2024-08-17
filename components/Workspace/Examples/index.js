import React from "react";
import ExampleCards from "./ExampleCards";
import TopBar from "./TopBar";
import { useState } from "react";

export const Examples = () => {
  const [items, setItems] = useState([]);

  const sortedItems = items.sort(
    (a, b) => countHighlights(b, selectedTags) - countHighlights(a, selectedTags)
  );
  return (
    <div>
      <TopBar />
      <ExampleCards />
    </div>
  );
};

export default Examples;
