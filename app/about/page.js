import Home from "@/components/Home";
import About from "@/components/About";
import Post from "@/components/Post";
import Nav from "@/components/Nav";
import PromptList from "@/components/Prompt/PromptList";

export default function Page() {
  return (
    <main>
      <Nav />
      <Home />
      <About />
      <PromptList />
      {/* <Post /> */}
    </main>
  );
}
