import type { MaterialCopy } from "@/types/calculator";

export const mulchCopy: MaterialCopy = {
  id: "mulch",
  name: "mulch",
  title: "Mulch Calculator",
  description:
    "Find out how much mulch your garden beds need anywhere in the world — bags or bulk, imperial or metric.",
  requiredLabel: "Estimated mulch required",
  depthTooltip:
    "Many garden beds use about 2–3 inches (5–7.5 cm) of mulch. Adjust to match your project and local guidance.",
  wasteTooltip:
    "A small allowance helps cover irregular edges, settling, and uneven coverage when spreading mulch.",
  bagSizeHint: "Common bag sizes include 1.5, 2, and 3 cubic feet (check local packaging).",
  summaryTitle: "Yardwise Mulch Shopping Summary",
  formulaBlurb:
    "Formula: cubic yards = area (sq ft) × depth (in) ÷ 324. Metric: m³ = area (m²) × depth (m).",
  buyHint: "Small beds are usually easiest with bags; larger jobs often favor bulk delivery.",
};

export const topsoilCopy: MaterialCopy = {
  id: "topsoil",
  name: "topsoil",
  title: "Topsoil Calculator",
  description:
    "Estimate how much topsoil you need to fill garden beds, raise grade, or refresh planting areas — in bags or bulk, with imperial or metric units.",
  requiredLabel: "Estimated topsoil required",
  depthTooltip:
    "New garden beds often use about 4–8 inches (10–20 cm) of topsoil. Lawn top-dressing is usually much shallower (about 1 inch / 2.5 cm).",
  wasteTooltip:
    "Topsoil settles after spreading and watering. A 5–10% allowance helps avoid shortfalls on larger fills.",
  bagSizeHint: "Bagged topsoil is commonly sold around 0.75–1 cubic foot — check your product label.",
  summaryTitle: "Yardwise Topsoil Shopping Summary",
  formulaBlurb:
    "Formula: cubic yards = area (sq ft) × depth (in) ÷ 324. Metric: m³ = area (m²) × depth (m).",
  buyHint: "Touch-ups suit bags; bed fills of a cubic yard or more usually favor bulk.",
};

export const compostCopy: MaterialCopy = {
  id: "compost",
  name: "compost",
  title: "Compost Calculator",
  description:
    "Estimate how much compost you need to amend garden beds or top-dress planting areas — bags or bulk, imperial or metric.",
  requiredLabel: "Estimated compost required",
  depthTooltip:
    "Garden bed amendments often use about 1–3 inches (2.5–7.5 cm) of compost worked into the soil or spread as a top dressing.",
  wasteTooltip:
    "A small allowance helps cover uneven spreading and settling when working compost into beds.",
  bagSizeHint: "Bagged compost is commonly sold around 1 cubic foot — check your product label.",
  summaryTitle: "Yardwise Compost Shopping Summary",
  formulaBlurb:
    "Formula: cubic yards = area (sq ft) × depth (in) ÷ 324. Metric: m³ = area (m²) × depth (m).",
  buyHint: "Seasonal top-ups are often bagged; larger bed amendments may be cheaper in bulk.",
};

export const gravelCopy: MaterialCopy = {
  id: "gravel",
  name: "gravel",
  title: "Gravel Calculator",
  description:
    "Estimate how much gravel you need for paths, borders, and decorative beds — bags or bulk, with volume and approximate weight.",
  requiredLabel: "Estimated gravel required",
  depthTooltip:
    "Garden paths and decorative gravel beds often use about 2–4 inches (5–10 cm). Driveways usually need a deeper base — edit the depth for your project.",
  wasteTooltip:
    "Gravel settles and fills uneven bases. A 5–10% allowance helps avoid shortfalls after compaction.",
  bagSizeHint: "Bagged pea gravel and decorative stone are commonly sold around 0.5 cubic feet — check your product label.",
  summaryTitle: "Yardwise Gravel Shopping Summary",
  formulaBlurb:
    "Formula: cubic yards = area (sq ft) × depth (in) ÷ 324. Weight uses ~1.4 US tons per cubic yard (≈1.5 t/m³) as a planning average.",
  buyHint: "Short borders suit bags; paths and driveways are usually ordered in bulk by the yard or tonne.",
};

export const peaGravelCopy: MaterialCopy = {
  id: "pea-gravel",
  name: "pea gravel",
  title: "Pea Gravel Calculator",
  description:
    "Estimate pea gravel for paths, patios, and decorative beds — cubic yards, bags, and approximate tons or tonnes.",
  requiredLabel: "Estimated pea gravel required",
  depthTooltip:
    "Pea gravel paths and decorative layers often use about 2–3 inches (5–7.5 cm). Deeper layers may need edging to keep stones in place.",
  wasteTooltip:
    "Allow a little extra for settling and edges. Pea gravel shifts underfoot, so a 5–10% buffer is common.",
  bagSizeHint: "Bagged pea gravel is often sold around 0.5 cubic feet — confirm on the package.",
  summaryTitle: "Yardwise Pea Gravel Shopping Summary",
  formulaBlurb:
    "Same volume formula as other landscape stone: sq ft × inches ÷ 324 (or m² × depth in metres). Weight is approximate.",
  buyHint: "Small patio accents are often bagged; longer paths usually favor bulk delivery.",
};

export const drivewayGravelCopy: MaterialCopy = {
  id: "driveway-gravel",
  name: "driveway gravel",
  title: "Gravel Driveway Calculator",
  description:
    "Estimate gravel for driveway surfaces and base layers — volume, bags, and approximate tons or tonnes for ordering.",
  requiredLabel: "Estimated driveway gravel required",
  depthTooltip:
    "Driveway surface refreshes often use about 2–4 inches (5–10 cm). New driveways may need a deeper base — follow local construction guidance.",
  wasteTooltip:
    "Compaction and uneven sub-base make a 10–15% allowance useful for driveway projects.",
  bagSizeHint: "Driveways are rarely finished with retail bags; keep bag size for small repairs only.",
  summaryTitle: "Yardwise Gravel Driveway Shopping Summary",
  formulaBlurb:
    "Volume: sq ft × inches ÷ 324 (or m² × m). Approximate weight helps when suppliers quote by the ton or tonne.",
  buyHint: "Driveway quantities almost always favor bulk delivery priced by the yard or tonne.",
};
