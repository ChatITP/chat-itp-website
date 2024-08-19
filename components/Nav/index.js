import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full z-50 flex justify-end items-center px-8 sm:px-12 md:px-16 h-16 fixed  backdrop-blur-md bg-background/80">
      {/* <div className="text-xl sm:text-2xl font-bold text-offWhite">Chat ITP</div> */}
      <ul className="flex space-x-6 sm:space-x-10 md:space-x-16 text-offWhite font-light text-sm sm:text-base items-center">
        <li>
          <Link href="/login">
            <div>Login</div>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <div>Sign Up</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
