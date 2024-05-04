import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed left-0 top-0 flex w-full items-center justify-between bg-gradient-to-b p-4">
      <h1 className="font-mono text-lg font-bold">Chat ITP</h1>
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
