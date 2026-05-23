import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import { useEffect } from "react";
import About from "./components/About";
import Testimonials from "./components/Testimonials";

function App() {
  // Read theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="font-sans bg-bg-light text-text-light dark:bg-bg-dark dark:text-text-dark">
      <Header />
      <main className="px-4">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}

export default App;
