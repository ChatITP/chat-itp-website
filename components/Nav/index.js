import Link from "next/link";
import Button from "../homepage/Button";

export default function Nav() {
  return (
    <nav className="w-full z-50 flex justify-end items-center px-8 pt-6 sm:px-12 md:px-16 h-16 fixed  backdrop-blur-md bg-background/80">
      <ul className="flex space-x-6 sm:space-x-10 md:space-x-16 text-offWhite font-light text-sm sm:text-base items-center">
        <li>
          <Link href="/login">
            <div className="text-sm">Login</div>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <Button width="122px" height="44px">
              <div className="flex items-center text-sm font-normal">
                Sign Up
              </div>
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
