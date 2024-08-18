import React from "react";
import { BeatLoader } from "react-spinners";

const LoadingDots = ({ color = "#6CA2D9" }) => {
  return <BeatLoader color={color} />;
};

export default LoadingDots;
