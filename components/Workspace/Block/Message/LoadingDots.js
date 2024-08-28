import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingDots = ({ color = "#aaaaaa" }) => {
  return <BeatLoader color={color} />;
};

export default LoadingDots;
