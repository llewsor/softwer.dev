import { CodeBracketIcon, DevicePhoneMobileIcon, ServerStackIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const services = [
  {
    icon: <CodeBracketIcon className="h-10 w-10 text-brand-light dark:text-brand-dark" />,
    title: "Custom Web Apps",
    description: "We build fast, scalable, and maintainable React-based web applications tailored to your business needs.",
  },
  {
    icon: <ServerStackIcon className="h-10 w-10 text-brand-light dark:text-brand-dark" />,
    title: "API Development",
    description: "Robust REST APIs and microservices built with .NET Core, optimized for performance and security.",
  },
  {
    icon: <DevicePhoneMobileIcon className="h-10 w-10 text-brand-light dark:text-brand-dark" />,
    title: "Responsive Design",
    description: "Mobile-first design that ensures seamless user experience across all devices and screen sizes.",
  },
];

const Services = () => {
  return (
    // <section className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20 px-6 text-center">
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      // className="min-h-screen text-center p-4 py-30"
      className="min-h-screen flex items-center justify-center py-20"
      id="services"
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
        <p className="max-w-xl mx-auto mb-12 text-gray-600 dark:text-gray-300">
          Softwer.dev delivers end-to-end development services that combine reliability with modern design and performance.
        </p>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition text-left">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
