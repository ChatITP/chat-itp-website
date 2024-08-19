import Image from "next/image";
import Link from "next/link";
import SignUp from "./SignUp";

export default function Footer() {
  return (
    <div id="footer" className="left-0 top-0 flex w-full h-96">
      <div className="flex flex-row gap-28 pt-8 mx-24">
        <div>
          <Image
            src="/logo.png"
            alt="logo"
            width={113}
            height={64}
            className="mb-8"
          />
          <div className="w-[265px] h-[66px] mb-24">
            <p className="font-sans text-xs text-offWhite">
              Chat ITP is an ethical, open-source Large language Model trained
              with 20+ years of ITP/NYU student work.
            </p>
          </div>
          <p className="font-sans text-xs text-offWhite">Copyright Chat ITP</p>
        </div>
        <div className="ml-12 pt-9">
          <p className="font-sans text-sm font-bold text-offWhite">Service</p>
          <div className="flex flex-col gap-4 pt-8">
            <Link href="/login">
              <p className="font-sans text-xs text-offWhite">Login</p>
            </Link>
            <Link href="/register">
              <p className="font-sans text-xs text-offWhite">Register</p>
            </Link>
            <p className="font-sans text-xs text-offWhite">Tutorial</p>
          </div>
        </div>
        <div className="ml-14 pt-9">
          <p className="font-sans text-sm font-bold text-offWhite">Credits</p>
          <div className="flex flex-col gap-4 pt-8">
            <Link href="/credits#acknowledge">
              <p className="font-sans text-xs text-offWhite">Database</p>
            </Link>
            <Link href="/credits#acknowledge">
              <p className="font-sans text-xs text-offWhite">Additional</p>
            </Link>
            <Link href="/credits#team">
              {" "}
              <p className="font-sans text-xs text-offWhite">Our Team</p>
            </Link>
          </div>
        </div>
        <div className="ml-14 pt-9">
          <p className="font-sams text-sm font-bold mb-8 text-offWhite">
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
                    className = "m-auto pt-[9px]"
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
                    className = "m-auto pt-[9px]"
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
                    className = "m-auto pt-[9px]"
                  />
                </div>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
