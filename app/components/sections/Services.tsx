"use client";
import { motion } from "framer-motion";

const services = [
  {
    title: "Enterprise Dashboards",
    desc: "Built role-based dashboards with filters, analytics, and real-time data workflows used by multiple teams.",
  },
  {
    title: "Complex Form Systems",
    desc: "Engineered large reactive form systems with validation, dynamic controls, and workflow automation.",
  },
  {
    title: "Performance & Architecture",
    desc: "Optimized platforms using SSR, lazy loading, and modular architecture to improve speed and scalability.",
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 pb-32">
      <h2 className="text-3xl font-semibold mb-14 text-center">
        What I Build for Teams & Businesses
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border border-gray-800 p-7 rounded-xl bg-white/5 hover:bg-white/10 transition">
            <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
            <p className="text-gray-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}