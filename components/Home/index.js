import Background from "./background";
import ChatBar from "./chat-bar";

export default function Home() {
  return (
    <div id="home" className="h-screen min-h-[640px] block pt-[60px]">
      <div className="h-full min-h-full items-center place-content-around flex flex-col md:flex-row">
        <div className="px-10 md:pt-36 lg:pl-16 md:pb-20 pt-10 md:w-[50%] md:flex-none">
          <div className="md:w-72 m-auto lg:w-96">
            <h1 className="text-center md:text-6xl text-5xl font-semibold pb-4 md:text-left">
              Chat ITP
            </h1>
            <h2 className="text-center md:text-left">
              We are developing a large language model that reflects the collective creative
              consciousness of the Interactive Telecommunications Program at New York University.
            </h2>
          </div>
        </div>
        <div className="ml-auto w-full md:w-[377px] lg:w-[550px]">
          <ChatBar />
        </div>
      </div>

      <div className="absolute left-0 top-0 -z-10">
        <Background />
      </div>
    </div>
  );
}
