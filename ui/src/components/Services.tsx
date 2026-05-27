import { motion } from "framer-motion";
import { Blocks, Bot, CloudCog, Code2, LayoutDashboard, LifeBuoy } from "lucide-react";

const services = [
  {
    icon: <Code2 className="h-7 w-7" />,
    title: "Custom Software Development",
    description: "Reliable business software for operations, customer portals, booking systems, inventory, reporting, approvals, and team workflows.",
    keywords: ["Web application development", "Business software", "Client portals"],
  },
  {
    icon: <LayoutDashboard className="h-7 w-7" />,
    title: "SaaS & MVP Development",
    description: "Product strategy, UX, frontend, backend, payments, authentication, admin tools, and launch-ready infrastructure.",
    keywords: ["SaaS development", "MVP development", "Product engineering"],
  },
  {
    icon: <Blocks className="h-7 w-7" />,
    title: "API & System Integrations",
    description: "Connect CRMs, e-commerce platforms, payment providers, accounting systems, databases, and third-party APIs.",
    keywords: ["API integration", "CRM integration", "E-commerce integration"],
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: "Automation & Internal Tools",
    description: "Replace repetitive admin work with dashboards, approval flows, data syncs, notifications, and operational automations.",
    keywords: ["Workflow automation", "Internal tools", "Operations dashboards"],
  },
  {
    icon: <LifeBuoy className="h-7 w-7" />,
    title: "Maintenance & Technical Support",
    description: "Keep business-critical software healthy with monitoring, bug fixes, upgrades, security reviews, and ongoing improvements.",
    keywords: ["Software maintenance", "Technical support", "Legacy modernization"],
  },
  {
    icon: <CloudCog className="h-7 w-7" />,
    title: "Cloud Deployment & DevOps",
    description: "Deploy, monitor, and scale applications with reliable hosting, CI/CD pipelines, environment setup, and release workflows.",
    keywords: ["Cloud deployment", "DevOps", "CI/CD"],
  },
];

const Services = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="border-y border-zinc-200 bg-white px-4 py-20 dark:border-zinc-800 dark:bg-zinc-900 lg:px-6"
      id="services"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">What We Build</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">
            End-to-end software development services without the full-time product team overhead.
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            We handle strategy, UX, engineering, deployment, and support for custom software projects, from first MVP through long-term product improvement.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-200 bg-stone-50 p-6 transition hover:border-teal-300 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-200">{service.icon}</div>
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{service.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
