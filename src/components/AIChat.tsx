import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown for rendering Markdown

// Define the type for a chat message
interface Message {
  text: string;
  sender: "user" | "gemini";
}

// Mock resume data - REPLACE THIS WITH YOUR ACTUAL RESUME CONTENT
export const RESUME_CONTENT = `
  Name: Mohamed Adel Samy
  Title: SOFTWARE ENGINEER
  Contact: mohamedadel74@gmail.com | (+20)1101021996

  PROFESSIONAL SUMMARY:
  Results-driven Software Engineer with over 5 years of experience building scalable, secure web applications using React.js, Node.js, Java, NestJS, and JavaScript. Expertise in developing RESTful APIs, implementing microservices architecture, and managing DevOps pipelines using Docker, NGINX, and Linux. Proven success in automating business processes, enhancing performance, and delivering reliable solutions in agile environments.

  TECHNICAL SKILLS:
  Languages: JavaScript, TypeScript, Java, SQL, HTML, CSS
  Frontend: React.js, Next.js, JavaScript ES6+, Redux, HTML5, CSS3
  Backend: Node.js, NestJS, Express.js, Java (Spring Boot), REST APIs, Microservices
  DevOps & Tools: Docker, Docker Swarm, NGINX, Linux, Git, GitHub, CI/CD, Agile
  Databases: PostgreSQL, MySQL, SQL Server, Database Design, Query Optimization
  Workflow Automation: Camunda BPM, BPMN, DMN, CMMN
  GIS Tools: PostGIS, Apache Superset, ERDAS IMAGINE
  Soft Skills: Problem Solving, Communication, Collaboration, Agile Methodologies

  PROFESSIONAL EXPERIENCE:
  January 2022 - Current: Senior Software Engineer, Penta-b
    - Built and maintained scalable full-stack applications using React.js (frontend) and NestJS/Java (backend).
    - Designed and implemented RESTful APIs and microservices architecture, improving response times by 40%.
    - Deployed and managed services using Docker and Docker Swarm, reducing system downtime by 30%.
    - Configured NGINX as a reverse proxy and load balancer to enhance performance and request routing.
    - Automated workflows using Camunda BPM, reducing manual processing by 50%.
    - Led backend integration of smart asset tracking systems using GIS and IoT platforms.
    - Performed routine database maintenance, backups, and tuning for PostgreSQL, ensuring high availability.

  July 2020 - January 2022: GIS Developer, Edge-Pro for Information Systems
    - Customized web-based GIS dashboards using JavaScript, HTML, and CSS, improving visual reporting.
    - Developed form-based workflows and notification systems, enhancing communication efficiency.
    - Conducted satellite image analysis and remote sensing for environmental research projects.
    - Delivered product training and demos for clients using Skyline and ERDAS IMAGINE.
    - Created technical documentation and user guides to streamline onboarding and support.

  Freelancing Projects (Full-Stack Developer):
    - Developed NextJS, PostgreSQL full stack E-commerce Application with Role Based Authentication.
    - Designed and developed a complete Hospital Management System using ReactJS, NestJS, PostgreSQL and Redis.
    - Designed and developed a POS system using React Electron, NestJs and PostgreSQL.

  PROJECTS:
  - Internal Process Automation Tools: Developed full-stack tools to automate repetitive tasks and optimize work process for over 30%. (Tech: ReactJS, NestJS, Docker)
  - Full-stack Development for Water & Wastewater Management (Egypt): Led design and deployment of resource management application across Cairo, Giza, and Alexandria Governorates. (Tech: ReactJS, Java, Docker, Camunda BPM)
  - Geo-Enabled E-Services for Oman's Ministry of Tourism (MOT): Developed geo-aware features for MOT's tourism portal. (Tech: ReactJS, PostGIS, Docker Swarm)
  - GIS Dashboards for Egypt's Ministry of Interior: Built interactive dashboards with geo-analytics for crime pattern visualization. (Tech: ReactJS, Apache Superset, NGINX)
  - BPM Workflow Automation for Alexandria Governorate: Designed Camunda-based workflows for licensing and public complaint systems. (Tech: Camunda BPM, Java, Docker, PostgreSQL)
  - Emaar Egypt City Smart System: Built an asset management system integrated with GIS and IoT platforms. (Tech: ReactJS, Java, Docker, NGINX, NestJS RESTful APIs, n8n)
  - Olympic City Smart System: Built an asset management system integrated with GIS and IoT platforms. (Tech: ReactJS, Java, Docker Swarm, NGINX, RESTful APIs)
  - Mapp Enterprise Dashboard Customization: Customized dashboards using JavaScript API and CSS. (Tech: JavaScript, CSS, Mapp Enterprise)
  - Full-Stack E-Commerce Application: Created a fully customizable E-Commerce Application with Role based Authentication. (Tech: NextJs, PostgreSQL)
  - Backend for POS System: Designed and Developed the backend for a Point of Sale (POS) for a cafeteria. (Tech: NestJS, PostgreSQL)
  - Backend for a Hospital Management System: Designed and developed the backend for a Hospital Management System. (Tech: NextJs, PostgreSQL, Redis)

  EDUCATION:
  2024-Current: Master of Business Administration, Brooklen Business School
  2021-2022: Full Stack Web Development Diploma, Route Academy
  2013-2018: Bachelor's degree in civil engineering, German University in Cairo (GUC)

  LANGUAGES:
  Arabic, English, German
`;

