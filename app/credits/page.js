import React from "react";
import Image from "next/image";
import Link from "next/link";

const CreditPage = () => {
  return (
    <>
    
      <div className="bg-gradient-to-b from-[#1b0e25] via-[#1b0e25] to-[#3a2238]">
        <nav className="px-2 pt-4 h-[84px] z-10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo icon"
              width={70}
              height={61}
              className="my-auto ml-4"
            />
          </Link>
        </nav>

        <div id="acknowledge" className="pt-[84px] h-screen mx-[130px] z-10">
          <div id="title">
            <h1 className="text-center text-4xl font-sans font-bold mb-7 bg-gradient-to-r from-[#FFC75F] via-[#A8C4FF] to-[#FF6A88] bg-clip-text text-transparent">
              Credits and Acknowledgments
            </h1>
          </div>
          <div id="des">
            <p className="text-center text-xl font-sans mb-7">
              We extend our gratitude to the resources and individuals who have
              contributed to the development of Chat ITP.
            </p>
          </div>
          <div className="flex flex-row gap-6">
            <div className="w-[750px] h-[402px] bg-custom-radial rounded-3xl">
              <div className="w-[738px] h-[390px] bg-gradient-to-b from-[#1b0e25] via-[#1b0e25] to-[#3a2238] rounded-3xl m-auto mt-[6px]">
                <p className="text-xl font-sans font-bold text-center pt-8 mb-6">
                  Database Resources
                </p>
                <p className="text-base font-sans text-center mb-4">
                  The following databases have been instrumental in powering the
                  features of Chat ITP:
                </p>
                <Image
                  src="/database.png"
                  alt="database"
                  width={636}
                  height={271}
                  className="mx-auto h-[265.5px] rounded-t-[20px]"
                />
              </div>
            </div>
            <div className="w-[404px] h-[402px] bg-custom-radial rounded-3xl">
              <div className="w-[392px] h-[390px] bg-gradient-to-b from-[#1b0e25] via-[#1b0e25] to-[#3a2238] rounded-3xl m-auto mt-[6px]">
                <p className="text-xl font-sans font-bold text-center pt-8 mb-6">
                  Additional Resources
                </p>
                <p className="text-base font-sans text-left mx-6 mb-4">
                  We also acknowledge the use of the following tools and
                  libraries in the development of Chat ITP:
                </p>
                <div className="flex gap-4 mx-6">
                  <Image
                    src="/llama.png "
                    alt="llama"
                    width={122}
                    height={97}
                    className="rounded-[20px]"
                  />
                  <Image
                    src="/mongodb.png "
                    alt="mongodb"
                    width={122}
                    height={97}
                    className="rounded-[20px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="team" className="h-screen z-10">
          <div id="title">
            <h1 className="text-center text-4xl font-sans font-bold mb-7 bg-gradient-to-r from-[#FFC75F] via-[#A8C4FF] to-[#FF6A88] bg-clip-text text-transparent">
              Our Team
            </h1>
          </div>
          <div id="des">
            <p className="text-center text-base font-sans mb-7">
              Also alumni who signed up for our updates. Your support means a
              lot to us~
            </p>
          </div>
          <div id="member-container" className="h-[609px]  bg-custom-radial">
            <div
              id="col1"
              className="flex gap-x-[139px] justify-center mb-7 pt-14"
            >
              <div>
                <div className="w-[150px] h-[150px] bg-lightBlue border-[3px] border-white rounded-full"></div>
                <p className="text-sm font-sans font-semibold text-center pt-7">
                  Tyler peppel
                </p>
                <div className="pt-4">
                  <ul className="text-xs font-sans text-center">Founder</ul>
                  <ul className="text-xs font-sans text-center">
                    Project manage
                  </ul>
                </div>
              </div>

              <div>
                <div className="w-[150px] h-[150px] bg-lightBlue border-[3px] border-white rounded-full"></div>
                <p className="text-sm font-sans font-semibold text-center pt-7">
                  Ziyuan (Peter) Lin
                </p>
                <div className="pt-4">
                  <ul className="text-xs font-sans text-center">
                    Lead Software Engineer
                  </ul>
                </div>
              </div>
              <div>
                <div className="w-[150px] h-[150px] bg-lightBlue border-[3px] border-white rounded-full"></div>
                <p className="text-sm font-sans font-semibold text-center pt-7">
                  Ningyu (Duorfan) Fan{" "}
                </p>
                <div className="pt-4">
                  <ul className="text-xs font-sans text-center">
                    Outreach Manager
                  </ul>
                  <ul className="text-xs font-sans text-center">
                    User Experience Designer
                  </ul>
                </div>
              </div>
              <div>
                <div className="w-[150px] h-[150px] bg-lightBlue border-[3px] border-white rounded-full"></div>
                <p className="text-sm font-sans font-semibold text-center pt-7">
                  Yuxiang Cheng
                </p>
                <div className="pt-4">
                  <ul className="text-xs font-sans text-center">Full Stack</ul>
                </div>
              </div>
            </div>
            <div id="col2" className="flex gap-x-[139px] justify-center">
              <div>
                <div className="w-[150px] h-[150px] bg-lightBlue border-[3px] border-white rounded-full"></div>
                <p className="text-sm font-sans font-semibold text-center pt-7">
                  Nina Li
                </p>
                <div className="pt-4">
                  <ul className="text-xs font-sans text-center">
                    Software Engineer
                  </ul>
                </div>
              </div>
              <div>
                <div className="w-[150px] h-[150px] bg-lightBlue border-[3px] border-white rounded-full"></div>
                <p className="text-sm font-sans font-semibold text-center pt-7">
                  Cara Cai
                </p>
                <div className="pt-4">
                  <ul className="text-xs font-sans text-center">
                    User Experience Designer
                  </ul>
                </div>
              </div>
              <div>
                <div className="w-[150px] h-[150px] bg-lightBlue border-[3px] border-white rounded-full"></div>
                <p className="text-sm font-sans font-semibold text-center pt-7">
                  Anzhelika
                </p>
                <div className="pt-4">
                  <ul className="text-xs font-sans text-center">
                    Full Software Engineer
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer" className="h-[469px] z-10">
          <p className="text-center text-xl font-sans pt-[94px] mb-[200px]">
            Thank you to everyone who contributed to making Chat ITP possible!
          </p>
          <div className="left-0 top-0 flex w-full items-center justify-between">
            <div className="relative m-auto">
              <div className="flex gap-14">
                <div className="bg-custom-radial w-[45px] h-[45px] rounded-full">
                  <Link href="mailto:chat.itp@itp.nyu.edu" target="_blank">
                    <Image
                      src="/envelope.png"
                      alt="Envelope icon"
                      width={25}
                      height={25}
                      className="m-auto my-[10px]"
                    />
                  </Link>
                </div>
                <div className="bg-custom-radial w-[45px] h-[45px] rounded-full">
                  <Link
                    href="https://www.linkedin.com/company/chat-itp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/linkedin.png"
                      alt="Description of the image"
                      width={25}
                      height={25}
                      className="m-auto my-[10px]"
                    />
                  </Link>
                </div>
                <div className="bg-custom-radial w-[45px] h-[45px] rounded-full">
                  <Link
                    href="https://www.instagram.com/chat.itp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/instagram.png"
                      alt="Description of the image"
                      width={25}
                      height={25}
                      className="m-auto my-[10px]"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditPage;
