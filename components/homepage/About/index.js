import Ring from "./Ring";
import ChatWindow from "./ChatWindow";
import Link from "next/link";
import Button from "../Button";

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
            <div className = "flex justify-center pt-[20px] mb-16">
              <ChatWindow />
            </div>
            <div className="pb-10 flex justify-center">
            <Link href="/workspace">
              <Button>
                <div className="flex items-center text-lg">
                  Try Chat ITP
                </div>
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
