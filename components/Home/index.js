import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <div id="home" className="h-screen min-h-[640px] block pt-[60px]">
        <div className="h-full min-h-full items-center place-content-center flex flex-col pb-16">
          <div className="w-[244px] h-[[107px] pb-7">
            <h1 className="text-center text-[52px] font-semibold">Chat ITP</h1>
          </div>
          <div className="w-[727px] h-[100.93px]">
            <h2 className="text-base text-left">
              We are training an ethical, open-source LLM using 20+ years of
              ITP/NYU student work - including video, sculpture, writing,
              animation, game design, and virtual reality.
            </h2>
          </div>
          <Button text="Start Now" />
        </div>
      </div>
    </>
    // <div id="home" className="h-screen min-h-[640px] block pt-[60px]">
    //   <div className="h-full min-h-full items-center place-content-around flex flex-col md:flex-row">
    //     <div className="px-10 md:pt-36 lg:pl-16 md:pb-20 pt-10 md:w-[50%] md:flex-none">
    //       <div className="md:w-72 m-auto lg:w-96">
    //         <h1 className="text-center md:text-6xl text-5xl font-semibold pb-4 md:text-left">
    //           Chat ITP
    //         </h1>
    //         <h2 className="text-center md:text-left">
    //           We are developing a large language model that reflects the collective creative
    //           consciousness of the Interactive Telecommunications Program at New York University.
    //         </h2>
    //       </div>
    //     </div>
    //     <div className="ml-auto w-full md:w-[377px] lg:w-[550px]">
    //       <ChatBar />
    //     </div>
    //   </div>

    //   <div className="absolute left-0 top-0 -z-10">
    //     <Background />
    //   </div>
    // </div>
  );
}
