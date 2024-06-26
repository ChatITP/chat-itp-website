import SignUp from "../SignUp";

export default function About() {
  return (
    <div id="about" className="p-14 pt-48 min-h-screen sm:p-24 sm:pt-48 max-w-[1024px] m-auto">
      <h1 className="text-center font-bold text-4xl pb-12 sm:text-left">About</h1>
      <p className="text-center pb-12 sm:text-left">
        We are training an ethical, open-source LLM using 20+ years of ITP/NYU student work -
        including video, sculpture, writing, animation, game design, and virtual reality. Our goal
        is to reflect the creative legacy of the ITP community with a model that can reflect on the
        history of student work.
      </p>
      <SignUp />
    </div>
  );
}
