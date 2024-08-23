import Image from "next/image";
import Link from "next/link";
import SignUp from "./SignUp";

export default function Footer() {
  return (
    <div id="footer" className="flex w-full h-96">
      <div className="flex flex-col md:flex-row md:gap-14 lg:gap-20 xl:gap-32 pt-10 md:pt-8  mx-auto">
        <div className="flex flex-row w-[200px] md:block items-center md:items-start ">
          <Image
            src="/logo.png"
            alt="logo"
            width={113}
            height={64}
            className="mb-4 md:mb-8 w-[56px] md:w-[80px] lg:w-[113px] h-auto mx-auto md:mx-0"
          />
          <div className="ml-4 md:ml-0 w-[300px] md:w-[200px] lg:w-[265px] h-auto md:mb-24 items-center md:text-left">
            <p className="font-sans text-[10px] w-[150px] md:w-[250px] md:text-xs text-offWhite">
              Chat ITP is an ethical, open-source Large language Model trained
              with 20+ years of ITP/NYU student work.
            </p>
          </div>
          <p className="hidden md:block font-sans text-xs text-offWhite">
            Copyright ChatITP
          </p>
        </div>
        <div className="pt-2 md:pt-9 flex flex-row gap-6 md:block ">
          <p className="font-sans text-xs md:text-sm font-bold text-offWhite">
            Service
          </p>
          <div className="flex flex-row pt-[1px] md:flex-col gap-4 md:pt-8">
            <Link href="/login">
              <p className="font-sans text-[10px] md:text-xs text-offWhite">
                Login
              </p>
            </Link>
            <Link href="/register">
              <p className="font-sans text-[10px] md:text-xs text-offWhite">
                Register
              </p>
            </Link>
            <p className="font-sans text-[10px] md:text-xs text-offWhite">
              Tutorial
            </p>
          </div>
        </div>
        <div className="pt-2 md:pt-9 flex flex-row gap-6 md:block">
          <p className="font-sans text-xs md:text-sm font-bold text-offWhite">
            Credits
          </p>
          <div className="flex flex-row pt-[1.5px] md:flex-col gap-4 md:pt-8">
            <Link href="/credits#acknowledge">
              <p className="font-sans text-[10px] md:text-xs text-offWhite">
                Database
              </p>
            </Link>
            <Link href="/credits#acknowledge">
              <p className="font-sans text-[10px] md:text-xs text-offWhite">
                Additional
              </p>
            </Link>
            <Link href="/credits#team">
              {" "}
              <p className="font-sans text-[10px] md:text-xs text-offWhite">
                Our Team
              </p>
            </Link>
          </div>
        </div>
        <div className="pt-4 md:pt-9">
          <p className="font-sams text-xs md:text-sm font-bold md:mb-8 text-offWhite">
            Join Our Newsletter
          </p>
          <SignUp />
          <div className="relative m-auto">
            <ul className="flex gap-6">
              <Link href="mailto:chat.itp@itp.nyu.edu" target="_blank">
                <div className="bg-blue rounded-full w-9 h-9">
                  {" "}
                  <Image
                    src="/envelope.png"
                    alt="Envelope icon"
                    width={18}
                    height={18}
                    className="m-auto pt-[9px]"
                  />
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/chat-itp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-blue rounded-full w-9 h-9">
                  <Image
                    src="/linkedin.png"
                    alt="Description of the image"
                    width={18}
                    height={18}
                    className="m-auto pt-[9px]"
                  />
                </div>
              </Link>

              <Link
                href="https://www.instagram.com/chat.itp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-blue rounded-full w-9 h-9">
                  <Image
                    src="/instagram.png"
                    alt="Description of the image"
                    width={18}
                    height={18}
                    className="m-auto pt-[9px]"
                  />
                </div>
              </Link>
            </ul>
          </div>
        </div>
        <div className="md:hidden">
          <p className="pt-4 text-[8px] font-sans text-offWhite">
            Copyright ChatITP
          </p>
        </div>
      </div>
    </div>
  );
}
