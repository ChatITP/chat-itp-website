import Link from "next/link";

export default function Nav() {
  return (
    <nav className="z-50 flex justify-between items-center px-8 sm:px-12 md:px-16 h-16 fixed border-b-[1px] border-offWhite/15 w-full backdrop-blur-md bg-background/80">
      <div className="text-2xl font-bold text-offWhite">Chat ITP</div>
      <ul className="flex space-x-6 sm:space-x-10 md:space-x-16 text-offWhite font-light">
        <li>
          <Link href="/">
            <div>Try Chat ITP</div>
          </Link>
        </li>
        <li>
          <Link href="#about">
            <div>About</div>
          </Link>
        </li>
        <li>
          <Link href="/credits">
            <div>Credits</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
