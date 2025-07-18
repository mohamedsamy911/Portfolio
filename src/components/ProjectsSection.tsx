import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern 3D portfolio built with React and Three.js",
    tags: ["React", "Three.js", "Tailwind CSS"],
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    tags: ["Node.js", "Next.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "Mobile App",
    description: "Cross-platform mobile application for task management",
    tags: ["React Native", "Firebase"],
  },
];

export default function ProjectsSection() {
  const { theme } = useTheme();

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
          className="max-w-4xl mx-auto"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl overflow-hidden hover:shadow-lg transition-all ${
                  theme === "dark"
                    ? "bg-gray-800 hover:shadow-indigo-500/10"
                    : "bg-white hover:shadow-indigo-400/10 border border-gray-200"
                }`}
              >
                <div
                  className={`h-48 ${
                    theme === "dark" ? "bg-indigo-500/10" : "bg-indigo-100/50"
                  }`}
                ></div>
                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-4 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-3 py-1 rounded-full ${
                          theme === "dark"
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
