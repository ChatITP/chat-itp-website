import React from "react";
import Draggable from "react-draggable";
import { useRef } from "react";

const DraggableWrapper = ({ children, defaultX, defaultY, defaultZ }) => {
  // Reference to the draggable component to supress the findDOMNode warning
  const draggableRef = useRef(null);
  console.log(defaultX, defaultY);
  return (
    <Draggable nodeRef={draggableRef}>
      <div
        ref={draggableRef}
        className="w-fit h-fit absolute"
        style={{
          left: defaultX,
          top: defaultY,
          zIndex: defaultZ,
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableWrapper;
