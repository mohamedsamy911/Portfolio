import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ContactSection() {
  const { theme } = useTheme();

  return (
    <section
      id="contact"
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
            className={`text-4xl md:text-5xl font-bold mb-8 text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Get In{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      theme === "dark" ? "bg-indigo-500/10" : "bg-indigo-100"
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Email
                    </h4>
                    <a
                      href="mailto:mohamedadel74@gmail.com"
                      className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      mohamedadel74@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      theme === "dark" ? "bg-indigo-500/10" : "bg-indigo-100"
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className={`font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Phone
                    </h4>
                    <a
                      href="tel:+201101021996"
                      className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      +20 110 102 1996
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Follow Me
                </h3>
                <div className="flex space-x-4">
                  {[
                    {
                      name: "github",
                      link: "https://github.com/mohamedsamy911",
                    },
                    {
                      name: "linkedin",
                      link: "https://www.linkedin.com/in/mohamed-samy-ba0107141/",
                    },
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      whileHover={{ y: -3 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        theme === "dark"
                          ? "bg-indigo-500/10 text-white hover:text-indigo-400"
                          : "bg-indigo-100 text-gray-900 hover:text-indigo-600"
                      }`}
                    >
                      <span className="capitalize">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-white border border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-white border border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      theme === "dark"
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-white border border-gray-300 text-gray-900"
                    }`}
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    theme === "dark"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
