"use client";
import React, { useEffect } from "react";

const IgPost = ({ embedCode = "" }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="instagram-post"
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
};

export default IgPost;
