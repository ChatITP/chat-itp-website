import React from "react";
import { useState, useEffect } from "react";
const ScreenSizeLock = ({ children }) => {
  const [lock, setLock] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setLock(true);
      } else {
        setLock(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (lock) {
    return (
      <div className="bg-gray font-sans text-md w-screen h-screen flex items-center justify-center flex-col relative z-50">
        <div className="max-w-[400px] text-center p-4">
          <div className="mb-4"> ( &gt;_&lt; '')</div>
          <div className="mb-2">
            Please use a bigger screen or browser window as we try to make Chat ITP work on all
            screen sizes.
          </div>
          <div className="mb-8">Sorry for the inconvenience.</div>
        </div>
      </div>
    );
  } else {
    return children;
  }
};

export default ScreenSizeLock;
