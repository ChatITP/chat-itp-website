import Home from "@/components/Home";
import About from "@/components/About";
import Post from "@/components/Post";
import Nav from "@/components/Nav";
import PromptSection from "@/components/Prompt";

export default function Page() {
  return (
    <main id="about" className="min-w-[360px]">
      <Nav />
      <Home />
      <About />
      <PromptSection />
      {/* <Post /> */}
    </main>
  );
}
