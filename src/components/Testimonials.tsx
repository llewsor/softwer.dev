import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Maria A.",
    title: "Product Manager",
    message: "Softwer.dev exceeded our expectations. They delivered a clean, scalable web app with outstanding communication throughout.",
  },
  {
    name: "David K.",
    title: "Founder, Fintech Startup",
    message: "Their attention to detail and dedication to performance really helped our MVP succeed. Highly recommended.",
  },
  {
    name: "Sara M.",
    title: "CTO, HealthTech Co.",
    message: "Fast, reliable, and skilled — Softwer.dev helped us launch a modern API suite in record time.",
  },
];

const Testimonials = () => {
  return (
    <motion.section
      id="testimonials"
      className="min-h-screen flex items-center justify-center py-20 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Clients Say</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-12">
          Real words from real people we’ve helped with design, development, and digital solutions.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.message}"</p>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {testimonial.name}
                <span className="block text-xs text-gray-500 dark:text-gray-400">{testimonial.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
