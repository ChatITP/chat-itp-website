"use client";
import React, { useState } from "react";
import Convo from "@/components/Convo";
import { RecoilRoot } from "recoil";
import AuthWrapper from "@/components/AuthWrapper";

const MyPage = () => {
  const [tags, setTags] = useState([]);

  return (
    <div>
      <AuthWrapper>
        <Convo tags={tags} setTags={setTags} />
      </AuthWrapper>
    </div>
  );
};

export default MyPage;
