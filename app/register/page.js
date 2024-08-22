import React from "react";
import Register from "@/components/Register";
import Ring from "@/components/Login/Ring";
import Image from "next/image";
import Link from "next/link";

export const RegisterPage = () => {
  return (
    <div className="bg-gradient-45">
      {" "}
      <div className="z-10">
        {" "}
        <Ring />
      </div>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={84}
          height={59}
          className="absolute ml-7 pt-4"
        />
      </Link>
      <div className="flex justify-center items-center h-screen">
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
