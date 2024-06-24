'use client'
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "../../components/DragDrop";

const Conversation = () => {
  return (
    <div className="pt-[70px] w-full h-screen">
      <DndProvider backend={HTML5Backend}>
        <div className="Conversation"></div>
        <DragDrop />
      </DndProvider>
    </div>
  );
};

export default Conversation;

