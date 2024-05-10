import Link from "next/link";

export default function Nav() {
  return (
    <nav className="z-50 fixed left-0 top-0 flex w-screen items-center justify-between p-4 bg-white/25 backdrop-blur-md">
      <h1 className="text-lg font-bold">Chat ITP</h1>
      <ul className="flex gap-4">
        <li>
          <Link href="#home">Home</Link>
        </li>
        <li>
          <Link href="#about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
