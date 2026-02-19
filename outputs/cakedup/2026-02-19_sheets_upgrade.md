# Google Sheet Upgrade Guide
**Project:** Cake'd Up — Digital Transformation
**Date:** 2026-02-19 | **Milestone:** MS-001 (due Feb 24)
**For:** AT — step-by-step, no technical background needed

---

```toml
[report.metadata]
project_id  = "cakedup"
report_type = "sheets_upgrade_guide"
date        = "2026-02-19"
milestone   = "MS-001"
```

---

## What We're Building

Your current Google Sheet is a basic tracker. We're upgrading it into a proper order management system with:

1. **Orders Tab** — every order in one row, organized and consistent
2. **Dashboard Tab** — revenue totals, goal tracker, and best-selling day at a glance
3. **Availability Tab** — track which pickup dates still have open slots

This takes about 30–45 minutes to set up. After that, each new order takes 30 seconds to log.

---

## Step 1 — Create the Orders Tab

Open your Google Sheet. Rename the first tab (bottom left) to `Orders`.

Set up these column headers in Row 1 (bold them so they stand out):

| Column | Header | What goes here |
|---|---|---|
| A | Order # | Auto-number: 1, 2, 3... |
| B | Date Ordered | When they placed the order |
| C | Customer Name | First name is fine |
| D | Contact (IG or Phone) | How to reach them |
| E | Order Type | Single / Pair / Custom |
| F | Quantity | How many singles, pairs, or customs |
| G | Price Each | $3 / $5 / $15–$25 |
| H | Order Total | =F2*G2 |
| I | Pickup Date | When they're collecting |
| J | Payment Method | Cash App / Venmo / Cash |
| K | Paid? | Yes / No |
| L | Notes | Flavors, colors, special requests |
| M | Status | Pending / Ready / Delivered |

**Set up the Order Total formula (Column H):**
Click cell H2, type exactly this:
```
=F2*G2
```
Then click H2 again, grab the small blue square in the bottom-right corner, and drag it down to row 100. This auto-calculates every order total.

**Make it pretty:**
- Select Row 1, fill it pink (Format → Cells → Fill color)
- Bold all headers
- Freeze Row 1 (View → Freeze → 1 row) so headers stay visible when you scroll

---

## Step 2 — Create the Dashboard Tab

Click the `+` button at the bottom to add a new tab. Name it `Dashboard`.

Set up these cells:

**In cell A1:** Type `Cake'd Up — Revenue Tracker` (bold, large text)

**Revenue Summary (start in A3):**

| Cell | Label | Formula |
|---|---|---|
| A3 | This Month's Revenue | |
| B3 | *(formula)* | `=SUMIF(Orders!B:B,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Orders!H:H)` |
| A4 | Total Revenue (All Time) | |
| B4 | *(formula)* | `=SUM(Orders!H:H)` |
| A5 | Total Orders (All Time) | |
| B5 | *(formula)* | `=COUNTA(Orders!A:A)-1` |
| A6 | Unpaid Orders | |
| B6 | *(formula)* | `=COUNTIF(Orders!K:K,"No")` |
| A8 | Monthly Goal | |
| B8 | `$350` | (type this in) |
| A9 | Progress to Goal | |
| B9 | *(formula)* | `=B3/B8` |

**Format B9 as a percentage:**
Click B9 → Format → Number → Percent

**Add a progress bar feel:**
Click B9, then Format → Conditional formatting:
- Less than 0.5 → Red background
- Between 0.5 and 0.8 → Yellow background
- Greater than 0.8 → Green background

Now you can see at a glance how close you are to your $350 goal every month.

---

## Step 3 — Create the Availability Tab

Add one more tab. Name it `Availability`.

| Column A | Column B |
|---|---|
| Pickup Date | Slots Taken |

Add upcoming dates in Column A (e.g., Feb 21, Feb 22...). In Column B, use a formula to count how many orders are for that date:

```
=COUNTIF(Orders!I:I, A2)
```

This auto-counts orders by pickup date. You can see at a glance which days are busy. Set a personal rule: max 10–15 cakes per day depending on your capacity. If a date hits your limit, mark it `FULL` in Column C.

---

## Step 4 — Link Google Forms (MS-002 — comes next)

Once your Sheet is set up, the Google Form (next milestone) will automatically add new rows to the Orders tab every time a customer places an order. You'll only need to fill in:
- Column K (Paid? — check when money arrives)
- Column M (Status — Pending → Ready → Delivered)
- Column G (Price — if it's a custom order with a negotiated price)

Everything else comes in automatically from the form.

---

## Quick Reference Card

Print this or save it to your phone:

```
NEW ORDER → Log in Orders tab
  - Fill A through L
  - Status = "Pending"

WHEN BAKING → Status = "Ready"

WHEN DELIVERED → Status = "Delivered", Paid? = "Yes"

EVERY WEEK → Check Dashboard tab
  - How close am I to $350 goal?
  - How many unpaid orders?

BEFORE ACCEPTING ORDER → Check Availability tab
  - Is the pickup date open?
```

---

## When MS-001 is Complete

Your sheet is upgraded when:
- ✅ Orders tab has all 13 columns with formulas working
- ✅ Dashboard shows This Month's Revenue and goal progress
- ✅ Availability tab shows pickup date counts
- ✅ You've entered your last 3–5 real orders to test it

Mark MS-001 complete and move on to MS-002 (Google Forms) and MS-003 (Canva brand kit) — you can do both of those at the same time.

---

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-CAK-002"
category    = "technical"
pattern     = "free_tool_stack_for_micro_business"
observation = "Google Sheets + Google Forms is a zero-cost order management system that rivals paid tools for businesses under 20 orders/week. The key is structuring the Sheet as a proper database (one row = one order, no merged cells, consistent column types) so formulas and future integrations work cleanly."
action      = "For any micro-business digitization project with a $0 tool budget, design the Google Sheet as a proper relational structure first. The form and dashboard follow from the schema — not the other way around."
severity    = "low"
phase       = "build_out"
project_type_applicable = ["non-technical", "mixed"]
scale_applicable        = ["hello_world", "small"]
```

---

*Generated by: TPM Agent — Cake'd Up | tpm run cakedup*
