"use client";
import { useState } from "react";
import React from "react";

const Input = () => {
  const [searchKey, setSearchKey] = useState("enter here");
  return (
    <>
      <input className= "w-[450px] h-[38px] rounded-sm bg-black border border-blue" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
      {/* <p>{searchKey}</p> */}
    </>
  );
};

export default Input;
