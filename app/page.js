"use client"
import React, { useState } from "react";
import Nav2 from "@/components/Nav2";
import Convo from "@/components/Convo";

const MyPage = () => {
  const [tags, setTags] = useState([]);

  return (
    <div>
      <Nav2 tags={tags} setTags={setTags} />
      <Convo tags={tags} />
    </div>
  );
};

export default MyPage;



