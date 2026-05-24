import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const engagements = [
  {
    name: "Project Build",
    fit: "Best for clear scopes",
    description: "A defined software build with discovery, design, implementation, deployment, and handover.",
    points: ["Fixed roadmap and milestones", "Weekly progress updates", "Launch-ready documentation"],
  },
  {
    name: "Product Team Retainer",
    fit: "Best for ongoing growth",
    description: "A monthly engineering partner for companies that need steady product development without hiring in-house.",
    points: ["Prioritized monthly backlog", "Feature development and support", "Roadmap and technical guidance"],
  },
  {
    name: "Technical Audit",
    fit: "Best before major decisions",
    description: "A focused review of your app, infrastructure, workflow, or integration plan before you commit budget.",
    points: ["Risk and opportunity report", "Architecture recommendations", "Clear next-step estimate"],
  },
];

const Engagements = () => {
  return (
    <motion.section
      id="engagements"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-stone-50 px-4 py-20 dark:bg-zinc-950 lg:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">How We Work</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">Flexible ways to bring senior software capability into your business.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            Every engagement starts with a practical conversation about goals, constraints, budget, timeline, and what success needs to look like.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {engagements.map((engagement) => (
            <article key={engagement.name} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">{engagement.fit}</p>
              <h3 className="mt-3 text-2xl font-bold text-zinc-950 dark:text-white">{engagement.name}</h3>
              <p className="mt-4 min-h-[4.5rem] text-sm leading-6 text-zinc-700 dark:text-zinc-300">{engagement.description}</p>
              <ul className="mt-6 space-y-3">
                {engagement.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700 dark:text-teal-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Engagements;
