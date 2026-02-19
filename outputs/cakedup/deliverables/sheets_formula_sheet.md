# Google Sheet — Formula Sheet
**Project:** Cake'd Up | **Milestone:** MS-001
**For:** AT — open your Google Sheet, go to each cell, type the formula exactly. Copy/paste works.

---

## Step 1 — Import the Template

1. Go to **sheets.google.com** → open your existing sheet (or create a new one)
2. File → Import → Upload → select `order_tracker_template.csv` (from this folder)
3. Import location: **Replace current sheet**
4. Click **Import data**

Your column headers are now in Row 1. The sample order is in Row 2 — delete it after you've checked it looks right.

---

## Step 2 — Rename Tabs

- Tab 1 (bottom left): rename to `Orders`
- Click `+` → rename to `Dashboard`
- Click `+` → rename to `Availability`

---

## Step 3 — Orders Tab Formulas

**Column H (Order Total) — paste in H2, then drag to H200:**
```
=IF(F2="","",F2*G2)
```
*The IF wrapper keeps the cell blank when there's no order in that row.*

**How to drag the formula:**
Click H2 → grab the small blue square in the bottom-right corner of the cell → drag down to row 200.

**Column G (Price Each) — dropdown validation:**
1. Click the G column header to select the whole column
2. Data → Data validation → Add rule
3. Criteria: **Dropdown**
4. Options: `3` · `5` · `7` · `10` · `12` · `15`
5. Click Done

Now AT can pick the price from a dropdown instead of typing it.

**Column E (Order Type) — dropdown validation:**
1. Select Column E
2. Data → Data validation → Add rule → Dropdown
3. Options: `Single` · `Pair` · `3-Pack` · `5-Pack` · `Birthday Pack`

**Column K (Paid?) — dropdown:**
Options: `Yes` · `No`

**Column M (Status) — dropdown:**
Options: `Pending` · `Ready` · `Delivered`

**Color the header row pink:**
Click Row 1 header → Format → Fill color → pick pink `#F472B6` → make text white and bold.

**Freeze Row 1:**
View → Freeze → 1 row

---

## Step 4 — Dashboard Tab Formulas

Click the `Dashboard` tab. Enter this exactly:

| Cell | Type this |
|---|---|
| A1 | `Cake'd Up — Revenue Tracker` (bold, size 18) |
| A3 | `This Month's Revenue` |
| B3 | `=SUMIF(Orders!B:B,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Orders!H:H)` |
| A4 | `Total Revenue (All Time)` |
| B4 | `=SUM(Orders!H:H)` |
| A5 | `Total Orders` |
| B5 | `=COUNTA(Orders!A:A)-1` |
| A6 | `Unpaid Orders` |
| B6 | `=COUNTIF(Orders!K:K,"No")` |
| A7 | `Avg Order Value` |
| B7 | `=IFERROR(B4/B5,"—")` |
| A9 | `Monthly Goal` |
| B9 | `350` (just the number) |
| A10 | `Progress to Goal` |
| B10 | `=IFERROR(B3/B9,0)` |

**Format B10 as percentage:**
Click B10 → Format → Number → Percent

**Add color to B10 (traffic light):**
Click B10 → Format → Conditional formatting → Add rule:
- Rule 1: Less than `0.5` → Background red `#F87171`
- Rule 2: Between `0.5` and `0.8` → Background yellow `#FCD34D`
- Rule 3: Greater than or equal to `0.8` → Background green `#34D399`

**Format B3 and B4 as currency:**
Click B3, hold Shift, click B4 → Format → Number → Currency

---

## Step 5 — Availability Tab

Click the `Availability` tab.

**Row 1 headers:**
| A1 | B1 | C1 |
|---|---|---|
| `Pickup Date` | `Orders Booked` | `Status` |

**Starting in A2, add the next 14 days:**
Type the date in A2, then in A3 type `=A2+1`, drag that down to A15. This auto-fills two weeks of dates.

**In B2, type this formula, then drag to B15:**
```
=COUNTIF(Orders!I:I,A2)
```

**In C2, type this formula, then drag to C15:**
```
=IF(B2>=10,"FULL",IF(B2>=7,"Almost Full","Open"))
```
*(Change 10 to whatever your daily max is — 10 is just a starting point)*

**Color C column with conditional formatting:**
- `FULL` → red background
- `Almost Full` → yellow background
- `Open` → green background

---

## What Your Sheet Looks Like When It's Done

**Orders tab:**
```
# │ Date │ Name │ Contact │ Type  │ Qty │ Price │ Total │ Pickup │ Payment │ Paid? │ Notes │ Status
──┼──────┼──────┼─────────┼───────┼─────┼───────┼───────┼────────┼─────────┼───────┼───────┼────────
1 │ 2/20 │ Maya │ @mayaIG │ Pair  │  1  │   5   │   5   │  2/21  │ Cash App│  No   │       │Pending
2 │ 2/20 │ Zara │ @zaraIG │ 3-Pack│  1  │   7   │   7   │  2/21  │ Venmo   │  Yes  │choc   │Pending
```

**Dashboard tab:**
```
Cake'd Up — Revenue Tracker

This Month's Revenue     $12.00
Total Revenue (All Time) $62.00
Total Orders              22
Unpaid Orders              1
Avg Order Value           $2.82

Monthly Goal             $350
Progress to Goal          3% 🔴
```

**Availability tab:**
```
Pickup Date   Orders Booked   Status
Feb 20            2           Open
Feb 21            8           Almost Full
Feb 22            0           Open
```

---

## MS-001 Done When:

```
☐  CSV imported — 13 column headers in Row 1
☐  H column formula calculates Order Total automatically
☐  E, G, K, M columns have dropdowns
☐  Header row is pink and frozen
☐  Dashboard tab shows This Month's Revenue
☐  Dashboard B10 shows progress to $350 goal with color
☐  Availability tab counts orders per date
☐  Entered last 3–5 real orders to confirm everything works
```

---

*Produced by: TPM Agent — Cake'd Up | tpm run cakedup*
