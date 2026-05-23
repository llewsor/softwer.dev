import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Mario H.",
    title: "Owner, Malta Hardware",
    message:
      "Softwer.dev built a unified POS + e-commerce platform for our hardware store; real-time inventory sync and streamlined checkout boosted both in-store and online sales.",
  },
  {
    name: "Kylie S.",
    title: "Owner, Market",
    message:
      "The custom e-commerce site Softwer.dev delivered let our mini shop reach customers across Malta—fast mobile experience, easy catalog management, and secure payments.",
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

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
