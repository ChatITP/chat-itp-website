import Ring from "./Ring";
import ChatWindow from "./ChatWindow";

export default function About() {
  return (
    <>
      <div className="min-h-[640px] max-w-[1440px] m-auto" id="about">
        <Ring />
        <div className="h-full flex justify-center">
          <div
            className="w-[716px] h-[394px] bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: "url('/chatWindowBg.jpg')" }}
          >
            <div className = "flex justify-center pt-[20px]">
              <ChatWindow />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
