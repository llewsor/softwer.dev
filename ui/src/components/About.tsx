import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          At <span className="font-semibold text-brandLight dark:text-brandDark">softwer.dev</span>, we're passionate about building modern digital solutions
          that empower businesses. Whether you're a startup or an enterprise, we deliver scalable, maintainable, and secure software built with cutting-edge
          technologies.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          With deep expertise in web development, API architecture, and user experience design, our team is committed to shipping products that not only work —
          but work beautifully. We collaborate closely with our clients to transform complex problems into elegant digital products.
        </p>
      </div>
    </motion.section>
  );
};

export default About;
