import Background from "./background";
import ChatBar from "./chat-bar";

export default function Home() {
  return (
    <div id="home" className="pt-[80px] min-h-screen h-screen block sm:pt-[60px]">
      <div className="h-full min-h-full items-center place-content-around sm:flex">
        <div className="p-10 pt-36 pb-0 sm:pb-[70px] sm:pt-10">
          <h1 className="text-center text-6xl font-semibold pb-4 sm:text-left">Chat ITP</h1>
          <h2 className="text-center sm:text-left">Welcome to Chat ITP! The dnkn dwa wdno djao</h2>
        </div>
        <div className="p-10 pb-40 sm:pb-[70px]">
          <ChatBar />
        </div>
      </div>

      <div className="absolute left-0 top-0 -z-10">
        <Background />
      </div>
    </div>
  );
}

