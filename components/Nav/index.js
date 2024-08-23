import Link from "next/link";
import Button from "../homepage/Button";

export default function Nav() {
  return (
    <nav className="w-screen z-50 flex justify-end items-center px-8 pt-6 h-16 fixed  backdrop-blur-md bg-background/80">
      <ul className="flex space-x-4 md:space-x-6 xl:space-x-12 text-offWhite font-light text-[8px] md:text-xs xl:text-sm  items-center font-sans">
        <li>
          <Link href="/login">
            <div className="text-xs md:text-sm">Login</div>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <Button className="w-[80px] md:w-[122px] h-[30px] md:h-[44px]">
              <div className="flex items-center text-xs md:text-sm font-normal">
                Sign Up
              </div>
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
