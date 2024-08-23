import React from "react";
import Examples from "./Examples";
import { RecoilRoot } from "recoil";
import Background from "./Background";
import WorkArea from "./WorkArea";

const Workspace = () => {
  const preventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <RecoilRoot>
      <div id="workspace" onDragOver={preventDefault} onDragEnter={preventDefault}>
        <Background />
        <WorkArea />
        <div className="absolute z-10 top-0 left-0 w-full">
          <Examples />
        </div>
      </div>
    </RecoilRoot>
  );
};

export default Workspace;
