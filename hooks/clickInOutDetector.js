import { useEffect } from "react";

/**
 * A custom hook to detect click in and out of a component
 * Calls the corresponding callback functions when clicked in or out
 * @param {*} ref
 * @param {*} onClickIn
 * @param {*} onClickOut
 */
function useClickInOutDetector(ref, onClickIn, onClickOut) {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOut();
      } else {
        onClickIn();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref, onClickIn, onClickOut]);
}

export default useClickInOutDetector;
