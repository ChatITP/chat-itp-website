"use client";
import Message from "./message";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

export default function ChatBar() {
  const [visible, setVisible] = useState(false);
  const messages = [
    'Please describe the "creative worldview" of ITP in 2001?',
    "What is the most common historical theme of ITP projects?",
    "Would you like to join our ITP class discussion?",
    "Tell me how women are commonly portrayed in ITP projects?",
    "Could you create some representative work for the ITP of 2050.",
    "Can you collaborate with me on game design?",
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
    <div className="px-12 lg:px-16 w-full h-[350px] flex flex-col justify-between overflow-x-hidden">
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
