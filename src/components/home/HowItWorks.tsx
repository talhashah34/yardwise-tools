const steps = [
  {
    title: "Measure your space",
    description:
      "Record the length, width, diameter, or base and height of each garden bed.",
    icon: MeasureIcon,
  },
  {
    title: "Enter your desired depth",
    description:
      "Choose how deep you want the mulch — and account for any mulch already in place.",
    icon: DepthIcon,
  },
  {
    title: "Get your material estimate",
    description:
      "See volume in cubic yards or metres, bag counts, and optional cost comparisons.",
    icon: ResultIcon,
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-subtle/60 py-16 md:py-20">
      <div className="container-yardwise">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl text-deep-green md:text-4xl">How It Works</h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-text-secondary">
            Three simple steps from garden measurements to a shopping-ready estimate.
          </p>
        </div>

        <ol className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-[20px] border border-border bg-card p-5 shadow-[var(--shadow-sm)] sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-soft-sage">
                  <step.icon />
                </span>
                <span className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-sage">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-xl text-deep-green">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MeasureIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="32" height="20" rx="4" stroke="#214E3D" strokeWidth="2" />
      <path d="M10 18v4M16 16v8M22 18v4M28 16v8" stroke="#C77D55" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DepthIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 28h24v4H8v-4Z" fill="#EDE4D5" />
      <path d="M12 28V18c0-4 3.5-8 8-8s8 4 8 8v10" stroke="#214E3D" strokeWidth="2" />
      <path d="M20 12v16" stroke="#829B83" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
    </svg>
  );
}

function ResultIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="7" y="6" width="26" height="28" rx="4" stroke="#214E3D" strokeWidth="2" />
      <path d="M13 14h14M13 20h8M13 26h10" stroke="#C77D55" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
