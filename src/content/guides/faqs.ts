import type { GuideFaq } from "./types";

/** FAQ fallbacks/enrichment keyed by guide slug. */
export const guideFaqs: Record<string, GuideFaq[]> = {
  "how-much-mulch-do-i-need": [
    { question: "What is the mulch formula?", answer: "Cubic yards = square feet × depth in inches ÷ 324." },
    { question: "How deep should mulch be in beds?", answer: "Most ornamental beds use 2–3 inches, kept off plant stems." },
    { question: "Should I buy bags or bulk?", answer: "Bags are convenient under about 1 cubic yard; bulk is usually better for larger jobs." }
  ],
  "how-deep-should-mulch-be": [
    { question: "Can mulch be too deep?", answer: "Yes. Overly deep mulch can stay too wet and stress plants; stick near 2–3 inches for most beds." },
    { question: "Should mulch touch tree trunks?", answer: "No. Pull mulch back so it does not volcano against the bark." },
    { question: "Do pathways need the same depth?", answer: "Path mulch depth varies by traffic; beds and paths should be planned separately." }
  ],
  "how-many-bags-of-mulch-in-a-cubic-yard": [
    { question: "How many 2 cu ft bags are in a yard?", answer: "There are 27 cubic feet in a yard, so about 14 bags of 2 cubic feet (27÷2)." },
    { question: "Do bag sizes vary?", answer: "Yes. Always check the bag label — 1.5, 2, and 3 cubic foot bags are common." },
    { question: "Should I round up?", answer: "Yes. Round purchase quantities up so you do not run short mid-project." }
  ],
  "mulch-bags-vs-bulk": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in mulch bags vs bulk and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "how-to-measure-an-irregular-garden-bed": [
    { question: "Imperial or metric — which should I use?", answer: "Use the unit system your supplier sells in. Yardwise calculators support both." },
    { question: "Why do estimates differ from what I buy?", answer: "Waste, settling, and rounding to whole bags/trucks change the final order." },
    { question: "What page should I use next?", answer: "Open the matching calculator from the guide CTA, then compare bag vs bulk if the volume is large." }
  ],
  "how-much-topsoil-do-i-need": [
    { question: "What is the volume formula?", answer: "For inches of depth over an area: square feet × inches ÷ 324 = cubic yards." },
    { question: "Is screened material worth it?", answer: "Screened topsoil/compost is usually easier to spread and plant into." },
    { question: "Can I mix compost and topsoil?", answer: "Yes. Blends are common for beds and raised gardens." }
  ],
  "how-much-compost-do-i-need": [
    { question: "What is the volume formula?", answer: "For inches of depth over an area: square feet × inches ÷ 324 = cubic yards." },
    { question: "Is screened material worth it?", answer: "Screened topsoil/compost is usually easier to spread and plant into." },
    { question: "Can I mix compost and topsoil?", answer: "Yes. Blends are common for beds and raised gardens." }
  ],
  "how-much-gravel-do-i-need": [
    { question: "How do I estimate gravel volume?", answer: "Use area in square feet × depth in inches ÷ 324 for cubic yards." },
    { question: "Do I need edging?", answer: "For loose gravel surfaces, strong edging prevents migration into lawns and beds." },
    { question: "Angular or rounded gravel?", answer: "Angular crushed stone locks better for driveways; rounded pea gravel is more decorative and shifts more." }
  ],
  "how-much-pea-gravel-do-i-need": [
    { question: "How do I estimate gravel volume?", answer: "Use area in square feet × depth in inches ÷ 324 for cubic yards." },
    { question: "Do I need edging?", answer: "For loose gravel surfaces, strong edging prevents migration into lawns and beds." },
    { question: "Angular or rounded gravel?", answer: "Angular crushed stone locks better for driveways; rounded pea gravel is more decorative and shifts more." }
  ],
  "gravel-driveway-how-much-do-i-need": [
    { question: "How do I estimate gravel volume?", answer: "Use area in square feet × depth in inches ÷ 324 for cubic yards." },
    { question: "Do I need edging?", answer: "For loose gravel surfaces, strong edging prevents migration into lawns and beds." },
    { question: "Angular or rounded gravel?", answer: "Angular crushed stone locks better for driveways; rounded pea gravel is more decorative and shifts more." }
  ],
  "how-many-tons-of-gravel-do-i-need": [
    { question: "How do I estimate gravel volume?", answer: "Use area in square feet × depth in inches ÷ 324 for cubic yards." },
    { question: "Do I need edging?", answer: "For loose gravel surfaces, strong edging prevents migration into lawns and beds." },
    { question: "Angular or rounded gravel?", answer: "Angular crushed stone locks better for driveways; rounded pea gravel is more decorative and shifts more." }
  ],
  "how-much-soil-for-a-raised-bed": [
    { question: "What is the volume formula?", answer: "For inches of depth over an area: square feet × inches ÷ 324 = cubic yards." },
    { question: "Is screened material worth it?", answer: "Screened topsoil/compost is usually easier to spread and plant into." },
    { question: "Can I mix compost and topsoil?", answer: "Yes. Blends are common for beds and raised gardens." }
  ],
  "cubic-yards-to-cubic-metres": [
    { question: "Imperial or metric — which should I use?", answer: "Use the unit system your supplier sells in. Yardwise calculators support both." },
    { question: "Why do estimates differ from what I buy?", answer: "Waste, settling, and rounding to whole bags/trucks change the final order." },
    { question: "What page should I use next?", answer: "Open the matching calculator from the guide CTA, then compare bag vs bulk if the volume is large." }
  ],
  "bags-vs-bulk-landscaping-materials": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in bags vs bulk landscaping materials and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "landscaping-material-calculator-guide": [
    { question: "Imperial or metric — which should I use?", answer: "Use the unit system your supplier sells in. Yardwise calculators support both." },
    { question: "Why do estimates differ from what I buy?", answer: "Waste, settling, and rounding to whole bags/trucks change the final order." },
    { question: "What page should I use next?", answer: "Open the matching calculator from the guide CTA, then compare bag vs bulk if the volume is large." }
  ],
  "fill-dirt-vs-topsoil": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in fill dirt vs topsoil and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "rubber-mulch-vs-wood-mulch": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in rubber mulch vs wood mulch and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "landscape-fabric-vs-mulch": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in landscape fabric vs mulch and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "crushed-stone-vs-pea-gravel": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in crushed stone vs pea gravel and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "compost-vs-topsoil-vs-potting-mix": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in compost vs topsoil vs potting mix and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "how-much-mulch-for-flower-beds": [
    { question: "Do I need landscape fabric under mulch?", answer: "Not always. Fabric helps in some static beds and under rock, but mulch depth alone is enough for many flower beds." },
    { question: "How often should I refresh mulch?", answer: "Wood mulch is often topped up every 1–3 years as it decomposes." },
    { question: "What depth should I use?", answer: "2–3 inches is a common target for ornamental beds." }
  ],
  "how-deep-should-a-gravel-driveway-be": [
    { question: "How do I estimate gravel volume?", answer: "Use area in square feet × depth in inches ÷ 324 for cubic yards." },
    { question: "Do I need edging?", answer: "For loose gravel surfaces, strong edging prevents migration into lawns and beds." },
    { question: "Angular or rounded gravel?", answer: "Angular crushed stone locks better for driveways; rounded pea gravel is more decorative and shifts more." }
  ],
  "best-time-to-mulch": [
    { question: "Do I need landscape fabric under mulch?", answer: "Not always. Fabric helps in some static beds and under rock, but mulch depth alone is enough for many flower beds." },
    { question: "How often should I refresh mulch?", answer: "Wood mulch is often topped up every 1–3 years as it decomposes." },
    { question: "What depth should I use?", answer: "2–3 inches is a common target for ornamental beds." }
  ],
  "sod-vs-seed": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in sod vs seed and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "how-much-sod-do-i-need": [
    { question: "Is sod faster than seed?", answer: "Yes. Sod gives instant cover; seed is cheaper but needs more time and watering discipline." },
    { question: "How much waste should I add for sod?", answer: "Add about 5–10% for cuts and edges." },
    { question: "Does soil prep still matter?", answer: "Yes. Grade and soil quality matter as much as sod versus seed." }
  ],
  "gravel-vs-pavers-patio": [
    { question: "Which option is usually better?", answer: "It depends on your use case — read the comparison table in gravel vs pavers patio and match the material to the job." },
    { question: "Can I use both?", answer: "Sometimes a hybrid approach works, such as fill dirt under a topsoil cap or blinds under curtains." },
    { question: "What should I calculate next?", answer: "After you choose a material, estimate quantity with the matching Yardwise calculator or related how-to guide." }
  ],
  "how-much-paint-do-i-need": [
    { question: "How do I estimate paint gallons?", answer: "Add wall areas, subtract large openings, multiply by coats, then divide by label coverage." },
    { question: "Do textured walls need more paint?", answer: "Yes. Texture increases surface area and usually needs extra product." },
    { question: "Should I buy extra?", answer: "Buying a little extra helps with touch-ups and batch-matching." }
  ],
  "fence-post-spacing-guide": [
    { question: "How far apart should fence posts be?", answer: "Many wood privacy fences use 6–8 feet on center; check local conditions and panel specs." },
    { question: "How deep should posts be set?", answer: "A common guideline is about one-third of post length in the ground, adjusted for frost line and soil." },
    { question: "Do gates need stronger posts?", answer: "Yes. Gate and corner posts usually need extra stiffness or bracing." }
  ],
  "how-much-concrete-for-a-shed-pad": [
    { question: "How thick should a shed pad be?", answer: "Many small shed pads use about 4 inches over a compacted base — confirm for your shed and soil." },
    { question: "Bags or ready-mix?", answer: "Small pads can use bags; larger slabs are often better with ready-mix." },
    { question: "Does the base matter?", answer: "Yes. Poor base prep is a common reason slabs crack or settle." }
  ],
  "weed-barrier-fabric-pros-cons": [
    { question: "Do I need landscape fabric under mulch?", answer: "Not always. Fabric helps in some static beds and under rock, but mulch depth alone is enough for many flower beds." },
    { question: "How often should I refresh mulch?", answer: "Wood mulch is often topped up every 1–3 years as it decomposes." },
    { question: "What depth should I use?", answer: "2–3 inches is a common target for ornamental beds." }
  ]
};
