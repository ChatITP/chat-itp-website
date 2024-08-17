import React from "react";
import Image from "next/image";
import Link from "next/link";

const CreditPage = () => {
  return (
    <>
      <nav className="px-2 pt-4 h-[84px]">
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
      <div id="acknowledge" className="pt-[84px] h-screen mx-[130px]">
        <div id="title">
          <h1 className="text-center text-4xl font-sans font-bold mb-7">
            Credits and Acknowledgments
          </h1>
        </div>
        <div id="des">
          <p className="text-center text-base font-sans mb-7">
            We extend our gratitude to the resources and individuals who have
            contributed to the development of Chat ITP.
          </p>
        </div>
        <div className="flex flex-row gap-6">
          <div className="w-[750px] h-[402px] border-[6px] border-white rounded-3xl"></div>
          <div className="w-[404px] h-[402px] border-[6px] border-white rounded-3xl"></div>
        </div>
      </div>

      <div id="team" className="h-screen">
        <div id="title">
          <h1 className="text-center text-4xl font-sans font-bold mb-7">
            Our Team
          </h1>
        </div>
        <div id="des">
          <p className="text-center text-base font-sans mb-7">
            Also alumni who signed up for our updates. Your support means a lot
            to us~
          </p>
        </div>
        <div id="member-container" className="h-[609px] bg-gray">
          <div
            id="col1"
            className="flex gap-x-[139px] justify-center mb-7 pt-14"
          >
            <div>
              <div className="w-[150px] h-[150px] bg-lightBlue border border-white rounded-full"></div>
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
              <div className="w-[150px] h-[150px] bg-lightBlue border border-white rounded-full"></div>
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
              <div className="w-[150px] h-[150px] bg-lightBlue border border-white rounded-full"></div>
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
              <div className="w-[150px] h-[150px] bg-lightBlue border border-white rounded-full"></div>
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
              <div className="w-[150px] h-[150px] bg-lightBlue border border-white rounded-full"></div>
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
              <div className="w-[150px] h-[150px] bg-lightBlue border border-white rounded-full"></div>
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
              <div className="w-[150px] h-[150px] bg-lightBlue border border-white rounded-full"></div>
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
      <div id="footer" className="h-[469px]">
        <p className="text-center text-xl font-sans pt-[94px] mb-[200px]">
          Thank you to everyone who contributed to making Chat ITP possible!
        </p>
        <div
          
          className="left-0 top-0 flex w-full items-center justify-between"
        >
          <div className="relative m-auto">
            <ul className="flex gap-14">
              <a href="mailto:chat.itp@itp.nyu.edu" target="_blank">
                <Image
                  src="/envelope.png"
                  alt="Envelope icon"
                  width={25}
                  height={25}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/chat-itp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/linkedin.png"
                  alt="Description of the image"
                  width={25}
                  height={25}
                />
              </a>
              <a
                href="https://www.instagram.com/chat.itp/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/instagram.png"
                  alt="Description of the image"
                  width={25}
                  height={25}
                />
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditPage;