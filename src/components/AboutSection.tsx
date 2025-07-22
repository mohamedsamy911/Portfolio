import { motion } from "framer-motion";
import React from "react"; // Explicitly import React for FC type
import { RESUME_CONTENT } from "./AIChat";
import resumePdfPath from "../assets/Resume 22025.pdf";
interface AboutSectionProps {
  readonly theme: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  // Extracting relevant data from RESUME_CONTENT
  const professionalSummary = /PROFESSIONAL SUMMARY:([\s\S]*?)TECHNICAL SKILLS:/
    .exec(RESUME_CONTENT)?.[1]
    .trim();
  // const resumePdfPath = "../assets/Resume 22025.pdf";
  const keySkills = [
    "React.js",
    "NestJS",
    "TypeScript",
    "Docker",
    "NGINX",
    "Linux",
    "PostgreSQL",
    "RESTful APIs",
    "Microservices",
    "CI/CD",
    "Agile Methodologies",
    "Problem Solving",
    "Communication",
  ];

  // For the "My Skills" section, using a selection of key technical skills with arbitrary levels
  const mySkills = [
    { name: "React.js", level: 90 },
    { name: "Java (Spring Boot)", level: 60 },
    { name: "NestJS", level: 85 },
    { name: "TypeScript", level: 88 },
    { name: "Docker", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "REST APIs", level: 90 },
  ];

  return (
    <section
      id="about"
      className={`min-h-screen w-full py-20 px-4 ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-8 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            About{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p
                className={`text-lg mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {professionalSummary ||
                  "Results-driven Software Engineer with extensive experience in building scalable, secure web applications."}
              </p>
              <div className="space-y-4">
                {keySkills.slice(0, 4).map(
                  (
                    skill // Displaying a subset of key skills with checkmarks
                  ) => (
                    <div key={skill} className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                          theme === "dark"
                            ? "bg-indigo-500/10"
                            : "bg-indigo-100"
                        }`}
                      >
                        <span
                          className={`text-xl ${
                            theme === "dark"
                              ? "text-indigo-400"
                              : "text-indigo-600"
                          }`}
                        >
                          ✓
                        </span>
                      </div>
                      <span
                        className={
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }
                      >
                        {skill}
                      </span>
                    </div>
                  )
                )}
              </div>
              {/* Download Resume Button */}
              <motion.a
                href={resumePdfPath}
                download="Mohamed_Samy_Resume.pdf" // Suggested filename for download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-colors duration-200
                  ${
                    theme === "dark"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                  }
                `}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Download Resume
              </motion.a>
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div
                className={`rounded-2xl p-8 backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-indigo-500/10 border-indigo-500/20"
                    : "bg-indigo-100/50 border-indigo-200"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  My Skills
                </h3>
                <div className="space-y-4">
                  {mySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`text-sm font-medium ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {skill.name}
                        </span>
                        <span
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-indigo-400"
                              : "text-indigo-600"
                          }`}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className={`w-full rounded-full h-2 ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ease-out ${
                            theme === "dark" ? "bg-indigo-500" : "bg-indigo-600"
                          }`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default AboutSection;
