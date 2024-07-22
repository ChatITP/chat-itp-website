import React from "react";

const Button = ({ width = "175px", height = "45.31px", text = "Button" }) => {
  return (
    <div id="Button">
      <button
        style={{ width: width, height: height }}
        className="shadow-glow rounded-2xl"
      >
        <div className="flex justify-center gap-6">
          <div className="text-center my-auto"> {text}</div>

          <div className="bg-lightBlue w-[40px] h-[27px] rounded-md text-black text-base">→</div>
        </div>
      </button>
    </div>
  );
};

export default Button;
