import React from "react";

const Button = ({ width = "175px", height = "45.31px", children }) => {
  return (
    <div id="Button">
      <button
        style={{ width: width, height: height }}
        className="bg-background relative rounded-3xl"
      >
        <div className="absolute top-0 left-0 -z-10 bg-gradient-to-br w-full h-full from-[#90c7ff] from-20% to-[#7c39f7] rounded-4xl blur-md"></div>
        <div className="flex justify-center">
          <div className="text-center text-offWhite font-bold ">{children}</div>
        </div>
      </button>
    </div>
  );
};

export default Button;
