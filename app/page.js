import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Home from "@/components/homepage/Home";
import About from "@/components/homepage/About";

export default function Page() {
  return (
    <main id="homepage" className="min-w-[360px]">
      <Nav />
      <Home />
      <About />
      {/* <PromptSection /> */}
      <div className="w-screen h-96 bg-cover bg-center" style={{backgroundImage: "url('/landingBg.jpg')"}}>
        <Footer />
      </div>
    </main>
  );
}
