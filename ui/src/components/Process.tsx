import { motion } from "framer-motion";

const steps = [
  ["01", "Discovery", "Clarify the business goal, users, existing systems, constraints, and the smallest valuable launch."],
  ["02", "Scope", "Turn the goal into a build plan with priorities, milestones, technical approach, and commercial expectations."],
  ["03", "Design", "Prototype key workflows so the product feels obvious before serious engineering hours are spent."],
  ["04", "Build", "Ship in visible increments with clean code, secure foundations, and regular reviews."],
  ["05", "Launch", "Deploy, test, document, train, monitor, and support the software as it starts doing real work."],
];

const Process = () => {
  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="border-y border-zinc-200 bg-white px-4 py-20 dark:border-zinc-800 dark:bg-zinc-900 lg:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Delivery Process</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">Predictable delivery for software your business depends on.</h2>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {steps.map(([number, title, description]) => (
            <div key={number} className="rounded-lg border border-zinc-200 bg-stone-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-sm font-bold text-teal-700 dark:text-teal-300">{number}</p>
              <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Process;
