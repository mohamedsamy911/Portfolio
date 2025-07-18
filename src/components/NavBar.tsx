import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

export const Navbar = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-gray-900/90 backdrop-blur-md py-2 shadow-lg"
            : "bg-white/90 backdrop-blur-md py-2 shadow-lg"
          : "bg-transparent py-1"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              className="cursor-pointer"
            >
              <img src={"/logo.png"} alt="Mohamed Samy" className="w-15 h-15" />
            </ScrollLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                smooth={true}
                duration={500}
                offset={-80}
                className={`relative px-3 py-2 text-sm font-medium cursor-pointer transition-colors ${
                  activeSection === item.id
                    ? "text-indigo-500 dark:text-indigo-400"
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onSetActive={() => setActiveSection(item.id)}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 top-full block h-0.5 w-full bg-indigo-500 dark:bg-indigo-400"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </ScrollLink>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <ThemeToggle className="md:hidden focus:outline-none" />
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className={`w-6 h-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className={`w-6 h-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              }`}
            >
              <div className="pt-4 pb-8 space-y-4">
                {navItems.map((item) => (
                  <ScrollLink
                    key={item.id}
                    to={item.id}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-indigo-600 text-white"
                        : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </ScrollLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
