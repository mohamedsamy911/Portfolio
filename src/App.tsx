import "./App.css";
import HeroSection from "./components/HeroSection";
import { Navbar } from "./components/NavBar";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ProjectsSection from "./components/ProjectsSection";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}

function PortfolioContent() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className={`min-h-screen`}>
        <div className="dark:bg-gray-900 dark:text-white">
          <Navbar />
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
          {/* Optional footer */}
          <footer
            className={`py-8 text-center ${
              theme === "dark"
                ? "bg-gray-800 text-gray-400"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <p>
              © {new Date().getFullYear()} Mohamed Samy. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
