export type CalculatorFaq = {
  question: string;
  answer: string;
};

export type RelatedCalculator = {
  href: string;
  label: string;
  blurb: string;
};

export type CalculatorSeoContent = {
  id: string;
  materialLabel: string;
  calculatorName: string;
  guideHref: string;
  guideLabel: string;
  affiliateCollection: "mulch" | "soil" | "gravel" | "general";
  depthNote: string;
  steps: string[];
  coverageRows: Array<{ depth: string; coverage: string }>;
  faqs: CalculatorFaq[];
  related: RelatedCalculator[];
  extraNotes?: string[];
};

export const calculatorSeoContent: Record<string, CalculatorSeoContent> = {
  mulch: {
    id: "mulch",
    materialLabel: "mulch",
    calculatorName: "Mulch Calculator",
    guideHref: "/guides/how-much-mulch-do-i-need",
    guideLabel: "How Much Mulch Do I Need?",
    affiliateCollection: "mulch",
    depthNote:
      "Most U.S. flower and shrub beds use 2–3 inches of mulch. Coarser bark often needs closer to 3 inches for weed control.",
    steps: [
      "Measure each bed’s length and width in feet (split curves into simple shapes).",
      "Choose mulch depth in inches — start with 3 inches for new beds.",
      "Use the calculator to get cubic yards, cubic feet, and bag counts.",
      "Add a small overage (about 5–10%) for edges, settling, and spills.",
      "Compare bagged vs bulk before you buy.",
    ],
    coverageRows: [
      { depth: "1 inch", coverage: "324 sq ft per cubic yard" },
      { depth: "2 inches", coverage: "162 sq ft per cubic yard" },
      { depth: "3 inches", coverage: "108 sq ft per cubic yard" },
      { depth: "4 inches", coverage: "81 sq ft per cubic yard" },
    ],
    faqs: [
      {
        question: "How much mulch do I need for 100 square feet?",
        answer:
          "At 3 inches deep, 100 sq ft needs about 0.93 cubic yards (roughly 25 cubic feet). In 2 cu ft bags, that is about 13 bags after rounding up.",
      },
      {
        question: "How many bags of mulch are in a cubic yard?",
        answer:
          "One cubic yard is 27 cubic feet. That equals about 14 bags of 2 cu ft mulch, or 9 bags of 3 cu ft mulch.",
      },
      {
        question: "Should I buy mulch in bags or bulk?",
        answer:
          "Bags are convenient under about 1 cubic yard. Bulk delivery is usually cheaper for larger U.S. yard projects, especially 2+ cubic yards.",
      },
      {
        question: "How deep should mulch be?",
        answer:
          "For most home landscaping beds in the U.S., 2–3 inches is the practical range. Keep mulch off trunks and stems.",
      },
    ],
    related: [
      {
        href: "/tools/topsoil-calculator",
        label: "Topsoil Calculator",
        blurb: "Estimate soil for new beds and lawn patches.",
      },
      {
        href: "/tools/compost-calculator",
        label: "Compost Calculator",
        blurb: "Plan amendments before you mulch.",
      },
      {
        href: "/guides/how-much-mulch-for-flower-beds",
        label: "Mulch for Flower Beds Guide",
        blurb: "U.S. flower-bed depths, bags, and buying tips.",
      },
    ],
  },
  topsoil: {
    id: "topsoil",
    materialLabel: "topsoil",
    calculatorName: "Topsoil Calculator",
    guideHref: "/guides/how-much-topsoil-do-i-need",
    guideLabel: "How Much Topsoil Do I Need?",
    affiliateCollection: "soil",
    depthNote:
      "Lawn top-dressing is often 1–2 inches. New planting beds may need several inches of quality topsoil over fill.",
    steps: [
      "Measure the area in feet (or enter multiple beds).",
      "Choose depth in inches based on lawn patch vs new bed.",
      "Calculate cubic yards and bag counts with the tool above.",
      "Decide if you need fill dirt underneath and topsoil on top.",
      "Order bulk for larger yardages; bags for small repairs.",
    ],
    coverageRows: [
      { depth: "1 inch", coverage: "324 sq ft per cubic yard" },
      { depth: "2 inches", coverage: "162 sq ft per cubic yard" },
      { depth: "3 inches", coverage: "108 sq ft per cubic yard" },
      { depth: "4 inches", coverage: "81 sq ft per cubic yard" },
    ],
    faqs: [
      {
        question: "How much topsoil do I need for 500 square feet?",
        answer:
          "At 2 inches deep, 500 sq ft needs about 3.09 cubic yards. Confirm bag or bulk pricing with your local supplier.",
      },
      {
        question: "What is the difference between fill dirt and topsoil?",
        answer:
          "Fill dirt raises grade. Topsoil is the planting layer. Many U.S. projects use fill first, then a topsoil cap.",
      },
      {
        question: "How deep should topsoil be for sod?",
        answer:
          "Many homeowners plan roughly 2–4 inches of quality topsoil over a graded base, depending on existing soil and sod supplier guidance.",
      },
      {
        question: "Is bagged topsoil the same as bulk topsoil?",
        answer:
          "Not always. Bagged products are convenient; bulk screened topsoil varies by yard. Compare texture and ask what’s screened.",
      },
    ],
    related: [
      {
        href: "/tools/compost-calculator",
        label: "Compost Calculator",
        blurb: "Amend existing soil instead of full replacement.",
      },
      {
        href: "/tools/mulch-calculator",
        label: "Mulch Calculator",
        blurb: "Finish beds after soil work.",
      },
      {
        href: "/guides/fill-dirt-vs-topsoil",
        label: "Fill Dirt vs Topsoil Guide",
        blurb: "Choose the right material before you order.",
      },
    ],
  },
  compost: {
    id: "compost",
    materialLabel: "compost",
    calculatorName: "Compost Calculator",
    guideHref: "/guides/how-much-compost-do-i-need",
    guideLabel: "How Much Compost Do I Need?",
    affiliateCollection: "soil",
    depthNote:
      "Compost is usually applied thinner than fill soil — often about 1–2 inches as a top-dress or mix-in layer.",
    steps: [
      "Measure bed or lawn area in feet.",
      "Choose an amendment depth (often 1–2 inches).",
      "Calculate cubic yards and bags with the compost tool.",
      "Blend into soil or top-dress according to your project.",
      "Retest soil later if plants still underperform.",
    ],
    coverageRows: [
      { depth: "1 inch", coverage: "324 sq ft per cubic yard" },
      { depth: "2 inches", coverage: "162 sq ft per cubic yard" },
      { depth: "3 inches", coverage: "108 sq ft per cubic yard" },
    ],
    faqs: [
      {
        question: "How much compost do I need for a garden bed?",
        answer:
          "A common homeowner starting point is about 1–2 inches over the bed area, then calculate cubic yards from square footage and depth.",
      },
      {
        question: "Can I use compost instead of topsoil?",
        answer:
          "Compost is an amendment, not always a full soil replacement. Many beds need topsoil volume plus compost for fertility.",
      },
      {
        question: "How many bags of compost equal a cubic yard?",
        answer:
          "One cubic yard is 27 cubic feet. Divide 27 by your bag size (for example 1 or 1.5 cu ft) and round up.",
      },
      {
        question: "Should compost be mixed in or left on top?",
        answer:
          "Both are used. Mixing helps beds; a thin top-dress can help lawns and established plantings. Follow plant needs and local guidance.",
      },
    ],
    related: [
      {
        href: "/tools/topsoil-calculator",
        label: "Topsoil Calculator",
        blurb: "Estimate bulk soil when compost alone isn’t enough.",
      },
      {
        href: "/tools/mulch-calculator",
        label: "Mulch Calculator",
        blurb: "Cover beds after amending soil.",
      },
      {
        href: "/guides/how-much-compost-do-i-need",
        label: "Compost Quantity Guide",
        blurb: "Depth tips and worked examples.",
      },
    ],
  },
  gravel: {
    id: "gravel",
    materialLabel: "gravel",
    calculatorName: "Gravel Calculator",
    guideHref: "/guides/how-much-gravel-do-i-need",
    guideLabel: "How Much Gravel Do I Need?",
    affiliateCollection: "gravel",
    depthNote:
      "Decorative paths often use about 2–3 inches. Structural bases for patios/drive areas are deeper and may need multiple layers.",
    steps: [
      "Measure path or patio length and width in feet.",
      "Choose depth in inches for the gravel layer you are ordering.",
      "Calculate cubic yards (and approximate weight when shown).",
      "Add overage for compaction and uneven ground.",
      "Confirm stone type and density with your U.S. supplier.",
    ],
    coverageRows: [
      { depth: "1 inch", coverage: "324 sq ft per cubic yard" },
      { depth: "2 inches", coverage: "162 sq ft per cubic yard" },
      { depth: "3 inches", coverage: "108 sq ft per cubic yard" },
      { depth: "4 inches", coverage: "81 sq ft per cubic yard" },
    ],
    faqs: [
      {
        question: "How much gravel do I need for a path?",
        answer:
          "Measure length × width in feet, choose depth in inches, then divide by 324 for cubic yards. A 20×3 ft path at 2 inches is about 0.37 cubic yards.",
      },
      {
        question: "How many tons of gravel are in a cubic yard?",
        answer:
          "It depends on stone density and moisture. Many landscape gravels are roughly 1.2–1.5 tons per cubic yard — confirm with your quarry.",
      },
      {
        question: "How deep should gravel be for a walkway?",
        answer:
          "Many decorative walkways use about 2–3 inches over a prepared base. Soft ground may need a stronger base layer first.",
      },
      {
        question: "Is pea gravel the same as crushed stone?",
        answer:
          "No. Pea gravel is rounded; crushed stone locks together better for bases and drive surfaces.",
      },
    ],
    related: [
      {
        href: "/tools/pea-gravel-calculator",
        label: "Pea Gravel Calculator",
        blurb: "For rounded decorative stone paths and fills.",
      },
      {
        href: "/tools/gravel-driveway-calculator",
        label: "Driveway Gravel Calculator",
        blurb: "Deeper driveway layers and ton estimates.",
      },
      {
        href: "/guides/how-many-tons-of-gravel-do-i-need",
        label: "Tons of Gravel Guide",
        blurb: "Convert yards to approximate tons.",
      },
    ],
    extraNotes: ["weight"],
  },
  "pea-gravel": {
    id: "pea-gravel",
    materialLabel: "pea gravel",
    calculatorName: "Pea Gravel Calculator",
    guideHref: "/guides/how-much-pea-gravel-do-i-need",
    guideLabel: "How Much Pea Gravel Do I Need?",
    affiliateCollection: "gravel",
    depthNote:
      "Pea gravel paths and patios commonly use about 2–3 inches over a compacted base.",
    steps: [
      "Measure the area in feet.",
      "Select a pea gravel depth (often 2–3 inches).",
      "Calculate cubic yards and shopping quantities.",
      "Plan edging so rounded stone stays in place.",
      "Order a little extra for settling and cleanup.",
    ],
    coverageRows: [
      { depth: "2 inches", coverage: "162 sq ft per cubic yard" },
      { depth: "3 inches", coverage: "108 sq ft per cubic yard" },
      { depth: "4 inches", coverage: "81 sq ft per cubic yard" },
    ],
    faqs: [
      {
        question: "How much pea gravel do I need for a patio?",
        answer:
          "Use length × width × depth ÷ 324 for cubic yards. A 10×10 ft patio at 3 inches needs about 0.93 cubic yards.",
      },
      {
        question: "How deep should pea gravel be?",
        answer:
          "For walking surfaces, 2–3 inches is common. Too shallow exposes the base; too deep can feel unstable underfoot.",
      },
      {
        question: "Do I need landscape fabric under pea gravel?",
        answer:
          "Many DIYers use fabric to limit weeds, plus edging to keep rounded stone from migrating.",
      },
      {
        question: "Is pea gravel good for driveways?",
        answer:
          "Usually not as the only surface. Rounded stone shifts under tires; crushed driveway gravel performs better.",
      },
    ],
    related: [
      {
        href: "/tools/gravel-calculator",
        label: "Gravel Calculator",
        blurb: "For mixed decorative and path gravel projects.",
      },
      {
        href: "/tools/gravel-driveway-calculator",
        label: "Driveway Gravel Calculator",
        blurb: "For vehicle surfaces and deeper bases.",
      },
      {
        href: "/guides/how-much-pea-gravel-do-i-need",
        label: "Pea Gravel Guide",
        blurb: "Coverage tips and buying advice.",
      },
    ],
    extraNotes: ["weight"],
  },
  driveway: {
    id: "driveway",
    materialLabel: "driveway gravel",
    calculatorName: "Gravel Driveway Calculator",
    guideHref: "/guides/gravel-driveway-how-much-do-i-need",
    guideLabel: "Gravel Driveway: How Much Do I Need?",
    affiliateCollection: "gravel",
    depthNote:
      "Many U.S. residential gravel driveways target roughly 4–6 inches total stone depth across base and surface layers.",
    steps: [
      "Measure driveway length and width in feet.",
      "Choose base depth and surface depth in inches.",
      "Calculate each layer’s cubic yards separately, then add.",
      "Review approximate tons and order contingency for compaction.",
      "Confirm stone gradation with a local quarry or landscape yard.",
    ],
    coverageRows: [
      { depth: "2 inches", coverage: "162 sq ft per cubic yard" },
      { depth: "3 inches", coverage: "108 sq ft per cubic yard" },
      { depth: "4 inches", coverage: "81 sq ft per cubic yard" },
      { depth: "6 inches", coverage: "54 sq ft per cubic yard" },
    ],
    faqs: [
      {
        question: "How deep should a gravel driveway be?",
        answer:
          "A common planning range is 4–6 inches total, often with a thicker crushed base and a thinner surface layer.",
      },
      {
        question: "How much gravel do I need for a 50x10 driveway?",
        answer:
          "At 4 inches deep, 50×10 ft is about 6.17 cubic yards before compaction overage.",
      },
      {
        question: "How many tons of gravel for a driveway?",
        answer:
          "Convert cubic yards using your stone’s density. Many driveway gravels are around 1.2–1.5 tons per cubic yard — verify locally.",
      },
      {
        question: "Can I put new gravel over old gravel?",
        answer:
          "Sometimes, if the old surface is stable and graded. Severe rutting usually needs regrading or a new base, not just a thin top-up.",
      },
    ],
    related: [
      {
        href: "/tools/gravel-calculator",
        label: "Gravel Calculator",
        blurb: "For paths and decorative gravel areas.",
      },
      {
        href: "/guides/how-deep-should-a-gravel-driveway-be",
        label: "Driveway Depth Guide",
        blurb: "Base vs surface depths for U.S. driveways.",
      },
      {
        href: "/guides/how-many-tons-of-gravel-do-i-need",
        label: "Tons of Gravel Guide",
        blurb: "Turn yards into approximate tons.",
      },
    ],
    extraNotes: ["weight"],
  },
};
