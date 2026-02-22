export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6">
      {/* HERO */}
      <section className="max-w-5xl mx-auto pt-32 pb-24">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Hi, I’m Nitesh 👋
        </h1>

        <h2 className="text-2xl text-gray-300 mb-6">
          Web Developer building fast, modern websites and dashboards
        </h2>

        <p className="text-gray-400 max-w-2xl mb-10">
          I specialize in creating responsive web applications, business
          websites, and data-driven dashboards using modern technologies like
          React, Next.js, and Tailwind CSS.
        </p>

        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90">
            View Projects
          </button>

          <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
            Contact Me
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-5xl mx-auto pb-24">
        <h3 className="text-3xl font-semibold mb-12">What I Build</h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-800 p-6 rounded-xl">
            <h4 className="text-xl font-semibold mb-3">Business Websites</h4>
            <p className="text-gray-400">
              Fast, responsive websites designed to represent your brand and
              convert visitors into customers.
            </p>
          </div>

          <div className="border border-gray-800 p-6 rounded-xl">
            <h4 className="text-xl font-semibold mb-3">Dashboards</h4>
            <p className="text-gray-400">
              Data-driven dashboards with filters, tables, charts, and user
              management systems.
            </p>
          </div>

          <div className="border border-gray-800 p-6 rounded-xl">
            <h4 className="text-xl font-semibold mb-3">Web Apps</h4>
            <p className="text-gray-400">
              Custom portals and form-based applications with validations,
              APIs, and clean UI.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="max-w-5xl mx-auto pb-24">
        <h3 className="text-3xl font-semibold mb-12">Projects</h3>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="border border-gray-800 rounded-xl overflow-hidden">
            <div className="h-48 bg-gray-900 flex items-center justify-center text-gray-500">
              Project Screenshot
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2">Admin Dashboard</h4>
              <p className="text-gray-400 mb-4">
                A responsive dashboard with authentication, tables, filters,
                and form validation for managing business data.
              </p>
            </div>
          </div>

          <div className="border border-gray-800 rounded-xl overflow-hidden">
            <div className="h-48 bg-gray-900 flex items-center justify-center text-gray-500">
              Project Screenshot
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-2">Business Website</h4>
              <p className="text-gray-400 mb-4">
                A modern responsive website built for a business with fast load
                speed, clean UI, and contact form integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-5xl mx-auto pb-32 text-center">
        <h3 className="text-3xl font-semibold mb-6">Let’s Work Together</h3>

        <p className="text-gray-400 mb-10">
          Have a project in mind or need help improving your website?
          Feel free to reach out.
        </p>

        <a
          href="mailto:your@email.com"
          className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold hover:opacity-90"
        >
          Contact Me
        </a>
      </section>
    </main>
  );
}