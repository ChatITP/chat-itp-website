import React from "react";

const Button = ({ width = "175px", height = "45.31px", text = "Button" }) => {
  return (
    <div id="Button">
      <button
        style={{ width: width, height: height }}
        className="text-center px-auto shadow-glow rounded-2xl"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
