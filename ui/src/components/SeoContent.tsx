import { motion } from "framer-motion";
import { CheckCircle2, MapPin, SearchCheck } from "lucide-react";

const buyerKeywords = [
  "Custom software development company",
  "Web app development",
  "SaaS development agency",
  "MVP development",
  "API integration specialists",
  "Workflow automation consultants",
  "Internal tools development",
  "Software maintenance and support",
];

const servicePages = [
  {
    title: "Custom software for operations",
    copy: "We build the systems your team uses every day: dashboards, portals, admin panels, reporting tools, approvals, bookings, stock management, and customer workflows.",
  },
  {
    title: "SaaS and MVP product builds",
    copy: "We help founders and companies turn product ideas into usable software with authentication, billing, roles, admin views, integrations, deployment, and post-launch iteration.",
  },
  {
    title: "Automation and integrations",
    copy: "We connect CRMs, e-commerce stores, payment providers, databases, spreadsheets, accounting tools, and third-party APIs so data moves without manual copy-paste work.",
  },
];

const faqs = [
  {
    question: "What makes softwer.dev different from a generic software development agency?",
    answer:
      "We focus on business workflows, not just code delivery. Every build starts with the operational problem, the users, the systems involved, and the measurable result the software needs to create.",
  },
  {
    question: "Can you work with existing software or legacy systems?",
    answer:
      "Yes. We can maintain, modernize, integrate, or rebuild existing software when a business-critical system has become slow, fragile, undocumented, or difficult to change.",
  },
  {
    question: "Do you only build websites?",
    answer:
      "No. We build web applications, SaaS products, internal tools, dashboards, API integrations, workflow automation, data systems, and ongoing software improvements.",
  },
  {
    question: "Where do you provide software development services?",
    answer:
      "softwer.dev is remote-first and can support clients in Australia, Malta, and international markets. For local SEO, pair this website with a completed Google Business Profile and consistent directory listings.",
  },
];

const SeoContent = () => {
  return (
    <>
      <motion.section
        id="software-development-company"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="border-y border-zinc-200 bg-stone-50 px-4 py-20 dark:border-zinc-800 dark:bg-zinc-700 lg:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Search-Friendly Services</p>
              <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">
                A software development company built around useful business outcomes.
              </h2>
              <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                Companies usually search for a software partner when something important is blocked: a product needs to launch, systems need to connect, staff
                are buried in admin, or legacy software needs attention.
              </p>
            </div>

            <div className="grid gap-4">
              {servicePages.map((item) => (
                <article key={item.title} className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-200">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <SearchCheck className="h-6 w-6 text-teal-700 dark:text-teal-300" />
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Relevant software development searches</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {buyerKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-md bg-stone-50 px-3 py-2 text-sm font-medium text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-300 dark:ring-zinc-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="locations"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white px-4 py-20 dark:bg-zinc-900 lg:px-6"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">Service Areas</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">
              Remote-first software development for Australia, Malta, and beyond.
            </h2>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-stone-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <MapPin className="h-7 w-7 text-teal-700 dark:text-teal-300" />
            <p className="mt-4 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              softwer.dev works with growing businesses across time zones through clear planning, regular delivery updates, and pragmatic technical support. To
              strengthen local rankings, keep the same business name, website, service areas, and contact details across Google Business Profile, client
              directories, and partner listings.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="faq"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="border-t border-zinc-200 bg-stone-50 px-4 py-20 dark:border-zinc-800 dark:bg-zinc-700 lg:px-6"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-300">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-zinc-950 dark:text-white md:text-4xl">
              Questions buyers ask before choosing a software development company.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default SeoContent;
