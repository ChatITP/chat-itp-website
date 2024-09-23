import React from "react";
import Examples from "./Examples";
import { RecoilRoot } from "recoil";
import Background from "./Background";
import WorkArea from "./WorkArea";
import ScreenSizeLock from "./ScreenSizeLock";

const Workspace = () => {
  const preventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <RecoilRoot>
      <ScreenSizeLock>
        <div id="workspace" className="select-none">
          <Background />
          <WorkArea />
          <div className="absolute z-10 top-0 left-0 w-full">
            <Examples />
          </div>
        </div>
      </ScreenSizeLock>
    </RecoilRoot>
  );
};

export default Workspace;
