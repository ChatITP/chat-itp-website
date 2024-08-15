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
        <RecoilRoot>
          <Convo tags={tags} setTags={setTags} />
        </RecoilRoot>
      </AuthWrapper>
    </div>
  );
};

export default MyPage;
