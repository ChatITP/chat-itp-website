import React from "react";

const Button = ({ children, className }) => {
  return (
    <div id="Button">
      <button className={`bg-background relative rounded-3xl ${className}`}>
        <div className="absolute top-0 left-0 -z-10 bg-gradient-to-br w-full h-full from-[#90c7ff] from-20% to-[#7c39f7] rounded-4xl blur-md"></div>
        <div className="flex justify-center">
          <div className="text-[8px] md:text-sm text-center text-offWhite font-bold font-sans">
            {children}
          </div>
        </div>
      </button>
    </div>
  );
};

export default Button;

