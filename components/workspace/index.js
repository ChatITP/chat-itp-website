import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Examples from "./Examples";
import { RecoilRoot } from "recoil";
import Background from "./Background";

const Workspace = () => {
  return (
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <div className="" id="workspace">
          <Background />
          <Examples />
          <InputComponent />
        </div>
      </DndProvider>
    </RecoilRoot>
  );
};

export default Workspace;
