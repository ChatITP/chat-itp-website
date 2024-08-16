"use client";
import React, { useState } from "react";
import Workspace from "@/components/workspace";
import { RecoilRoot } from "recoil";
import AuthWrapper from "@/components/AuthWrapper";

const MyPage = () => {
  const [tags, setTags] = useState([]);

  return (
    <div>
      <AuthWrapper>
        <RecoilRoot>
          <Workspace tags={tags} setTags={setTags} />
        </RecoilRoot>
      </AuthWrapper>
    </div>
  );
};

export default MyPage;
