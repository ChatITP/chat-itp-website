import Button from "@/components/homepage/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div id="home" className="h-screen min-h-[640px] block pt-[60px] relative z-20">
        <div className="relative h-full pb-16 flex flex-col items-center justify-center">
          <h1 className="text-center text-5xl md:text-8xl font-semibold text-offWhite/50 pb-2 font-chango">Chat ITP</h1>
          <h2 className="mx-auto w-[320px] md:mx-0 md:w-[558px] text-sm md:text-xl font-sans text-offWhite text-center">
          An ethical, open-source Large language Model 
          trained with 20+ years of ITP/NYU student work.
          </h2>
        </div>
      </div>
    </>
  );
}
