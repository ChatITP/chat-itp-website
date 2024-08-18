import React from "react";
import Draggable from "react-draggable";
const DraggableWrapper = ({ children }) => {
  return (
    <Draggable bounds>
      <div className="w-fit h-fit">{children}</div>
    </Draggable>
  );
};

export default DraggableWrapper;
