import React from "react";
import Login from "@/components/Login";
import Ring from "@/components/Login/Ring";

export const LoginPage = () => {
  return (
    <div className="bg-gradient-45">
        <Ring />
      <div className="w-full h-screen flex flex-col items-center justify-center pb-20 z-20">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
