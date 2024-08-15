import Home from "@/components/Home";
import About from "@/components/About";
import Post from "@/components/Post";
import Nav from "@/components/Nav";
import Ring from "@/components/About/Ring.js";
import Footer from "@/components/Footer";

import PromptSection from "@/components/Prompt";

export default function Page() {
  return (
    <main id="about" className="min-w-[360px]">
      <Nav />
      <Home />
      <About />
      {/* <Post /> */}
      <PromptSection />
      <Footer />
    </main>
  );
}
