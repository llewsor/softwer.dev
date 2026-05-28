import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import logo from "../assets/icon.png";
import { Link } from "react-scroll";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const navLinks = [
    { label: "Problems", target: "about" },
    { label: "Services", target: "services" },
    { label: "Plans", target: "engagements" },
    { label: "Proof", target: "testimonials" },
    { label: "FAQ", target: "faq" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-200/80 bg-stone-50/90 text-zinc-950 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-2 cursor-pointer">
          <Link
            to={"hero"}
            smooth={true}
            duration={500}
            offset={-72}
            className="flex cursor-pointer items-center gap-2 transition hover:text-teal-700 dark:hover:text-teal-300"
          >
            <img src={logo} alt="Softwer.dev logo" className="h-10 w-10" />
            <span className="text-lg font-semibold tracking-normal">softwer.dev</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.target}
              to={link.target}
              smooth={true}
              duration={500}
              offset={-72}
              className="cursor-pointer text-sm font-medium text-zinc-700 transition hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={-72}
            className="cursor-pointer rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-200"
          >
            Book a Call
          </Link>
          <button
            onClick={toggleTheme}
            className="rounded-md border border-zinc-300 bg-white p-2 text-zinc-900 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-md border border-zinc-300 bg-white p-2 text-zinc-900 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="space-y-2 border-t border-zinc-200 bg-stone-50 px-4 pb-4 pt-3 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.target}
              to={link.target}
              smooth={true}
              duration={500}
              offset={-72}
              className="block cursor-pointer rounded-md px-2 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
