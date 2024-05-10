"use client";
import Message from "./message";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

export default function ChatBar() {
  const [visible, setVisible] = useState(false);
  const messages = [
    "Hello!",
    "How are you?",
    "I'm good, thanks!",
    "What are you doing?",
    "I'm working on a project.",
    "That's cool! What project are you working on?",
    "I'm working on a chat bar component.",
  ];
  const startIndexRef = useRef(0);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
    let intervalId = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        startIndexRef.current += 3;
        startIndexRef.current %= messages.length;
        setVisible(true);
      }, 1000);
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className="relative w-96 h-[150px] sm:h-[500px]flex flex-col justify-between">
      <AnimatePresence>
        {visible ? (
          <>
            <Message message={messages[startIndexRef.current]} animationDelay={0} />
            <Message
              message={messages[(startIndexRef.current + 1) % messages.length]}
              animationDelay={0.2}
            />
            <Message
              message={messages[(startIndexRef.current + 2) % messages.length]}
              animationDelay={0.4}
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
