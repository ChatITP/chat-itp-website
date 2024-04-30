import Home from "./home";
import About from "./about";

export default function Page() {
  return (
    <main className="min-h-screen p-24">
      <Home />
      <div className="h-[1000px]"></div>
      <About />
    </main>
  );
}
