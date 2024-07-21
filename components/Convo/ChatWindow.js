import React, { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList";
import LoadingDots from "./LoadingDots";
import request from "/app/lib/request";

const ChatWindow = ({ initialMessage }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef(null);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const removeDuplicates = (messages) => {
    const seen = new Set();
    return messages.filter((message) => {
      const isDuplicate = seen.has(message.text);
      seen.add(message.text);
      return !isDuplicate;
    });
  };

  const handleSendMessage = async (message) => {
    let newMessages = [...messages, { text: message, sender: "user" }];
    newMessages = removeDuplicates(newMessages);
    setMessages(newMessages);
    setLoading(true);
    setCurrentMessage("");

    try {
      const response = await request(
        "POST",
        "http://localhost:8000/api/llm/generate",
        {
          userPrompt: message,
        }
      );

      newMessages = [
        ...newMessages,
        { text: response.data.content, sender: "ai" },
      ];
      newMessages = removeDuplicates(newMessages);
      setMessages(newMessages);
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      newMessages = [
        ...newMessages,
        { text: "Failed to get a response from the model.", sender: "ai" },
      ];
      newMessages = removeDuplicates(newMessages);
      setMessages(newMessages);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialMessage && !hasSentInitialMessage) {
      handleSendMessage(initialMessage);
      setHasSentInitialMessage(true);
    }
  }, [initialMessage, hasSentInitialMessage]);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && currentMessage.trim() !== "") {
      handleSendMessage(currentMessage);
    }
  };

  const handleSendButtonClick = () => {
    if (currentMessage.trim() !== "") {
      handleSendMessage(currentMessage);
    }
  };

  return (
    <div className="flex flex-col h-96 w-[600px] p-2 bg-white rounded-lg border border-neutral-300 shadow-md">
      <div className="flex-1 w-full overflow-y-auto" ref={chatListRef}>
        <ChatList messages={messages} />
      </div>
      {loading && (
        <div className="flex justify-center items-center my-2">
          <LoadingDots />
        </div>
      )}
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={currentMessage}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="text-black flex-1 p-2 border border-blue rounded-md"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendButtonClick}
          className="ml-2 p-2 bg-blue text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

// import React, { useState, useEffect, useRef } from "react";
// import ChatList from "./ChatList";
// import LoadingDots from "./LoadingDots";
// import request from "/app/lib/request";

// const ChatWindow = ({ initialMessage }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const chatListRef = useRef(null);
//   const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
//   const [currentMessage, setCurrentMessage] = useState("");

//   const removeDuplicates = (messages) => {
//     const seen = new Set();
//     return messages.filter((message) => {
//       const isDuplicate = seen.has(message.text);
//       seen.add(message.text);
//       return !isDuplicate;
//     });
//   };

//   const handleSendMessage = async (message) => {
//     let newMessages = [
//       ...messages,
//       { text: message, sender: "user" },
//     ];
//     newMessages = removeDuplicates(newMessages);
//     setMessages(newMessages);
//     setLoading(true);
//     setCurrentMessage("");

//     try {
//       const response = await request(
//         "POST",
//         "http://localhost:8000/api/llm/generate",
//         {
//           userPrompt: message,
//         }
//       );

//       newMessages = [
//         ...newMessages,
//         { text: response.data.content, sender: "ai" },
//       ];
//       newMessages = removeDuplicates(newMessages);
//       setMessages(newMessages);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       newMessages = [
//         ...newMessages,
//         { text: "Failed to get a response from the model.", sender: "ai" },
//       ];
//       newMessages = removeDuplicates(newMessages);
//       setMessages(newMessages);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (initialMessage && !hasSentInitialMessage) {
//       handleSendMessage(initialMessage);
//       setHasSentInitialMessage(true);
//     }
//   }, [initialMessage, hasSentInitialMessage]);

//   useEffect(() => {
//     if (chatListRef.current) {
//       chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleInputChange = (e) => {
//     setCurrentMessage(e.target.value);
//   };

//   const handleInputKeyDown = (e) => {
//     if (e.key === "Enter" && currentMessage.trim() !== "") {
//       handleSendMessage(currentMessage);
//     }
//   };

//   const handleSendButtonClick = () => {
//     if (currentMessage.trim() !== "") {
//       handleSendMessage(currentMessage);
//     }
//   };

//   return (
//     <div
//       className="flex flex-col h-96 w-96 p-2 bg-grey/80 rounded-lg border border-neutral-300 shadow-md"
//       style={{ height: "400px", width: "640px" }}
//     >
//       <div className="flex-1 w-full overflow-y-auto" ref={chatListRef}>
//         <ChatList messages={messages} />
//       </div>
//       {loading && (
//         <div className="flex justify-center items-center my-2">
//           <LoadingDots />
//         </div>
//       )}
//       <div className="flex items-center mt-2">
//         <input
//           type="text"
//           value={currentMessage}
//           onChange={handleInputChange}
//           onKeyDown={handleInputKeyDown}
//           className="text-black flex-1 p-2 border border-neutral-300 rounded-md"
//           placeholder="Type a message..."
//         />
//         <button
//           onClick={handleSendButtonClick}
//           className="ml-2 p-2 bg-blue-500 text-black rounded-md"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
