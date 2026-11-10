const benefits = [
  {
    title: "Practical calculations",
    description:
      "Estimates based on standard volume formulas used throughout landscaping and hardscaping.",
  },
  {
    title: "Flexible measurements",
    description:
      "Switch between US/imperial and metric units. Your preference can stay saved on this device.",
  },
  {
    title: "Multiple garden bed shapes",
    description:
      "Model rectangles, circles, and triangles — then combine several beds into one total.",
  },
  {
    title: "Clear shopping estimates",
    description:
      "Compare bagged and bulk options with optional prices, delivery fees, and waste allowance.",
  },
];

export function Benefits() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-yardwise">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl text-deep-green md:text-4xl">Why Use Yardwise?</h2>
          <p className="mt-3 text-text-secondary">
            Built for homeowners and landscapers who want clearer numbers before they buy materials.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-[14px] border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
            >
              <h3 className="text-lg text-deep-green">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
