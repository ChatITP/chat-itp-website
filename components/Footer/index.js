import Image from "next/image";
export default function Footer() {
  return (
    <div
      id="footer"
      className="left-0 top-0 flex w-full items-center justify-between p-4 footer-background"
    >
      <div id="socio-container">
        <ul className="flex gap-14">
        <a href="chat.itp@itp.nyu.edu" target="_blank" rel="noopener noreferrer">
          <Image
                src="/envelope.png"
                alt="Envelope icon"
                width={25}
                height={25}
            />
        </a>
            <a href="https://www.linkedin.com/company/chat-itp/" target="_blank" rel="noopener noreferrer">
                <Image
                src="/linkedin.png"
                alt="Description of the image"
                width={25}
                height={25}
                />
            </a>
            <a href="https://www.instagram.com/chat.itp/" target="_blank" rel="noopener noreferrer">
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
  );
}
