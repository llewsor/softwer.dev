import { motion } from "framer-motion";
import { AlertTriangle, Cable, ClipboardList, Gauge } from "lucide-react";

const problems = [
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: "Manual work is eating profit",
    description: "Your team is copying data between spreadsheets, inboxes, payment tools, CRMs, and accounting systems.",
  },
  {
    icon: <Cable className="h-6 w-6" />,
    title: "Your systems do not talk",
    description: "Orders, stock, customers, bookings, invoices, and reports live in separate places with no reliable source of truth.",
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Legacy tools feel risky",
    description: "The app still runs the business, but changing it is slow, fragile, undocumented, or dependent on one person.",
  },
  {
    icon: <Gauge className="h-6 w-6" />,
    title: "Growth needs better software",
    description: "You need a client portal, dashboard, internal platform, or SaaS product that can support the next stage of the company.",
  },
];

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-stone-50 px-4 py-20 dark:bg-zinc-700 lg:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Where We Help</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">
              The best projects start with a business bottleneck.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              We work with owners, operators, and growing teams who need dependable software that removes friction from real workflows.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {problems.map((problem) => (
              <div key={problem.title} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-200">
                  {problem.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{problem.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
