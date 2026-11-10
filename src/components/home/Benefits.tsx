const benefits = [
  {
    title: "Practical calculations",
    description:
      "Estimates based on standard volume formulas used throughout landscaping and hardscaping.",
    icon: FormulaIcon,
  },
  {
    title: "Flexible measurements",
    description:
      "Switch between US/imperial and metric units. Your preference can stay saved on this device.",
    icon: UnitsIcon,
  },
  {
    title: "Multiple garden bed shapes",
    description:
      "Model rectangles, circles, and triangles — then combine several beds into one total.",
    icon: ShapesIcon,
  },
  {
    title: "Clear shopping estimates",
    description:
      "Compare bagged and bulk options with optional prices, delivery fees, and waste allowance.",
    icon: CartIcon,
  },
];

export function Benefits() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-yardwise">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl text-deep-green md:text-4xl">Why Use Yardwise?</h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-text-secondary">
            Built for homeowners and landscapers who want clearer numbers before they buy materials.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="relative overflow-hidden rounded-[16px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] sm:p-6"
            >
              <div
                className="absolute inset-y-0 left-0 w-[3px] bg-forest"
                aria-hidden="true"
              />
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-soft-sage text-forest">
                <benefit.icon />
              </div>
              <h3 className="text-lg text-deep-green">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormulaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UnitsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 14.5 14.5 4M6.5 16.5 16.5 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="5.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="14.5" cy="14.5" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ShapesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="14" cy="6.5" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3.5 11.5 9H4.5L8 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 4h2l1.6 8.2a1.5 1.5 0 0 0 1.5 1.2h6.4a1.5 1.5 0 0 0 1.5-1.2L17 7H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="16.5" r="1.2" fill="currentColor" />
      <circle cx="14.5" cy="16.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
