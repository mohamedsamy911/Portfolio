import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useTheme } from "../context/ThemeContext";

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const subtitles = useRef([
    "JavaScript Developer",
    "Full Stack Engineer",
    "React Specialist",
    "Tech Enthusiast",
  ]);
  const currentSubtitle = useRef(0);
  const currentChar = useRef(0);
  const isDeleting = useRef(false);
  const displayText = useRef("");
  const animationFrameId = useRef<number>(0);
  const lastUpdateTime = useRef(0);
  const controls = useAnimation();

  const animateText = (timestamp: number) => {
    if (!lastUpdateTime.current) lastUpdateTime.current = timestamp;
    const delta = timestamp - lastUpdateTime.current;

    if (delta > (isDeleting.current ? 30 : 100)) {
      const currentText = subtitles.current[currentSubtitle.current];

      if (isDeleting.current) {
        displayText.current = currentText.substring(0, currentChar.current - 1);
        currentChar.current--;

        if (currentChar.current === 0) {
          isDeleting.current = false;
          currentSubtitle.current =
            (currentSubtitle.current + 1) % subtitles.current.length;
        }
      } else {
        displayText.current = currentText.substring(0, currentChar.current + 1);
        currentChar.current++;

        if (currentChar.current === currentText.length) {
          isDeleting.current = true;
          // Update the display first, then set the pause
          controls
            .start({
              opacity: 1,
              transition: { duration: 0 },
            })
            .then(() => {
              const el = document.getElementById("typing-text");
              if (el) el.textContent = displayText.current;
            });
          lastUpdateTime.current = timestamp + 2000; // Pause before deleting
          animationFrameId.current = requestAnimationFrame(animateText);
          return;
        }
      }

      controls
        .start({
          opacity: 1,
          transition: { duration: 0 },
        })
        .then(() => {
          const el = document.getElementById("typing-text");
          if (el) el.textContent = displayText.current;
        });

      lastUpdateTime.current = timestamp;
    }

    animationFrameId.current = requestAnimationFrame(animateText);
  };

  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(animateText);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className={`relative h-screen w-full overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              theme === "dark" ? "bg-indigo-500/10" : "bg-indigo-400/20"
            }`}
            initial={{
              x: Math.random() * window.innerWidth - window.innerWidth / 3,
              y: Math.random() * window.innerHeight - window.innerHeight / 3,
            }}
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
            animate={{
              x: [null, Math.random() * 100 - 50 + "vw"],
              y: [null, Math.random() * 100 - 50 + "vh"],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.h1
            className={`mb-6 text-5xl font-bold md:text-7xl ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              className="block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Hello, I'm{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Mohamed Samy
              </span>
            </motion.span>
          </motion.h1>

          {/* Typing subtitle */}
          <motion.div
            className={`mb-8 text-xl md:text-2xl min-h-[2.5rem] flex justify-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.6 }}
          >
            <motion.span
              id="typing-text"
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Text will be inserted by JS */}
            </motion.span>
            <span className="animate-pulse">|</span>
          </motion.div>

          {/* Animated CTA button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <ScrollLink
              to="projects"
              smooth={true}
              duration={500}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`relative inline-flex items-center overflow-hidden rounded-full px-8 py-4 text-lg font-medium transition-all ${
                theme === "dark"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-indigo-400/30"
              } hover:shadow-lg`}
            >
              <motion.span
                animate={{
                  x: hovered ? 5 : 0,
                  transition: { type: "spring", stiffness: 500 },
                }}
              >
                View My Work
              </motion.span>
              <motion.svg
                animate={{
                  x: hovered ? 10 : 5,
                  opacity: hovered ? 1 : 0.7,
                }}
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>

              {/* Button hover effect */}
              <motion.span
                className={`absolute inset-0 rounded-full ${
                  theme === "dark" ? "bg-white/10" : "bg-white/20"
                }`}
                initial={{ scale: 0 }}
                animate={{
                  scale: hovered ? 1.2 : 0,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </ScrollLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ScrollLink to="about" smooth={true} duration={500}>
          <div
            className={`flex h-10 w-6 items-start justify-center rounded-full border-2 p-1 ${
              theme === "dark" ? "border-white/50" : "border-gray-700/50"
            }`}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className={`h-2 w-2 rounded-full ${
                theme === "dark" ? "bg-white" : "bg-gray-800"
              }`}
            />
          </div>
        </ScrollLink>
      </motion.div>
    </section>
  );
}