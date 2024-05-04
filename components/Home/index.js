import Background from "./background";

export default function Home() {
  return (
    <div id="home">
      <h1>Home</h1>
      <div className="absolute left-0 top-0 -z-10">
        <Background />
      </div>
    </div>
  );
}
