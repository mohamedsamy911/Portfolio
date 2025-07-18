import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function AboutSection() {
  const { theme } = useTheme();

  return (
    <section 
      id="about" 
      className={`min-h-screen w-full py-20 px-4 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
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
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            About <span className="text-indigo-600 dark:text-indigo-400">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className={`text-lg mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I'm a passionate developer with expertise in modern web
                technologies.
              </p>
              <p className={`text-lg mb-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                With over 5 years of experience, I specialize in creating
                beautiful, functional, and user-centered digital experiences.
              </p>
              <div className="space-y-4">
                {['Frontend Development', 'Backend Development', 'Microservices'].map((skill) => (
                  <div key={skill} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-100'
                    }`}>
                      <span className={`text-xl ${
                        theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                      }`}>✓</span>
                    </div>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className={`rounded-2xl p-8 backdrop-blur-sm border ${
                theme === 'dark' 
                  ? 'bg-indigo-500/10 border-indigo-500/20' 
                  : 'bg-indigo-100/50 border-indigo-200'
              }`}>
                <h3 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  My Skills
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "React", level: 85 },
                    { name: "TypeScript", level: 80 },
                    { name: "Tailwind CSS", level: 90 },
                    { name: "Node.js", level: 75 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {skill.name}
                        </span>
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`w-full rounded-full h-2 ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                      }`}>
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ease-out ${
                            theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-600'
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
}