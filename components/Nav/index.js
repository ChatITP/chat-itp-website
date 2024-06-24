import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="z-100 fixed left-0 top-0 flex justify-between items-center w-full pl-[30px] pr-[30px] bg-black">
      <ul className="flex items-center">
        <li>
          <Image
            src="/logo.png"
            alt="ChatITP LOGO"
            className="block object-cover lg:w-[105px]"
            width={70}
            height={70}
          />
        </li>
      </ul>
      <ul className="flex items-center">
        <li>
          <div className="relative">
            <div className="bg-gradient-to-r from-white to-gray-600 opacity-45 border-[1px] rounded-3xl w-[100px] h-[20px] lg:w-[205px] lg:h-[43px]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 rounded-3xl flex items-center justify-center">
              <ul className="flex items-center gap-8">
                <li>
                  <Image
                    src="/home.svg"
                    alt="Home Icon"
                    className="block object-cover w-[15px] lg:w-[20px]"
                    width={17}
                    height={17}
                  />
                </li>
                <li>
                  <Image
                    src="/convo.svg"
                    alt="Convo Icon"
                    className="block object-cover w-[15px] lg:w-[20px]"
                    width={17}
                    height={17}
                  />
                </li>
                <li>
                  <Image
                    src="/question.svg"
                    alt="Question Icon"
                    className="block object-cover w-[15px] lg:w-[20px]"
                    width={17}
                    height={17}
                  />
                </li>
              </ul>
            </div>
          </div>
        </li>
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
