import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const CreditPage = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#1b0e25] via-[#1b0e25] to-[#3a2238]">
        <nav className="px-2 pt-4 h-[84px] z-10">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo icon"
              width={116}
              height={65}
              className="my-auto ml-4 w-[20%] md:w-[116px]"
            />
          </Link>
        </nav>

        <div
          id="acknowledge"
          className="pt-[50%] md:pt-[84px] h-screen mx-auto z-10"
        >
          <div id="title">
            <h1
              className="text-center text-xl lg:text-4xl font-sans font-bold mb-4 lg:mb-7 text-transparent bg-clip-text"
              style={{
                backgroundImage: "url('/radialBg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Credits and Acknowledgments
            </h1>
          </div>
          <div id="des">
            <p className="mx-auto w-[90%] text-center text-sm lg:text-xl font-sans mb-14 md:mb-7">
              We extend our gratitude to the resources and individuals who have
              contributed to the development of Chat ITP.
            </p>
          </div>
          <div className="flex flex-row gap-6 w-[85%] mx-auto">
            <div
              className="w-[60%] h-[402px] max-h-[150px] md:max-h-full rounded-3xl"
              style={{
                backgroundImage: "url('/radialBg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.8,
              }}
            >
              <div className="w-[98%]  h-[390px] max-h-[146px] md:max-h-full bg-gradient-to-b from-[#1b0e25] via-[#1b0e25] to-[#3a2238] rounded-3xl mt-[2px] md:mt-[6px] mx-auto flex flex-col justify-between">
                <div className="flex-grow flex flex-col justify-center">
                  <p className="text-xs md:text-base lg:text-xl font-sans font-bold text-center pt-4 md:pt-8 mb-2 xl:mb-6">
                    Database Resources
                  </p>
                  <p className="w-[90%] text-[10px] lg:text-base font-sans text-center mb-4 mx-auto">
                    The following databases have been instrumental in powering
                    the features of Chat ITP.
                  </p>
                </div>
                <div className="flex justify-center items-end">
                  <Image
                    src="/database.png"
                    alt="database"
                    width={636}
                    height={271}
                    className="w-[75%] h-[40px] md:h-[200px] lg:w-[80%] xl:w-[620px]  xl:h-[241px] rounded-t-xl lg:rounded-t-[20px]"
                  />
                </div>
              </div>
            </div>
            <div
              className="w-[40%] h-[402px] max-h-[150px] md:max-h-full bg-cover bg-center rounded-3xl"
              style={{ backgroundImage: "url('/radialBg.jpg')" }}
            >
              <div className="w-[98%] h-[390px] max-h-[146px] md:max-h-full bg-gradient-to-b from-[#1b0e25] via-[#1b0e25] to-[#3a2238] rounded-3xl mx-auto mt-[2px] md:mt-[6px]">
                <p className="text-xs md:text-base lg:text-xl font-sans font-bold text-center pt-4 md:pt-8 mb-2 xl:mb-6">
                  Additional Resources
                </p>
                <p className="w-[90%] text-[10px] lg:text-base font-sans text-center mb-4 mx-auto">
                  We also acknowledge the use of the following tools and
                  libraries in the development of Chat ITP.
                </p>
                <div className="hidden md:w-[80%] mx-auto md:flex md:flex-row md:pt-8 xl:gap-4">
                  <ul className="text-[8px] lg:text-base font-sans">
                    <li>Milvus</li>
                    <li>MongoDB</li>
                    <li>Llama 3.1</li>
                    <li>Express</li>
                    <li>Next.js</li>
                    <li>all-mpnet-base-v2</li>
                  </ul>
                  <Image
                    src="/resources.svg"
                    alt="resources"
                    width={199}
                    height={113}
                    className="mx-auto w-[50%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="team" className="md:h-screen z-10 mb-10">
          <div id="title">
            <h1
              className="text-center text-xl lg:text-4xl font-sans font-bold mb-7 text-transparent bg-clip-text"
              style={{
                backgroundImage: "url('/radialBg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.8,
              }}
            >
              Our Team
            </h1>
          </div>
          <div id="des">
            <p className="w-[90%] mx-auto text-center text-sm lg:text-base font-sans mb-7">
              Also alumni who signed up for our updates. Your support means a
              lot to us~
            </p>
          </div>
          <div
            id="member-container"
            className="h-[450px] md:h-[645px]  bg-cover bg-center mb-[40px]"
            style={{ backgroundImage: "url('/radialBg.jpg')" }}
          >
            <div
              id="col1"
              className="flex gap-x-[20px] md:gap-x-[80px] lg:gap-x-[120px] xl:gap-x-[150px] justify-center mb-7 pt-14 mx-auto"
            >
              <div className="flex flex-col items-center">
                <div className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px] bg-lightBlue border-[1px] md:border-[3px] border-white rounded-full"></div>
                <p className="text-[10px] md:text-sm font-sans font-semibold text-center pt-3 md:pt-7 leading-tight">
                  Tyler <br className="md:hidden" /> peppel
                </p>
                <div className="pt-2 md:pt-4 text-center">
                  <ul className="text-[8px] md:text-xs font-sans">Founder</ul>
                  <ul className="text-[8px] md:text-xs font-sans">
                    Project Manager
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px] bg-lightBlue border-[1px] md:border-[3px] border-white rounded-full"></div>
              <p className="text-[10px] md:text-sm font-sans font-semibold text-center pt-3 md:pt-7 leading-tight">
                  Ziyuan <br className="md:hidden" />
                  (Peter)
                  <br className="md:hidden" /> Lin
                </p>
                <div className="pt-2 md:pt-4 text-center">
                  <ul className="text-[8px] md:text-xs font-sans">
                    Lead <br className="md:hidden" />
                    Software Engineer
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px] bg-lightBlue border-[1px] md:border-[3px] border-white rounded-full"></div>
              <p className="text-[10px] md:text-sm font-sans font-semibold text-center pt-3 md:pt-7 leading-tight">
                  Ningyu <br className="md:hidden" />
                  (Duorfan) <br className="md:hidden" />
                  Fan
                </p>
                <div className="pt-2 md:pt-4 text-center">
                  <ul className="text-[8px] md:text-xs font-sans">
                    Outreach Manager
                  </ul>
                  <ul className="text-[8px] md:text-xs font-sans">
                    User Experience <br className="md:hidden" />
                    Designer
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px] bg-lightBlue border-[1px] md:border-[3px] border-white rounded-full"></div>
              <p className="text-[10px] md:text-sm font-sans font-semibold text-center pt-3 md:pt-7 leading-tight">
                  Yuxiang
                  <br className="md:hidden" /> Cheng
                </p>
                <div className="pt-2 md:pt-4 text-center">
                  <ul className="text-[8px] md:text-xs font-sans">
                    Full Stack
                  </ul>
                </div>
              </div>
            </div>

            <div
              id="col2"
              className="flex gap-x-[20px] md:gap-x-[80px] lg:gap-x-[120px] xl:gap-x-[150px] justify-center mb-7 pt-14 md:pt-32 lg:pt-20 xl:pt-14 mx-auto"
            >
              <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px] bg-lightBlue border-[1px] md:border-[3px] border-white rounded-full"></div>
              <p className="text-[10px] md:text-sm font-sans font-semibold text-center pt-3 md:pt-7 leading-tight">
                  Nina Li
                </p>
                <div className="pt-2 md:pt-4 text-center">
                  <ul className="text-[8px] md:text-xs font-sans">
                    Software Engineer
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px] bg-lightBlue border-[1px] md:border-[3px] border-white rounded-full"></div>
              <p className="text-[10px] md:text-sm font-sans font-semibold text-center pt-3 md:pt-7 leading-tight">
                  Cara Cai
                </p>
                <div className="pt-2 md:pt-4 text-center">
                  <ul className="text-[8px] md:text-xs font-sans">
                    User Experience Designer
                  </ul>
                </div>
              </div>

              <div className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px] bg-lightBlue border-[1px] md:border-[3px] border-white rounded-full"></div>
              <p className="text-[10px] md:text-sm font-sans font-semibold text-center pt-3 md:pt-7 leading-tight">
                  Anzhelika
                </p>
                <div className="pt-2 md:pt-4 text-center">
                  <ul className="text-[8px] md:text-xs font-sans">
                    Full Software Engineer
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CreditPage;
