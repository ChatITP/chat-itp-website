import React from "react";
import Login from "@/components/Login";
import Ring from "@/components/Login/Ring";
import Image from "next/image";
import Link from "next/link";

export const LoginPage = () => {
  return (
    <div className="bg-gradient-45 z-0">
      <div className="z-10">
        {" "}
        <Ring />
      </div>
      <Link href = "/">
        <Image
          src="/logo.png"
          alt="logo"
          width={84}
          height={59}
          className="absolute ml-7 pt-4"
        />
      </Link>

      <div className="w-full h-screen flex flex-col items-center justify-center z-20">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
