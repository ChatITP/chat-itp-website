import Background from "./background";
import ChatBar from "./chat-bar";

export default function Home() {
  return (
    <div id="home" className="pt-[60px] min-h-screen h-screen block overflow-x-hidden">
      <div className="h-full min-h-full items-center place-content-around flex">
        <div className="p-10 pb-[70px]">
          <h1 className="text-6xl font-semibold pb-4">Chat ITP</h1>
          <h2>Welcome to Chat ITP! The dnkn dwa wdno djao</h2>
        </div>
        <div className="p-10 pb-[70px]">
          <ChatBar />
        </div>
      </div>

      <div className="absolute left-0 top-0 -z-10">
        <Background />
      </div>
    </div>
  );
}
