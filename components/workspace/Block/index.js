import React, { useRef, useEffect, useState } from "react";
import Association from "./Association";
import Message from "./Message";

const Block = ({ messages, showMessage, toggleShowMessage, isLoading, onSendMessage }) => {
  const promptRef = useRef("");

  return (
    <div className="chat-list flex flex-col h-full w-[600px]">
      <div className="user-messages bg-gray text-white/80 pt-3 px-5">
        <Association promptRef={promptRef} />
        <Message promptRef={promptRef} />
      </div>
    </div>
  );
};

export default Block;
