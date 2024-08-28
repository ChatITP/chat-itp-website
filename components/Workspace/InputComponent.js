import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import ChatWindow from "./ChatWindow";
import DropZone from "./DropZone";

const ItemType = {
  PHRASE: "phrase",
};

const CHAT_WINDOW_DIMENSIONS = {
  width: 500,
  height: 278,
};

const InputComponent = () => {
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
  const clickedItemRef = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.PHRASE,
    drop: (item, monitor) => {
      const delta = monitor.getClientOffset();
      clickedItemRef.current = item.phrase;
      setClickedPosition({
        x: delta.x - CHAT_WINDOW_DIMENSIONS.width / 0.8,
        y: delta.y - CHAT_WINDOW_DIMENSIONS.height / 0.8,
      });
    },
  });

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 w-full space-y-2">
        <DropZone>
          <div ref={drop} className="flex justify-center pt-6">
            {clickedItemRef.current && (
              <ChatWindow
                initialMessage={clickedItemRef.current}
                initialPosition={clickedPosition}
              />
            )}
          </div>
        </DropZone>
      </div>
    </div>
  );
};

export default InputComponent;
