import React from "react";
import LoadingDots from "./LoadingDots";
import { useState, useRef } from "react";
import useAuthRequest from "@/hooks/useAuthRequest";
import { IoSend } from "react-icons/io5";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const Message = ({ promptRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [output, setOutput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const hasGeneratedRef = useRef(false);
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

    if (response.data.type === "text") {
      setOutput(response.data.content);
      setImageUrl("");
    } else if (response.data.type === "image") {
      setOutput(response.data.content.text);
      setImageUrl(response.data.content.imageUrl);
    } else {
      setIsError(true);
      setOutput("Unsupported response type");
    }

    setIsLoading(false);
    hasGeneratedRef.current = true;
  };

  const handleAskButtonClick = () => {
    setIsLoading(true);
    generate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6 rounded-xl bg-[#434343]">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="bg-[#434343] rounded-xl p-6">
      {hasGeneratedRef.current && (
        <div className={`flex justify-end ${showMessage && "pb-6"}`}>
          <button onClick={toggleShowMessage} className="flex items-center">
            <div className="mr-1 text-xs font-semibold">
              {showMessage ? "Hide Response" : "Show Response"}
            </div>
            {showMessage ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
          </button>
        </div>
      )}
      {showMessage && (
        <div>
          <div
            className="text-sm max-h-[300px] overflow-y-auto scrollbar-thumb-[#313131] scrollbar-thin scrollbar-track-transparent"
            onWheel={(e) => e.stopPropagation()}
          >
            <ReactMarkdown>{output}</ReactMarkdown>
            {imageUrl && (
              <div className="mt-4">
                <img src={imageUrl} alt="" className="max-w-full h-auto" />
              </div>
            )}
          </div>
          <div className={`flex justify-center ${hasGeneratedRef.current && "pt-6"}`}>
            <button
              onClick={handleAskButtonClick}
              className="px-4 py-1 text-xs font-semibold text-white rounded-md flex hover:bg-white/20 items-center border"
            >
              <div className="flex items-center">
                <div className="pr-2">{hasGeneratedRef.current ? "Regenerate" : "Ask"}</div>
                <IoSend />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
