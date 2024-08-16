"use client";
import Workspace from "@/components/Workspace";
import { RecoilRoot } from "recoil";
import AuthWrapper from "@/components/AuthWrapper";

const MyPage = () => {
  return (
    <div>
      <AuthWrapper>
        <RecoilRoot>
          <Workspace />
        </RecoilRoot>
      </AuthWrapper>
    </div>
  );
};

export default MyPage;
