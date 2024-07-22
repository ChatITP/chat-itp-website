import Home from "@/components/Home";
import About from "@/components/About";
import Post from "@/components/Post";
import Nav from "@/components/Nav";
import Ring from "@/components/About/Ring.js";


export default function Page() {
  return (
    <main className="relative">
      <Nav />
      
      <Home />
      <div className="absolute inset-0 z-15 left-0 top-[400px]">
          <Ring />
        </div>
      <About />
      
      <Post />
    </main>
  );
}
