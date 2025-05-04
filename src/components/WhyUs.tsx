import { ShieldCheckIcon, ClockIcon, BoltIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheckIcon className="h-8 w-8 text-brand-light dark:text-brand-dark" />,
    title: "Reliable & Secure",
    description: "We follow best practices to ensure your applications are stable, secure, and production-ready.",
  },
  {
    icon: <ClockIcon className="h-8 w-8 text-brand-light dark:text-brand-dark" />,
    title: "Timely Delivery",
    description: "Projects are delivered on time, with clear communication and milestone tracking throughout.",
  },
  {
    icon: <BoltIcon className="h-8 w-8 text-brand-light dark:text-brand-dark" />,
    title: "Performance Driven",
    description: "Fast-loading apps and APIs optimized for performance, using scalable architecture patterns.",
  },
  {
    icon: <LightBulbIcon className="h-8 w-8 text-brand-light dark:text-brand-dark" />,
    title: "Creative Problem Solving",
    description: "We apply critical thinking and innovation to build smart, custom solutions that solve real problems.",
  },
];

const WhyUs = () => {
  return (
    // <section className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20 px-6 text-center">
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      // className="min-h-screen text-center p-4 py-30"
      className="min-h-screen flex items-center justify-center py-20 "
      id="whyus"
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us?</h2>
        <p className="max-w-xl mx-auto mb-12 text-gray-600 dark:text-gray-300">
          We don’t just build software — we build reliable, efficient, and scalable systems designed for real-world results.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
              {item.icon}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyUs;
