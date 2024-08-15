import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full z-50 flex justify-between items-center px-8 sm:px-12 md:px-16 h-16 fixed border-b-[1px] border-offWhite/15 backdrop-blur-md bg-background/80">
      <div className="text-xl sm:text-2xl font-bold text-offWhite">Chat ITP</div>
      <ul className="flex space-x-6 sm:space-x-10 md:space-x-16 text-offWhite font-light text-sm sm:text-base items-center">
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
