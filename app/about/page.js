import Home from "@/components/Home";
import About from "@/components/About";
import Post from "@/components/Post";
import Nav from "@/components/Nav";
import Ring from "@/components/About/Ring.js";

export default function Page() {
  return (
    <main className="relative">
      <Ring />
      <Nav />
      <Home />
      <About />
      <Post />
    </main>
  );
}
