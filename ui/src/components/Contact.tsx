import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

// import emailjs from "@emailjs/browser";

// const SERVICE_ID = "service_uv6v496";
// const TEMPLATE_ID = "template_xdv9lmb";
// const PUBLIC_KEY = "5b1fYC2cMtvcwFHKp";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [fail, setFail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email address";
    if (!form.projectType.trim()) newErrors.projectType = "Project type is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("company", form.company);
      formData.append("projectType", form.projectType);
      formData.append("budget", form.budget);
      formData.append("timeline", form.timeline);
      formData.append("message", form.message);
      if (file) formData.append("file", file);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json") ? await response.json() : { error: await response.text() };
      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }
      setSuccess(result.message || "Message sent!");
      setFail(null);
      setForm({ name: "", email: "", company: "", projectType: "", budget: "", timeline: "", message: "" });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setFail("Failed to send message. Please try again later.");
      setSuccess(null);
      console.error(error instanceof Error ? error.message : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-zinc-950 px-4 py-20 text-white lg:px-6"
      id="contact"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">Start a Project</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal md:text-4xl">Tell us what needs to work better.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Share the business problem, the workflow, and the outcome you want. We will reply with practical next steps, not a generic sales script.
          </p>
          <div className="mt-8 rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm font-semibold text-white">Good fit projects usually include:</p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li>Custom web apps, dashboards, or client portals</li>
              <li>Workflow automation and internal operations tools</li>
              <li>API integrations between existing business systems</li>
              <li>Maintenance, modernization, or rescue work on existing apps</li>
            </ul>
          </div>
        </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-800 bg-white p-6 text-left text-zinc-950 shadow-xl dark:bg-zinc-900 dark:text-white">
        {success && <p className="text-center text-sm text-green-600 dark:text-green-400">{success}</p>}
        {fail && <p className="text-center text-sm text-red-600 dark:text-red-400">{fail}</p>}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className={`w-full rounded-md border bg-white p-3 text-zinc-950 focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-white ${
                errors.name ? "border-red-500 ring-red-300" : "border-zinc-300 focus:ring-teal-600 dark:border-zinc-700"
              }`}
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className={`w-full rounded-md border bg-white p-3 text-zinc-950 focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-white ${
                errors.email ? "border-red-500 ring-red-300" : "border-zinc-300 focus:ring-teal-600 dark:border-zinc-700"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-md border border-zinc-300 bg-white p-3 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            placeholder="Company or project name"
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Project Type</label>
            <select
              name="projectType"
              required
              value={form.projectType}
              onChange={(event) => {
                setForm({ ...form, projectType: event.target.value });
                setErrors({ ...errors, projectType: "" });
              }}
              className={`w-full rounded-md border bg-white p-3 text-zinc-950 focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-white ${
                errors.projectType ? "border-red-500 ring-red-300" : "border-zinc-300 focus:ring-teal-600 dark:border-zinc-700"
              }`}
            >
              <option value="">Select one</option>
              <option>Custom web app</option>
              <option>SaaS or MVP</option>
              <option>Automation</option>
              <option>API integration</option>
              <option>Maintenance or rescue</option>
            </select>
            {errors.projectType && <p className="mt-1 text-sm text-red-500">{errors.projectType}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Budget</label>
            <select
              name="budget"
              value={form.budget}
              onChange={(event) => setForm({ ...form, budget: event.target.value })}
              className="w-full rounded-md border border-zinc-300 bg-white p-3 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">Not sure yet</option>
              <option>Under $5k</option>
              <option>$5k - $15k</option>
              <option>$15k - $50k</option>
              <option>$50k+</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Timeline</label>
            <select
              name="timeline"
              value={form.timeline}
              onChange={(event) => setForm({ ...form, timeline: event.target.value })}
              className="w-full rounded-md border border-zinc-300 bg-white p-3 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              <option value="">Flexible</option>
              <option>ASAP</option>
              <option>1-3 months</option>
              <option>3-6 months</option>
              <option>Planning ahead</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Project Details</label>
          <textarea
            name="message"
            required
            rows={6}
            value={form.message}
            onChange={handleChange}
            className={`w-full rounded-md border bg-white p-3 text-zinc-950 focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-white ${
              errors.message ? "border-red-500 ring-red-300" : "border-zinc-300 focus:ring-teal-600 dark:border-zinc-700"
            }`}
            placeholder="What are you trying to build, fix, automate, or connect?"
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>

        <div className="mt-5">
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-200">Attachment</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleFileChange}
            className="w-full rounded-md border border-zinc-300 bg-white p-2 text-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-teal-400 dark:text-zinc-950 dark:hover:bg-teal-300"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"></path>
            </svg>
          ) : (
            <>
              Send Project Enquiry
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
      </div>
    </motion.section>
  );
};

export default Contact;
