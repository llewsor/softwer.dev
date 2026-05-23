import icon from "../assets/icon.png";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    // <section className="flex flex-col justify-center items-center text-center p-4 py-20">
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      className="min-h-screen flex flex-col justify-center items-center text-center py-20"
      id="hero"
    >
      <img src={icon} alt="Softwer.dev" className="w-32 h-32 p-4" />

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Modern Software Solutions, Delivered.</h1>

      <p className="text-lg md:text-xl max-w-2xl mb-6  text-gray-600 dark:text-gray-300">
        Softwer.dev offers custom web applications, APIs, and full-stack systems tailored to your business needs.
      </p>

      <Link
        to="contact"
        smooth={true}
        duration={500}
        className="bg-brand-light hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-200 text-white dark:text-gray-900 py-3 px-6 rounded-full cursor-pointer transition"
      >
        Get a Quote
      </Link>
    </motion.section>
  );
};

export default Hero;
