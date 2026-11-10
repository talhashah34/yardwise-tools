import type { Guide } from "./types";

export const guidePart0: Guide[] = [
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
    slug: "how-deep-should-mulch-be",
    title: "How Deep Should Mulch Be?",
    description:
      "Practical mulch depth ranges for weed control, moisture retention, and healthy plant roots.",
    keywords: ["mulch depth calculator", "how deep should mulch be", "mulch depth"],
    readingTime: "5 min",
    updated: "2026-03-20",
    content: `
## Recommended depth ranges

For most ornamental beds, landscapers and extension services commonly recommend about **2 to 3 inches** (roughly 5 to 7.5 cm) of organic mulch after it settles.

That range is a practical starting point — not a universal rule. Depth depends on mulch type, plant needs, soil conditions, and whether you are refreshing an existing layer.

## Why depth matters

Too little mulch may not suppress weeds or conserve moisture effectively. Too much mulch can stay overly wet, encourage pests in some climates, and smother shallow-rooted plants.

A few principles hold up well:

- Keep mulch a few inches away from tree trunks and plant stems.
- Do not pile mulch into “volcanoes” against bark.
- Refresh thin spots rather than repeatedly burying older layers under thick new ones.

## Depth by project type

| Situation | Typical starting depth |
| --- | --- |
| Established shrub and perennial beds | 2–3 inches |
| New beds over bare soil | Closer to 3 inches |
| Top-up over existing mulch | Often 1 inch or less |
| Pathways (coarse bark/wood chips) | May be deeper for traffic |

Fine mulches compact more than coarse chips. If you are using a fine product, err toward the lower end of the range and reassess after the first season.

## Existing mulch

If last year’s mulch still covers the soil, measure what remains. You only need enough additional material to restore your target depth. The Yardwise calculator supports an “existing depth” field for exactly this case.

## Putting depth into a shopping list

Once you choose a depth, convert area and depth into volume with the standard formula, then round bags upward. Explore depths interactively in the [Mulch Calculator](/tools/mulch-calculator).

## References

- Many US Cooperative Extension publications recommend roughly 2–4 inches of organic mulch for landscape beds, with plant-by-plant adjustments. Treat manufacturer and local extension guidance as the final authority for your region and product.
`.trim(),
  },
  {
    slug: "how-many-bags-of-mulch-in-a-cubic-yard",
    title: "How Many Bags of Mulch Are in a Cubic Yard?",
    description:
      "Convert cubic yards to bag counts using real bag sizes — and avoid common rounding mistakes.",
    keywords: ["mulch bags calculator", "bags of mulch in a cubic yard"],
    readingTime: "4 min",
    updated: "2026-03-20",
    content: `
## The conversion

One cubic yard equals **27 cubic feet**.

Bag count depends entirely on the bag size printed on the packaging:

| Bag size | Bags per cubic yard (exact) | Bags to buy (round up) |
| --- | --- | --- |
| 1 cubic foot | 27 | 27 |
| 1.5 cubic feet | 18 | 18 |
| 2 cubic feet | 13.5 | 14 |
| 3 cubic feet | 9 | 9 |

## Why rounding matters

If your project needs 0.93 cubic yards of mulch, that is about 25 cubic feet. With 2-cubic-foot bags:

25 ÷ 2 = 12.5 → purchase **13 bags**

You cannot buy half a bag at most garden centers, so the calculator always rounds purchase quantities up while still showing the exact mathematical quantity.

## Bulk deliveries

Bulk mulch is usually sold by the cubic yard. For larger beds, bulk can reduce packaging waste and trips to the store — but delivery fees and minimum order sizes matter. Enter your local prices in the [Mulch Calculator](/tools/mulch-calculator) to compare options without guessing market rates.

## Common mistake

People sometimes confuse cubic feet of volume with bag counts. Twenty-five cubic feet is not automatically twenty-five bags. Always divide by the bag size first.
`.trim(),
  },
  {
    slug: "mulch-bags-vs-bulk",
    title: "Mulch Bags vs Bulk Mulch: Which Is Better?",
    description:
      "Compare convenience, cost drivers, storage, and project size when choosing bagged or bulk mulch.",
    keywords: ["mulch bags vs bulk", "bagged mulch", "bulk mulch"],
    readingTime: "6 min",
    updated: "2026-03-20",
    content: `
## Quick comparison

| Factor | Bagged mulch | Bulk mulch |
| --- | --- | --- |
| Best for | Small beds, touch-ups, limited storage | Larger projects |
| Transport | Fits in a car | Usually needs delivery or a truck |
| Pricing | Per bag | Per cubic yard + delivery |
| Flexibility | Easy to buy exactly what you need today | Often sold in larger minimums |
| Packaging | Plastic bags to dispose of or recycle | Little or no bag waste |

## When bags make sense

Bagged mulch is ideal when you are refreshing a few beds, experimenting with color or texture, or cannot accept a bulk drop in the driveway. Bags also store more neatly if a project spans several weekends.

## When bulk makes sense

Once your estimate climbs past several cubic yards, bulk often becomes more practical. You move material with a wheelbarrow instead of lifting dozens of bags, and you avoid a mountain of empty packaging.

Delivery fees can change the math. A lower per-yard price may still cost more overall once delivery is included — which is why Yardwise lets you add a delivery fee before comparing totals.

## How to decide with numbers

1. Calculate the volume you need.
2. Convert to bags using your actual bag size.
3. Enter the price per bag, price per cubic yard, and delivery fee.
4. Compare the estimated totals.

Run that comparison in the [Mulch Calculator](/tools/mulch-calculator). The tool only shows cost comparisons when you provide the relevant prices — it never invents local market rates.
`.trim(),
  },
  {
    slug: "how-to-measure-an-irregular-garden-bed",
    title: "How to Measure an Irregular Garden Bed",
    description:
      "Break curved and freeform beds into rectangles, triangles, and circles for a reliable mulch estimate.",
    keywords: ["garden bed mulch calculator", "measure irregular garden bed"],
    readingTime: "5 min",
    updated: "2026-03-20",
    content: `
## Don’t force one imperfect measurement

Irregular beds are common: kidney shapes, curved borders, beds wrapping around trees. The most accurate DIY approach is to divide the bed into simpler shapes, measure each piece, and add the areas.

## A practical method

1. Sketch the bed roughly on paper.
2. Split it into rectangles, triangles, and circular segments.
3. Measure each piece with a tape measure.
4. Calculate each area, then sum them.
5. Apply your desired mulch depth to the total area.

### Example

A curved border might be approximated as:

- one 12 × 4 ft rectangle (48 sq ft)
- one triangle with base 6 ft and height 4 ft (12 sq ft)
- one circular section approximated with an 8 ft diameter half-circle (about 25 sq ft)

Total ≈ 85 sq ft. At 3 inches deep:

(85 × 3) ÷ 324 ≈ 0.79 cubic yards.

## Tips for better measurements

- Measure the planting area inside edging, not the lawn beyond it.
- For gentle curves, average the widest and narrowest widths of a strip.
- Walk the perimeter with a measuring wheel if the bed is large.
- When in doubt, slightly overestimate area rather than under-buy mid-project — or use a waste allowance.

## Use multiple beds in the calculator

Yardwise lets you add several beds with different shapes in one estimate. Model each simplified section as its own bed, name them clearly, and the total updates live in the [Mulch Calculator](/tools/mulch-calculator).
`.trim(),
  },
  {
    slug: "how-much-topsoil-do-i-need",
    title: "How Much Topsoil Do I Need?",
    description:
      "Estimate topsoil for new beds, grade fills, and top-dressing using the same reliable volume formula landscapers use.",
    keywords: [
      "how much topsoil do I need",
      "topsoil calculator",
      "cubic yards of topsoil",
    ],
    readingTime: "6 min",
    updated: "2026-03-20",
    content: `
## The short answer

Topsoil quantity is a volume estimate: measure the area, choose a fill depth, then convert to cubic yards (or cubic metres) and bag counts.

For US measurements:

**Cubic yards = (area in square feet × depth in inches) ÷ 324**

That is the same practical formula used for mulch and other landscape fills. One cubic yard equals 27 cubic feet.

## Worked example

A new rectangular bed is 10 feet by 10 feet (100 square feet). You want 6 inches of topsoil:

- 100 × 6 = 600
- 600 ÷ 324 ≈ **1.85 cubic yards**
- 1.85 × 27 ≈ **50 cubic feet**

If bags hold 1 cubic foot each:

- 50 ÷ 1 = **50 bags** before any waste allowance

With a 10% settling allowance:

- 1.85 × 1.10 ≈ **2.04 cubic yards**
- about **55** one-cubic-foot bags after rounding up

## Typical depth starting points

Depth depends on the job — these are planning ranges, not prescriptions:

| Project | Typical starting depth |
| --- | --- |
| New ornamental garden bed | About 4–8 inches |
| Raised bed fill (partial) | Often deeper — measure the void |
| Lawn top-dressing | Often about 0.5–1 inch |
| Leveling low spots | Measure the average fill needed |

Always match soil type and drainage to the plants you intend to grow. Screened topsoil, garden mix, and fill dirt are not interchangeable products.

## Bags vs bulk

Small beds and touch-ups are often easier with bags. Larger fills usually favor bulk delivery sold by the cubic yard. Bag labels vary — many consumer topsoil bags are near 0.75–1 cubic foot, so check the package before converting volumes.

Use the [Topsoil Calculator](/tools/topsoil-calculator) to compare bagged and bulk options with your own prices and an optional waste allowance for settling.

## References

- University extension and landscaping references commonly present the square-feet × inches ÷ 324 method for landscape material volume. Product composition and compaction still affect real-world coverage, so treat calculator results as planning estimates.
`.trim(),
  }
];
