import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import { useEffect } from "react";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Engagements from "./components/Engagements";
import Process from "./components/Process";
import Footer from "./components/Footer";
import SeoContent from "./components/SeoContent";

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
    <div className="font-sans bg-stone-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Engagements />
        <WhyUs />
        <Process />
        <Testimonials />
        <SeoContent />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
