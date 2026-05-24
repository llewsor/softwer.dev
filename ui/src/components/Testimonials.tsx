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

const caseStudies = [
  {
    title: "POS + E-commerce Platform",
    outcome: "Unified stock, checkout, and online ordering for a retail business.",
    metrics: ["Real-time inventory sync", "Faster checkout flow", "Mobile-friendly catalogue"],
  },
  {
    title: "Custom Online Store",
    outcome: "A lightweight commerce experience for a local market expanding beyond walk-in trade.",
    metrics: ["Simple catalogue management", "Secure payment flow", "Improved mobile buying experience"],
  },
  {
    title: "Operations Dashboard",
    outcome: "A practical internal tool concept for tracking jobs, client notes, statuses, and reporting.",
    metrics: ["Cleaner daily visibility", "Reduced spreadsheet dependency", "Better handover between staff"],
  },
];

const Testimonials = () => {
  return (
    <motion.section
      id="testimonials"
      className="bg-stone-50 px-4 py-20 dark:bg-zinc-950 lg:px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Proof</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">Real software for real business workflows.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Buyers trust specifics. These examples show the kind of operational value softwer.dev is built to deliver.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.title} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{study.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{study.outcome}</p>
              <div className="mt-5 space-y-2">
                {study.metrics.map((metric) => (
                  <p key={metric} className="rounded-md bg-stone-100 px-3 py-2 text-sm font-medium text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                    {metric}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <p className="mb-5 text-base leading-7 text-zinc-700 dark:text-zinc-300">"{testimonial.message}"</p>
              <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                {testimonial.name}
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">{testimonial.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
