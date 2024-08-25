import React from "react";
import Draggable from "react-draggable";
import { useRef } from "react";
import { blockListState } from "@/contexts/workspace";
import { useSetRecoilState } from "recoil";

const DraggableWrapper = ({ children, x, y, z, id }) => {
  const setBlockList = useSetRecoilState(blockListState);

  const localClickPositionRef = useRef({ x: 0, y: 0 });

  const onDragStart = (event) => {
    const targetRect = draggableRef.current.getBoundingClientRect();
    const localX = event.clientX - targetRect.left;
    const localY = event.clientY - targetRect.top;
    localClickPositionRef.current = { x: localX, y: localY };
  };

  const onDragEnd = (event) => {
    const { x, y } = event;
    setBlockList((prevBlockList) => {
      const newBlockList = [...prevBlockList];
      newBlockList[id] = {
        ...newBlockList[id],
        x: x - localClickPositionRef.current.x,
        y: y - localClickPositionRef.current.y,
      };
      return newBlockList;
    });
  };

  const draggableRef = useRef(null);
  return (
    <Draggable
      nodeRef={draggableRef}
      style={{
        zIndex: z,
      }}
      position={{ x, y }}
      onStart={onDragStart}
      onStop={onDragEnd}
    >
      <div ref={draggableRef} className="w-fit h-fit absolute">
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableWrapper;
