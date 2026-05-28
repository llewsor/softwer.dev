import { motion } from "framer-motion";
import { ChartNoAxesCombined, Clock3, ShieldCheck, Wrench } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: "Built for production",
    description: "Authentication, validation, error handling, logging, deployment, backups, and maintainable code are part of the work.",
  },
  {
    icon: <Clock3 className="h-7 w-7" />,
    title: "Clear delivery rhythm",
    description: "You get visible milestones, plain-English updates, and decisions surfaced early enough to keep momentum.",
  },
  {
    icon: <ChartNoAxesCombined className="h-7 w-7" />,
    title: "Business-first thinking",
    description: "We care about fewer manual hours, better reporting, cleaner customer experiences, and software that pays its way.",
  },
  {
    icon: <Wrench className="h-7 w-7" />,
    title: "Support after launch",
    description: "A useful product needs care after release, so we plan for monitoring, improvements, fixes, and future versions.",
  },
];

const WhyUs = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="border-y border-zinc-200 bg-white px-4 py-20 dark:border-zinc-800 dark:bg-zinc-900 lg:px-6"
      id="whyus"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Why Choose Us</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">
              A small senior team with ownership, taste, and commercial focus.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              The goal is not just to write code. It is to give your business a dependable software asset that reduces friction and creates leverage.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-zinc-200 bg-stone-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-200">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyUs;
