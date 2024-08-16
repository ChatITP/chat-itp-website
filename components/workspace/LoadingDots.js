import React from 'react';
import {BeatLoader} from "react-spinners"

const LoadingDots = ({color = "#6CA2D9"}) => {
  return (
    <BeatLoader color = {color} />
    // <div className="flex space-x-2">
    //   <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"></div>
    //   <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce delay-75"></div>
    //   <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce delay-150"></div>
    // </div>
  );
};

export default LoadingDots;
