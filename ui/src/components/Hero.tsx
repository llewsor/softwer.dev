import icon from "../assets/icon.png";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const outcomes = ["Custom web apps", "API integrations", "Internal tools", "Ongoing support"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative overflow-hidden border-b border-zinc-200 bg-white pt-28 dark:border-zinc-800 dark:bg-zinc-900"
      id="hero"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-6 lg:pb-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-medium text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-100">
            <CheckCircle2 className="h-4 w-4" />
            Production software for growing businesses
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-normal text-zinc-950 dark:text-white md:text-6xl">
            Custom software development company for businesses that have outgrown spreadsheets, plugins, and duct tape.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            softwer.dev designs, builds, and maintains custom web apps, SaaS products, integrations, dashboards, and internal systems that make business
            operations faster, cleaner, and easier to scale.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-72}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-teal-200"
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="services"
              smooth={true}
              duration={500}
              offset={-72}
              className="inline-flex cursor-pointer items-center justify-center rounded-md border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-teal-600 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-teal-300 dark:hover:text-teal-200"
            >
              View Services
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 sm:grid-cols-4">
            {outcomes.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-300" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-950 p-4 shadow-xl dark:border-zinc-800">
          <div className="rounded-md bg-zinc-900 p-4">
            <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-3">
                <img src={icon} alt="Softwer.dev" className="h-9 w-9" />
                <div>
                  <p className="text-sm font-semibold text-white">Operations Command Center</p>
                  <p className="text-xs text-zinc-400">Live systems, workflows, revenue signals</p>
                </div>
              </div>
              <span className="rounded-md bg-teal-400/15 px-2 py-1 text-xs font-semibold text-teal-200">Healthy</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Manual hours saved", "38/wk"],
                ["API sync status", "99.98%"],
                ["Open support items", "2"],
                ["Client portal usage", "+64%"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Build Roadmap</p>
                <p className="text-xs text-zinc-500">Next 30 days</p>
              </div>
              {["Client dashboard", "Payment integration", "Workflow automation"].map((item, index) => (
                <div key={item} className="mb-3 last:mb-0">
                  <div className="mb-1 flex justify-between text-xs text-zinc-400">
                    <span>{item}</span>
                    <span>{[84, 62, 41][index]}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800">
                    <div className="h-2 rounded-full bg-teal-400" style={{ width: `${[84, 62, 41][index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
