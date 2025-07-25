import { motion } from "framer-motion";
import hms from "../assets/hms.webp";
import ras from "../assets/ras.webp";
import ecommerce from "../assets/e-commerce.webp";
import GlareHover from "./GlareHover";
import {
  Code,
  Database,
  Layers,
  Zap,
  Container,
  Code2,
  Cable,
} from "lucide-react";

const projects = [
  {
    title: "Allocation Management App",
    description:
      "A full-stack allocation system with a sleek dashboard to manage resources and projects efficiently.",
    tags: [
      { label: "React", icon: <Code className="w-3.5 h-3.5" /> },
      { label: "TypeScript", icon: <Code2 className="w-3.5 h-3.5" /> },
      { label: "Tailwind CSS", icon: <Layers className="w-3.5 h-3.5" /> },
      { label: "PostgreSQL", icon: <Database className="w-3.5 h-3.5" /> },
      { label: "Docker", icon: <Container className="w-3.5 h-3.5" /> },
      { label: "NestJS", icon: <Cable className="w-3.5 h-3.5" /> },
    ],
    pic: ras,
  },
  {
    title: "E-commerce Platform",
    description:
      "Full-stack e-commerce platform with secure payment integration and admin dashboard.",
    tags: [
      { label: "Node.js", icon: <Code className="w-3.5 h-3.5" /> },
      { label: "Next.js", icon: <Code2 className="w-3.5 h-3.5" /> },
      { label: "Express.js", icon: <Cable className="w-3.5 h-3.5" /> },
      { label: "PostgreSQL", icon: <Database className="w-3.5 h-3.5" /> },
      { label: "Tailwind CSS", icon: <Layers className="w-3.5 h-3.5" /> },
      { label: "Docker", icon: <Container className="w-3.5 h-3.5" /> },
    ],
    pic: ecommerce,
  },
  {
    title: "Hospital Management System Backend",
    description:
      "Backend system for hospital management with real-time support.",
    tags: [
      { label: "Node.js", icon: <Code className="w-3.5 h-3.5" /> },
      { label: "NestJS", icon: <Cable className="w-3.5 h-3.5" /> },
      { label: "PostgreSQL", icon: <Database className="w-3.5 h-3.5" /> },
      { label: "Docker", icon: <Container className="w-3.5 h-3.5" /> },
      { label: "WebSockets", icon: <Zap className="w-3.5 h-3.5" /> },
    ],
    pic: hms,
  },
];

interface ProjectsSectionProps {
  readonly theme: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  return (
    <section
      id="projects"
      className={`min-h-screen w-full py-20 px-4 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            My{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Projects
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group ${
                  theme === "dark"
                    ? "bg-gray-800 hover:shadow-indigo-600/20"
                    : "bg-white hover:shadow-indigo-400/20 border border-gray-200"
                }`}
              >
                <GlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  className="h-full"
                >
                  <div
                    className={`h-48 w-full overflow-hidden ${
                      theme === "dark" ? "bg-indigo-500/10" : "bg-indigo-100/40"
                    }`}
                  >
                    <img
                      src={project.pic}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                    />
                  </div>
                  <div className="p-6">
                    <h3
                      className={`text-xl font-bold mb-2 transition-colors ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mb-4 text-sm leading-relaxed ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map(({ label, icon }) => (
                        <span
                          key={label}
                          className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-full font-medium transition-all duration-200
                          ${
                            theme === "dark"
                              ? "bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20"
                              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                          }`}
                        >
                          {icon}
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlareHover>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
