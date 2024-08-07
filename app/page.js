"use client";
import React, { useState } from "react";
import Convo from "@/components/Convo";
import { RecoilRoot } from "recoil";

const MyPage = () => {
  const [tags, setTags] = useState([]);

  return (
    <div>
      <RecoilRoot>
        <Convo tags={tags} setTags={setTags} />
      </RecoilRoot>
    </div>
  );
};

export default MyPage;
