import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "../assets/icon.png";
import { Link } from "react-scroll";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const navLinks = ["About", "Services", "Why Us", "Testimonials", "Contact"];

  return (
    // <header className="w-full z-50 bg-bgLight text-textLight dark:bg-bgDark dark:text-textDark shadow-md">
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-200 dark:bg-gray-800 text-text-light dark:text-text-dark shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Link
            to={"hero"}
            smooth={true}
            duration={500}
            className="cursor-pointer flex items-center gap-2  hover:text-brandLight dark:hover:text-brandDark transition"
          >
            <img src={logo} alt="Softwer.dev logo" className="h-10 w-10" />
            <span className="text-xl font-semibold">softwer.dev</span>
          </Link>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed bottom-4 right-4 bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark border border-gray-300 dark:border-gray-600 p-2 rounded-lg hover:shadow-md transition"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase().replace(/\s+/g, "")}
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-brandLight dark:hover:text-brandDark transition"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-bgLight dark:bg-bgDark px-4 pb-4 space-y-2 text-textLight dark:text-textDark">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase().replace(/\s+/g, "")}
              smooth={true}
              duration={500}
              className="block cursor-pointer hover:text-brandLight dark:hover:text-brandDark transition"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