interface AIChatProps {
  theme: string;
}

const AIChat: React.FC<AIChatProps> = ({ theme }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false); // State to control chat visibility
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false); // Loading state for summary
  const [isGeneratingQuestions, setIsGeneratingQuestions] =
    useState<boolean>(false); // Loading state for questions
  const [isFeaturesCollapsed, setIsFeaturesCollapsed] =
    useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll whenever messages change

  const callGeminiAPI = async (prompt: string): Promise<string> => {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini API response structure unexpected:", result);
      throw new Error("Unexpected API response structure.");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const prompt = `Based on the following resume information, answer the user's question. If the information is not explicitly in the resume, state that you cannot find it.

      Resume:
      ${RESUME_CONTENT}

      User's question: ${input}`;

      const geminiResponseText = await callGeminiAPI(prompt);
      const geminiMessage: Message = {
        text: geminiResponseText,
        sender: "gemini",
      };
      setMessages((prevMessages) => [...prevMessages, geminiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: Message = {
        text: "There was an error connecting to Gemini. Please try again later.",
        sender: "gemini",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarizeResume = async () => {
    setIsSummarizing(true);
    const userMessage: Message = {
      text: "Summarize my resume.",
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const prompt = `Provide a concise summary of the following resume, highlighting key skills, experience, and achievements. Format the summary using Markdown.

      Resume:
      ${RESUME_CONTENT}`;

      const geminiResponseText = await callGeminiAPI(prompt);
      const geminiMessage: Message = {
        text: geminiResponseText,
        sender: "gemini",
      };
      setMessages((prevMessages) => [...prevMessages, geminiMessage]);
    } catch (error) {
      console.error("Error summarizing resume:", error);
      const errorMessage: Message = {
        text: "Sorry, I couldn't summarize the resume. Please try again.",
        sender: "gemini",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleGenerateInterviewQuestions = async () => {
    setIsGeneratingQuestions(true);
    const userMessage: Message = {
      text: "Generate interview questions based on my resume.",
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const prompt = `Generate 3-5 common interview questions based on the content of the following resume. Focus on areas like experience, projects, and skills. Format the questions as a numbered list using Markdown.

      Resume:
      ${RESUME_CONTENT}`;

      const geminiResponseText = await callGeminiAPI(prompt);
      const geminiMessage: Message = {
        text: geminiResponseText,
        sender: "gemini",
      };
      setMessages((prevMessages) => [...prevMessages, geminiMessage]);
    } catch (error) {
      console.error("Error generating interview questions:", error);
      const errorMessage: Message = {
        text: "Sorry, I couldn't generate interview questions. Please try again.",
        sender: "gemini",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-4 right-4 text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 z-50 transform hover:scale-105 cursor-pointer
            ${
              theme === "dark"
                ? "bg-indigo-800 hover:bg-indigo-700"
                : "bg-indigo-600 hover:bg-indigo-500"
            }
            `}
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {/* Chat Component */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 600, x: 0 }} // Initial position slightly off-screen
            animate={{ opacity: 1, y: 0, x: 0 }} // Animate to desired position
            exit={{y: 600, x: 0 }} // Animate out to slightly off-screen
            transition={{ duration: 0.3, ease: "easeOut" }} // Smoother transition
            className={`fixed bottom-0 left-0 w-full h-[75vh] sm:bottom-4 sm:right-4 sm:w-96 sm:h-[70vh] rounded-lg shadow-xl flex flex-col overflow-hidden z-51 transition-all duration-300 ease-in-out
        ${theme === "dark" ? "bg-gray-900" : "bg-white"}
        `}
          >
            {/* Header */}
            <div
              className={`bg-gradient-to-r  p-4 rounded-t-lg shadow-md flex justify-between items-center
            ${
              theme === "dark"
                ? "from-indigo-800 to-indigo-700 text-amber-50"
                : "from-indigo-600 to-indigo-500"
            }
            `}
            >
              <h1 className="text-xl font-bold">Chat with Samys' Resume</h1>
              <div className="flex items-center space-x-2">
                {/* Collapse/Expand Features Button */}
                <button
                  onClick={() => setIsFeaturesCollapsed(!isFeaturesCollapsed)}
                  className="text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
                  aria-label={
                    isFeaturesCollapsed
                      ? "Expand features"
                      : "Collapse features"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform duration-300 cursor-pointer ${
                      isFeaturesCollapsed ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Close Chat Button */}
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:text-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
                  aria-label="Close chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* New Feature Buttons */}
            <div
              className={` border-b flex flex-wrap gap-2 justify-center
                ${
                  isFeaturesCollapsed
                    ? "max-h-0 overflow-hidden p-0 border-b-0"
                    : "max-h-48 p-3"
                }
            ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300 border-gray-700"
                : "bg-white text-gray-800 border-gray-200"
            }
            `}
            >
              <button
                onClick={handleSummarizeResume}
                className={`text-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  theme === "dark"
                    ? "bg-green-600 hover:bg-green-500 focus:ring-green-500"
                    : "bg-green-500 hover:bg-green-400 focus:ring-green-300"
                }
                `}
                disabled={isSummarizing || isLoading || isGeneratingQuestions}
              >
                ✨ Summarize Resume
              </button>
              <button
                onClick={handleGenerateInterviewQuestions}
                className={`text-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  theme === "dark"
                    ? "bg-purple-600 hover:bg-purple-500 focus:ring-purple-500"
                    : "bg-purple-500 hover:bg-purple-400 focus:ring-purple-300"
                }
                `}
                disabled={isGeneratingQuestions || isLoading || isSummarizing}
              >
                ✨ Generate Interview Questions
              </button>
            </div>

            {/* Chat Messages Area */}
            <div
              className={`flex-1 p-4 overflow-y-auto space-y-4
            ${theme === "dark" ? "text-gray-300" : "text-gray-800"}
            `}
            >
              {messages.length === 0 && (
                <div className="text-center mt-10">
                  <p>Ask me anything about my resume!</p>
                  <p className="text-sm">
                    e.g., "How many years of experience do you have?" or "Tell
                    me about your e-commerce project."
                  </p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                      msg.sender === "user"
                        ? `${
                            theme === "dark"
                              ? "bg-indigo-600 text-white rounded-br-none"
                              : "bg-indigo-200 text-gray-800 rounded-bl-none"
                          }`
                        : `${
                            theme === "dark"
                              ? "bg-gray-800 text-gray-300 rounded-bl-none"
                              : "bg-gray-200 text-gray-800 rounded-bl-none"
                          }`
                    }`}
                  >
                    {/* Render Gemini responses as Markdown */}
                    {msg.sender === "gemini" ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {(isLoading || isSummarizing || isGeneratingQuestions) && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] p-3 rounded-lg shadow-md bg-gray-200 text-gray-800 rounded-bl-none">
                    <div className="flex items-center">
                      <span className="animate-bounce text-xl mr-1">.</span>
                      <span className="animate-bounce text-xl mr-1 delay-75">
                        .
                      </span>
                      <span className="animate-bounce text-xl delay-150">
                        .
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className={`p-4 border-t rounded-b-lg
                ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-900"
                    : "border-gray-200 bg-gray-50"
                }
                `}
            >
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about my resume..."
                  className={`flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200
                    ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-300"
                        : "bg-white text-gray-800"
                    }
                    `}
                  disabled={isLoading || isSummarizing || isGeneratingQuestions}
                />
                <button
                  type="submit"
                  className={` text-white px-6 cursor-pointer py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${
                      theme === "dark"
                        ? "bg-indigo-800 hover:bg-indigo-700 focus:ring-indigo-500"
                        : "bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-400"
                    }
                    `}
                  disabled={isLoading || isSummarizing || isGeneratingQuestions}
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
