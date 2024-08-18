import React from "react";
import Image from "next/image";
import LoadingDots from "./LoadingDots";
import { useState } from "react";
import useAuthRequest from "@/hooks/useAuthRequest";

const Message = ({ promptRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const request = useAuthRequest();

  const toggleShowMessage = () => {
    setShowMessage(!showMessage);
  };

  const generate = async () => {
    // fetch the system prompt to pass to initialization
    const systemPromptRes = await request(
      "get",
      process.env.NEXT_PUBLIC_API_URL +
        "/db/prompts?title=default_conversational&type=itp_collective_consciousness_model",
      null
    );
    const systemPrompt = systemPromptRes.data[0].system_prompt;

    // initialize the model
    await request("post", process.env.NEXT_PUBLIC_API_URL + "/llm/initialize", {
      systemPrompt,
    });

    // generate the output
    const response = await request("post", process.env.NEXT_PUBLIC_API_URL + "/llm/generate", {
      userPrompt: promptRef.current,
    });

    setOutput(response.data.content);
    setIsLoading(false);
  };

  const handleAskButtonClick = () => {
    setIsLoading(true);
    generate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-2 flex-1">
        <LoadingDots />
      </div>
    );
  }
  if (!showMessage) {
    return (
      <div className="flex justify-end">
        <button onClick={toggleShowMessage} className="font-sans text-xs flex items-center">
          <div className="mr-1">Expand Response</div>
          <Image className="flex-none" src="/expand.svg" alt="expand icon" width={9} height={9} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <button onClick={toggleShowMessage} className="font-sans text-xs flex items-center">
          <div className="mr-1">Hide Response</div>
          <Image className="flex-none" src="/hide.svg" alt="hide icon" width={9} height={9} />
        </button>
      </div>
      <div>{output}</div>
      <div className="flex justify-end">
        <button
          onClick={handleAskButtonClick}
          className="px-2 py-1 text-xs font-semibold text-white rounded-md flex hover:bg-white/20 items-center"
        >
          <div className="mr-1">Regenerate</div>
          <Image src="/switch.svg" alt="switch icon" width={15} height={15} className="flex-none" />
        </button>
      </div>
    </div>
  );
};

export default Message;
