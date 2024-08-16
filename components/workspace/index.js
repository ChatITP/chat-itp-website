import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Examples from "./Examples";
import { RecoilRoot } from "recoil";

const Workspace = () => {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <Examples />
        <div className="bg-gray2">
          <InputComponent />
        </div>
      </DndProvider>
    </RecoilRoot>
  );
};

export default Workspace;
