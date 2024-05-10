import { motion } from "framer-motion";

export default function Message({ message, animationDelay }) {
  return (
    <motion.div
      initial={{ x: 800 }}
      animate={{ x: 0 }}
      exit={{ x: 800 }}
      transition={{ duration: 1, ease: "backInOut", delay: animationDelay }}
    >
      <div className="px-12 w-96 h-24 bg-white/25 rounded-lg backdrop-blur-md flex flex-col justify-center">
        <p>{message}</p>
      </div>
    </motion.div>
  );
}
