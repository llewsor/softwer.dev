import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

// import emailjs from "@emailjs/browser";

// const SERVICE_ID = "service_uv6v496";
// const TEMPLATE_ID = "template_xdv9lmb";
// const PUBLIC_KEY = "5b1fYC2cMtvcwFHKp";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      formData.append("message", form.message);
      if (file) formData.append("file", file);

      const response = await fetch("https://api.softwer.dev/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setSuccess(result.message || "Message sent!");
      setForm({ name: "", email: "", message: "" });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setFail("Failed to send message. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <section className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark py-20 px-6 text-center" id="contact">
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
      className="min-h-screen text-center py-25 "
      // className="min-h-screen flex items-center justify-center"
      id="contact"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">Have a project in mind? Send us a message and we’ll get back to you shortly.</p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 text-left">
        {success && <p className="text-center text-sm text-green-600 dark:text-green-400">{success}</p>}
        {fail && <p className="text-center text-sm text-red-600 dark:text-red-400">{fail}</p>}

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              errors.name ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-600 dark:border-gray-600"
            }`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              errors.email ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-600 dark:border-gray-600"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              errors.message ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-600 dark:border-gray-600"
            }`}
            placeholder="Tell us a bit about your project..."
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Attachment</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          type="submit"
          className="bg-brand-light dark:bg-brand-dark text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"></path>
            </svg>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </motion.section>
  );
};

export default Contact;
