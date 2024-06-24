import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="z-50 fixed left-0 top-0 flex flex-col-2 w-full">
      <ul>
        <li>
          <Image
            src="/logo.png"
            alt="ChatITP LOGO"
            className="block object-cover w-full h-auto left-[36px]"
            width={70}
            height={70}
          />
        </li>
        <li></li>
      </ul>
    </nav>

    // <nav className="z-50 fixed left-0 top-0 flex w-full items-center justify-between p-4 bg-white/10 backdrop-blur-md">
    //   <h1 className="text-lg font-bold">Chat ITP</h1>
    //   <ul className="flex gap-4">
    //     <li>
    //       <Link href="#home">Home</Link>
    //     </li>
    //     <li>
    //       <Link href="#about">About</Link>
    //     </li>
    //   </ul>
    // </nav>
  );
}
