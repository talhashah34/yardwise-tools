export interface Guide {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  readingTime: string;
  updated: string;
  content: string;
}

export const guides: Guide[] = [
  {
    slug: "how-much-mulch-do-i-need",
    title: "How Much Mulch Do I Need?",
    description:
      "Use a simple volume formula to estimate mulch for rectangular, circular, and irregular garden beds.",
    keywords: ["how much mulch do I need", "mulch coverage calculator", "cubic yards of mulch"],
    readingTime: "6 min",
    updated: "2026-03-20",
    content: `
## The short answer

Mulch quantity is a volume problem: measure the area you want to cover, choose a depth, then convert that into cubic yards (or cubic metres) and bag counts.

For US measurements, the standard landscaping formula is:

**Cubic yards = (area in square feet × depth in inches) ÷ 324**

Why 324? One cubic yard is 27 cubic feet. Dividing depth in inches by 12 converts inches to feet, so:

(area × depth inches ÷ 12) ÷ 27 = area × depth ÷ 324.

## A worked example

Imagine a rectangular bed that is 10 feet by 10 feet (100 square feet) and you want 3 inches of mulch:

- 100 × 3 = 300
- 300 ÷ 324 ≈ **0.93 cubic yards**
- 0.93 × 27 ≈ **25 cubic feet**

If you buy 2-cubic-foot bags, divide cubic feet by bag size and round up:

- 25 ÷ 2 = 12.5 → buy **13 bags**

Exact math gives the volume; shopping requires whole bags, so always round purchase quantities up.

## Shape shortcuts

- **Rectangle:** length × width
- **Circle:** π × (diameter ÷ 2)²
- **Triangle:** (base × height) ÷ 2

For multiple beds, calculate each bed separately and add the volumes together. That approach is more accurate than forcing everything into one oversized rectangle.

## Metric equivalent

In metric units:

**Cubic metres = area in square metres × depth in metres**

A 5 cm depth is 0.05 metres. A 12 m² bed at 5 cm needs 0.6 m³ of mulch before any waste allowance.

## Practical tips

1. Measure the planting area, not the entire yard.
2. Subtract existing mulch depth if you are only topping up.
3. Add a small waste allowance (often around 5%) for edges and settling.
4. Confirm bag size on the package — 1.5, 2, and 3 cubic feet are all common.

Use the [Yardwise Mulch Calculator](/tools/mulch-calculator) to run these numbers for several beds at once, with bagged and bulk estimates side by side.

## References

- Cooperative Extension guidance commonly presents the square-feet × inches ÷ 324 method for landscape mulch volume (for example, university extension publications on mulching). Always check packaging and local supplier coverage charts for product-specific notes.
`.trim(),
  },
  {
    slug: "how-much-mulch-for-flower-beds",
    title: "How Much Mulch for Flower Beds? (U.S. Cubic Yards & Bags)",
    description:
      "U.S. homeowners guide to calculating mulch for flower beds: cubic yards formula, bag counts, depth tips, and what to buy before you spread.",
    keywords: [
      "how much mulch for flower beds",
      "mulch calculator flower bed",
      "how many bags of mulch for flower bed",
      "cubic yards of mulch flower bed",
      "mulch depth flower beds",
    ],
    readingTime: "8 min",
    updated: "2026-11-10",
    content: `
## The short answer for U.S. flower beds

For most American flower beds, plan on **2–3 inches of mulch**. Then use this formula:

**Cubic yards = (length ft × width ft × depth inches) ÷ 324**

That is the standard U.S. landscaping volume formula. After you have cubic yards, convert to bags:

**Bags = (cubic yards × 27) ÷ bag size in cubic feet**, then round up.

If you want the fastest path, skip the hand math and open the [Yardwise Mulch Calculator](/tools/mulch-calculator) with imperial units selected.

## Why flower beds are calculated differently than lawn strips

Flower beds usually have curved edges, plant spacing, and mixed depths near crowns. A single “guess at Home Depot” often wastes money. Break the bed into rectangles and circles, calculate each piece, then add them.

Example for a common suburban bed:

- Rectangle section: 12 ft × 4 ft at 3 inches  
- 12 × 4 × 3 = 144  
- 144 ÷ 324 ≈ **0.44 cubic yards**  
- 0.44 × 27 ≈ **12 cubic feet**  
- In 2 cu ft bags: 12 ÷ 2 = **6 bags** (buy 7 if edges are messy)

## Recommended mulch depth in the United States

| Bed type | Typical depth | Notes |
| --- | --- | --- |
| Annual / perennial flower beds | 2–3 in | Most common homeowner target |
| Around shrubs | 2–3 in | Keep mulch off stems |
| New beds over bare soil | 3 in | Better weed suppression |
| Top-up over existing mulch | 1–2 in | Measure what is already there |

Do **not** volcano-mulch against trunks or stems. Leave a small clear ring around plant bases.

## Bags vs bulk for flower beds

- **Under ~1 cubic yard:** bags are usually easier in the U.S. (pickup truck optional)  
- **1–3+ cubic yards:** bulk delivery often wins on price  
- City lots / HOA beds: bags reduce mess and leftover piles  

Read more in [Mulch Bags vs Bulk](/guides/mulch-bags-vs-bulk), then confirm totals in the calculator.

## Tools that make flower-bed mulching easier

Before you buy mulch, these Amazon picks help you measure and install cleanly (affiliate links):

- [Zozen measuring wheel](https://www.amazon.com/dp/B07R9S71J7?tag=yardwise20-20) for bed lengths and borders  
- [ECOgardener landscape fabric](https://www.amazon.com/dp/B06W2J76W3?tag=yardwise20-20) if you want a weed barrier under decorative mulch  
- [Landscape fabric pins kit](https://www.amazon.com/dp/B0FCRZXFHW?tag=yardwise20-20) to secure fabric before spreading  

As an Amazon Associate, Yardwise earns from qualifying purchases.

## Step-by-step: measure, calculate, buy

1. Sketch the bed and split odd shapes into rectangles/circles.  
2. Measure length and width in **feet**.  
3. Choose depth in **inches** (start with 3 inches for new beds).  
4. Run each section in the [Mulch Calculator](/tools/mulch-calculator).  
5. Add about **5% waste** for edges and settling.  
6. Buy whole bags or schedule bulk delivery.  
7. Install fabric/pins if using a barrier, then spread and rake level.

## Common U.S. flower-bed mistakes

- Ordering by “looks like enough” instead of cubic yards  
- Using one big rectangle for a curved bed (overbuys)  
- Buying the wrong bag size (1.5 vs 2 vs 3 cu ft)  
- Putting mulch too deep and smothering perennials  

## CTA: get your exact bag count now

Open the free [Yardwise Mulch Calculator](/tools/mulch-calculator), enter each U.S. flower bed in feet and inches, and get cubic yards plus bagged vs bulk guidance in one pass. Then buy only what you need.
`.trim(),
  },
  {
    slug: "how-deep-should-a-gravel-driveway-be",
    title: "How Deep Should a Gravel Driveway Be? (U.S. Depth Guide)",
    description:
      "U.S. gravel driveway depth guide for base and surface layers, plus how to convert depth into cubic yards and tons before you order stone.",
    keywords: [
      "how deep should a gravel driveway be",
      "gravel driveway depth",
      "gravel driveway base depth",
      "how much gravel for driveway",
      "gravel driveway cubic yards",
    ],
    readingTime: "9 min",
    updated: "2026-11-10",
    content: `
## Short answer for U.S. driveways

Most residential gravel driveways in the United States work best with about **4–6 inches of total stone depth**, often built as:

- **Base layer:** 3–4 inches of larger crushed stone  
- **Surface layer:** 1–2 inches of smaller driveway gravel  

Exact specs vary by soil, climate, and local contractor practice. Soft clay, freeze-thaw states, and heavy vehicles usually need a stronger base.

When you know length, width, and depth, convert to volume:

**Cubic yards = (length ft × width ft × depth inches) ÷ 324**

Then use the [Gravel Driveway Calculator](/tools/gravel-driveway-calculator) for cubic yards and approximate tons.

## Recommended depth ranges (homeowner planning)

| Layer | Common U.S. range | Purpose |
| --- | --- | --- |
| Compacted subgrade | N/A | Smooth, drained soil base |
| Crushed stone base | 3–4 in | Strength and drainage |
| Driveway surface gravel | 1–2 in | Traction and finish |
| Total stone depth | 4–6 in | Typical residential build |

Decorative “pretty gravel only” with no base often ruts fast, especially after spring thaw or summer storms.

## Worked U.S. example

Driveway: **50 ft long × 10 ft wide**, surface gravel at **2 inches** (top-up only):

- 50 × 10 × 2 = 1,000  
- 1,000 ÷ 324 ≈ **3.09 cubic yards**

If you are building a new **4-inch** section over the same footprint:

- 50 × 10 × 4 = 2,000  
- 2,000 ÷ 324 ≈ **6.17 cubic yards**

U.S. suppliers often quote gravel by the **ton** as well as the yard. Density varies by stone type, so treat ton estimates as planning numbers and confirm with your quarry.

## Depth vs climate and traffic

- **Northern freeze-thaw:** prioritize drainage and a real base  
- **Sandy/well-drained sites:** may need less corrective work, not zero depth  
- **Truck/trailer parking:** go deeper / stronger base  
- **Steep grades:** ask a local contractor; depth alone will not stop washouts  

## Measure once, order once

Use a tape or [measuring wheel](https://www.amazon.com/dp/B07R9S71J7?tag=yardwise20-20) for length and width in feet. For new installs, many DIYers also use [landscape fabric](https://www.amazon.com/dp/B06W2J76W3?tag=yardwise20-20) and [fabric pins](https://www.amazon.com/dp/B0FCRZXFHW?tag=yardwise20-20) under decorative layers where appropriate (follow local practice for structural bases).

As an Amazon Associate, Yardwise earns from qualifying purchases.

## CTA: calculate driveway gravel before you call the quarry

1. Measure length and width in feet.  
2. Choose base depth and surface depth in inches.  
3. Run both layers in the [Gravel Driveway Calculator](/tools/gravel-driveway-calculator).  
4. Compare with [How many tons of gravel do I need?](/guides/how-many-tons-of-gravel-do-i-need).  
5. Order with a small contingency for compaction and uneven subgrade.

Get a planning estimate now with the free [Yardwise Gravel Driveway Calculator](/tools/gravel-driveway-calculator) — built for U.S. feet/inches inputs and tons guidance.
`.trim(),
  },
  {
    slug: "fill-dirt-vs-topsoil",
    title: "Fill Dirt vs Topsoil: What U.S. Homeowners Should Buy",
    description:
      "Clear U.S. comparison of fill dirt vs topsoil vs garden soil: when to use each, how to calculate cubic yards, and what to buy for lawns, beds, and grading.",
    keywords: [
      "fill dirt vs topsoil",
      "difference between fill dirt and topsoil",
      "when to use fill dirt",
      "how much topsoil do I need",
      "garden soil vs topsoil",
    ],
    readingTime: "8 min",
    updated: "2026-11-10",
    content: `
## Quick U.S. answer

- **Fill dirt:** for raising grade, filling holes, and building up low spots. Low organic matter. Not ideal as the final planting surface.  
- **Topsoil:** for lawns, garden beds, and the upper planting layer. Higher quality screened soils cost more.  
- **Garden soil / raised-bed mixes:** blended products for planting, often with compost.

If your project is “make the yard higher,” start with fill. If your project is “grow grass or plants,” finish with topsoil. Many U.S. jobs need **both**: fill for bulk elevation, then a topsoil cap.

## Side-by-side comparison

| Material | Best use | Typical homeowner project |
| --- | --- | --- |
| Fill dirt | Bulk elevation / rough grade | Filling a low corner before sod |
| Topsoil | Planting layer | New lawn, flower beds, bare spots |
| Compost | Amendment, not bulk fill | Mixing into existing soil |
| Garden soil blend | Raised beds / planting boxes | Vegetable beds |

Using expensive topsoil as deep fill is one of the most common budget mistakes at U.S. landscape yards.

## How much do you need? (cubic yards)

U.S. formula:

**Cubic yards = (sq ft × depth inches) ÷ 324**

Example: 20 ft × 15 ft area, add **3 inches** of topsoil:

- Area = 300 sq ft  
- 300 × 3 = 900  
- 900 ÷ 324 ≈ **2.78 cubic yards**

Run it live in the [Topsoil Calculator](/tools/topsoil-calculator). For amendments only, use the [Compost Calculator](/tools/compost-calculator).

## Recommended depths for common U.S. projects

| Project | Typical material | Common depth |
| --- | --- | --- |
| Leveling before sod | Topsoil over graded base | 2–4 in |
| Bare lawn repair patches | Topsoil | 1–2 in |
| New planting beds | Topsoil / mix | 4–8 in depending on plants |
| Raising a low yard area | Fill dirt + topsoil cap | Fill as needed + 2–3 in topsoil |
| Raised bed refill | Garden soil / mix | Based on bed height |

Always ask your local supplier what “fill,” “screened topsoil,” and “garden mix” mean in your metro area — naming is not standardized nationwide.

## Test before you spend

If plants struggled last season, a basic [soil test kit](https://www.amazon.com/dp/B00BMAXMRA?tag=yardwise20-20) can tell you whether you need compost, lime, or just better topsoil. Measure areas with a tape or [measuring wheel](https://www.amazon.com/dp/B07R9S71J7?tag=yardwise20-20) so you do not under-order.

As an Amazon Associate, Yardwise earns from qualifying purchases.

## Decision checklist

1. Are you fixing **grade/drainage elevation**? → fill dirt first.  
2. Are you **growing turf or plants** on top? → add topsoil.  
3. Are you only improving existing soil? → compost may be enough.  
4. Calculate cubic yards before you call the dump truck.  

## CTA: calculate your topsoil order now

Use the free [Yardwise Topsoil Calculator](/tools/topsoil-calculator) to convert your U.S. bed or lawn dimensions into cubic yards and bag estimates. Then compare with [How much topsoil do I need?](/guides/how-much-topsoil-do-i-need) and [How much compost do I need?](/guides/how-much-compost-do-i-need) before you buy.
`.trim(),
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}
