"use client";
import React, { useState } from "react";
import Convo from "@/components/Convo";

const MyPage = () => {
  const [tags, setTags] = useState([]);

  return (
    <div>
      <Convo tags={tags} setTags={setTags} />
    </div>
  );
};

export default MyPage;




