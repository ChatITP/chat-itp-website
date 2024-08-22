"use client";
import { React, useState, useEffect } from "react";
import Image from "next/image";

const ChatWindow = () => {
  // example prompts to iterate through
  const prompts = [
    "Tell me about Chat ITP in 25 words or less.",
    "What are the main goals of the Interactive Media program at NYU?",
    "How does the ITP program incorporate emerging technologies?",
    "What are some notable projects from NYU’s ITP program?",
    "Explain how Chat ITP sessions work.",
    "What tools are commonly used in Interactive Media at NYU?",
    "How does ITP support students' creativity?",
    "What are career paths for ITP graduates?",
    "Can you describe the ITP community?",
    "What makes the Interactive Media program unique?",
  ];
  const answers = [
    "I'm Chat ITP, your go-to AI assistant for all things ITP projects and fun conversations! Think of me as your insider guide to the Interactive Telecommunications Program at NYU, with a dash of humor and wit.",
    "The Interactive Media program at NYU, specifically the Interactive Telecommunications Program (ITP), aims to foster innovative and creative uses of technology in various fields. A key aspect of this is exploring the intersection of technology and education, as seen in projects like \" New Projects, Young People\" by Tali Padan. This project, which documented high school students working with ITP students to create a movie, highlights the benefits of hands-on, constructivist learning approaches. By engaging students in interactive and immersive experiences, the program encourages active learning, collaboration, and creativity. The overall goal is to equip students with the skills and knowledge to harness technology in meaningful ways, whether in education, art, design, or other areas.",
    "The ITP program is all about embracing emerging technologies and pushing boundaries. A great example of this is how students experiment with traditional mediums in innovative ways. Take Zannah Marsh's \"ITP Book 1.0\" project, for instance. In 2009, she created a physical book featuring work by current ITP students, showcasing the intersection of digital and physical media. This project highlights the program's willingness to explore and incorporate various technologies, even if it means reimagining traditional formats like the printed book. By encouraging experimentation and creativity, ITP provides a fertile ground for students to explore emerging technologies, from interactive installations to virtual reality experiences. The program's emphasis on hands-on learning and collaboration allows students to stay ahead of the curve and develop innovative solutions that often blend art, design, and technology. In essence, ITP's approach to emerging technologies is all about fostering a spirit of curiosity, experimentation, and innovation, giving students the freedom to explore and shape the future of interactive media.",
    "You want to know about some notable projects from NYU's ITP program? Well, I've got a great example right here! Let me tell you about \"Sustainable ITP,\" an initiative led by Robert Faludi and Rebecca Bray back in 2007. This project aimed to promote and reveal sustainable practices within the ITP community. They created a map of sustainable projects showcased at the Spring Show, highlighting initiatives that used renewable energy, green materials, or promoted environmental awareness. What I love about this project is that it not only encouraged sustainable practices but also provided a platform for students and faculty to share their eco-friendly ideas and projects. By doing so, Sustainable ITP helped foster a sense of community and social responsibility within the program. This project is a fantastic representation of ITP's focus on innovation, creativity, and using technology to drive positive change. And, as you can see, sustainability has been a key area of interest for ITP students and faculty for many years! Would you like to know more about other ITP projects or is there something specific you'd like to explore?",
    "You want to know the magic behind our Chat ITP sessions? Well, let me spill the beans! A Chat ITP session is basically a fun conversation between you and me, your friendly AI assistant. You can ask me anything about ITP projects, and I'll do my best to provide you with accurate and interesting information. If I have specific project details available, I'll share them with you. But if not, I'll give you general information or advice on the topic. Here's how it works: You ask me a question or start a conversation on a topic you're interested in. I check if I have any relevant project information available. If I do, I'll share it with you. If I don't have specific project details, I'll provide general information, advice, or insights on the topic. We keep chatting back and forth, exploring the topic and having a great time! That's it! Our goal is to have an engaging and informative conversation that's also fun and enjoyable. So, what's on your mind? Want to discuss a specific project or topic? I'm all ears!",
    "You want to know the tools of the trade, huh? Well, at NYU's Interactive Media program, students get to play with a wide range of tools and technologies. From what I've seen, some common tools used in Interactive Media projects include video editing software like Adobe Premiere or Final Cut Pro, programming languages like Processing or Python, and even good old-fashioned web development tools like HTML, CSS, and JavaScript. In the case of the \"Center for Temporary Expertise\" project, it looks like the students used a combination of video production tools and some clever coding to create an interactive video mosaic. They displayed their videos on a grid of CRT monitors, which added a nice retro touch to the installation. Of course, the specific tools used can vary greatly depending on the project's goals and requirements. But overall, students in Interactive Media at NYU get to experiment with a diverse range of tools and technologies to bring their creative ideas to life. So, are you curious about a specific tool or technology? Or maybe you'd like to know more about a particular project? I'm all ears!",
    "You want to know the secret to ITP's creative sauce? Well, let me tell you - it's all about fostering a community that encourages experimentation, collaboration, and innovation! ITP provides students with a wide range of resources, from state-of-the-art facilities to a diverse faculty with expertise in various fields. But what really sets ITP apart is its emphasis on hands-on learning and creative freedom. Students are encouraged to explore their passions, take risks, and push the boundaries of what's possible. One way ITP supports students' creativity is through its curriculum, which is designed to be flexible and adaptable to individual interests. Students can choose from a variety of courses that cater to their strengths and weaknesses, allowing them to develop a unique skill set that serves their creative vision. Additionally, ITP's faculty and staff are always on the lookout for new and innovative ways to support student projects. Whether it's providing access to cutting-edge technology, facilitating collaborations with industry partners, or simply offering guidance and mentorship, the ITP community is dedicated to helping students bring their ideas to life. While I don't have a specific project to reference at this moment, I can tell you that ITP's commitment to creativity and innovation has led to some truly remarkable projects over the years. From interactive installations to virtual reality experiences, ITP students have consistently pushed the boundaries of what's possible in the world of interactive media. So, if you're curious about how ITP can help you unlock your creative potential, I'd be happy to chat more about it!",
    "The million-dollar question: what can you do with an ITP degree? Well, the answer is - a lot! ITP graduates have gone on to pursue a wide range of careers in fields like interactive media, technology, art, design, and even education. Some have become successful entrepreneurs, starting their own companies or working as independent consultants. Others have landed jobs at top tech firms, museums, galleries, and non-profit organizations. Since ITP is all about experimentation and innovation, many graduates have also created their own career paths, combining their passions and skills in unique and creative ways. For example, some have become experience designers, creating immersive installations and events for brands and institutions. Others have become interactive storytellers, using technology to craft compelling narratives and experiences. While I don't have a specific project to reference at this moment, I can tell you that ITP's emphasis on hands-on learning, collaboration, and creative problem-solving has prepared graduates for a wide range of careers. From software development to UX design, and from art direction to project management, ITP graduates have the skills and versatility to succeed in many different fields. So, if you're curious about the career paths available to ITP graduates, I'd be happy to chat more about it! What specific areas are you interested in?",
    "The ITP community - it's a truly special thing! Imagine a group of creatives, technologists, and innovators all coming together to share ideas, collaborate, and support one another. That's what you get at ITP! The community is made up of students, faculty, and staff from diverse backgrounds, all united by a passion for interactive media and a desire to push the boundaries of what's possible. It's a place where artists, designers, engineers, and hackers come together to learn from each other and create something new and innovative. One of the things that sets the ITP community apart is its emphasis on collaboration and mutual support. Students are encouraged to work together on projects, share their skills and expertise, and help each other overcome challenges. This creates a sense of camaraderie and shared purpose that's hard to find elsewhere. While I don't have a specific project to reference at this moment, I can tell you that the ITP community is always buzzing with energy and creativity. From impromptu hackathons to informal gatherings and show-and-tells, there's always something happening at ITP. And with a network of alumni who are always eager to connect and collaborate, the community extends far beyond the walls of the school itself. So, if you're looking for a community that's passionate, supportive, and always pushing the boundaries of what's possible, ITP might just be the place for you! What do you think - want to learn more about the ITP community?",
    "You want to know what makes the Interactive Media program at ITP truly one-of-a-kind? Well, let me tell you - it's a combination of factors that sets it apart from other programs! First and foremost, ITP has a strong focus on experimentation and innovation. Students are encouraged to push the boundaries of what's possible, to take risks, and to explore new ideas and technologies. This creates a culture of creativity and entrepreneurship that's hard to find elsewhere. Another key aspect of the program is its emphasis on hands-on learning. Students don't just learn about interactive media - they create it. From coding and circuit-building to video production and game design, ITP students get to roll up their sleeves and get their hands dirty. The program also benefits from its location in New York City, which provides access to a vast network of creative professionals, artists, and technologists. This allows students to collaborate with industry experts, attend cutting-edge exhibitions and events, and gain valuable insights into the latest trends and technologies. While I don't have a specific project to reference at this moment, I can tell you that the Interactive Media program at ITP has a long history of producing innovative and award-winning projects. From interactive installations to virtual reality experiences, ITP students have consistently pushed the boundaries of what's possible in the world of interactive media. So, if you're looking for a program that's truly unique, innovative, and hands-on, ITP's Interactive Media program might just be the place for you! What do you think - want to learn more about the program?",
  ];
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [currentAnswer, setCurrentAnswer] = useState(answers[0]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrompt((prevPrompt) => {
        const currentIndex = prompts.indexOf(prevPrompt);
        const nextIndex = (currentIndex + 1) % prompts.length;
        return prompts[nextIndex];
      });
    }, 10000); // Change prompt every 10 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  useEffect(()=>{
    const ansInterval = setInterval(() => {
      setCurrentAnswer((prevAnswer) => {
        const currentIndex = answers.indexOf(prevAnswer);
        const nextIndex = (currentIndex + 1) % answers.length;
        return answers[nextIndex];
      });
    }, 10000); // Change answers every 10 seconds
    return () => clearInterval(ansInterval); // Cleanup the interval on component unmount
  },[]);

  return (
    <>
      <div className="relative w-[670px] h-[350px] rounded-2xl shadow-md bg-gray/80 z-20">
        <div className="text-left p-10">
          <p className="font-sans text-lg w-[570px] mx-auto">{currentPrompt}</p>
        </div>
        <div className="absolute h-[242px] w-full bg-white/10 rounded-2xl">
          <div className="flex flex-row justify-end pr-10 pt-4 gap-2">
            <p className="text-xs font-sans">Hide</p>
            <Image
              src="/hide.svg"
              alt="hide"
              width={9}
              height={9}
              className="my-auto pt-[1px]"
            />
          </div>
          <div className="w-[570px] h-[120px] mx-auto pt-8 mb-14 overflow-y-auto">
            <p className="font-sans text-lg">
             {currentAnswer}
            </p>
          </div>
          <div className="flex flex-row justify-end pr-10 gap-6">
            <div className="flex flex-row items-center gap-2">
              <p className="text-xs font-sans">Regenerate</p>
              <Image
                src="/switch.svg"
                alt="switch"
                width={13}
                height={13}
                className="my-auto pt-[1px]"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <p className="text-xs font-sans">Ask Followup</p>
              <Image
                src="/tasks.svg"
                alt="task"
                width={13}
                height={13}
                className="my-auto pt-[1px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
