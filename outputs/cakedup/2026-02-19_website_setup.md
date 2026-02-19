# Website Setup Guide
**Project:** Cake'd Up — Digital Transformation
**Date:** 2026-02-19 | **Milestone:** MS-004 (due Mar 4)
**Platform:** Google Sites (free) | **For:** AT

---

```toml
[report.metadata]
project_id  = "cakedup"
report_type = "website_setup_guide"
date        = "2026-02-19"
milestone   = "MS-004"
```

---

## Before You Build the Website

Complete these first — the website needs them:

| Done? | What | Why |
|---|---|---|
| ☐ | MS-001 — Google Sheet upgraded | Order form will link to it |
| ☐ | MS-002 — Google Form order form created | Embedded in website |
| ☐ | MS-003 — Canva brand kit ready | Colors, logo, graphics for the site |
| ☐ | FU-003 — Cash App / Venmo handle confirmed | Payment info goes on every page |
| ☐ | 5+ cake photos taken | Gallery and hero image |

Don't start the site until all 5 are checked off. A site with missing pieces looks worse than no site at all.

---

## Step 1 — Create Your Canva Brand Kit (MS-003)

*Do this before touching Google Sites.*

**Go to canva.com → Sign up free → Create a design → Logo**

**Your brand palette (fun, girly, professional):**
- Primary: `#F472B6` (hot pink)
- Secondary: `#FEF3C7` (soft cream/yellow)
- Accent: `#D4AF37` (gold)
- Text: `#1F2937` (dark charcoal — readable on light backgrounds)

**Create these 4 things in Canva:**

1. **Logo** — Your business name "Cake'd Up" in a fun script font (try *Pacifico* or *Dancing Script*), with a small cake icon. Save as PNG with transparent background.

2. **Website header/banner** — 1600×400px. Pink background, your logo centered, tagline below: *"Made with love, one slice at a time"* or write your own.

3. **Menu graphic** — Shows your pricing tiers in a clean card layout:
   - 1 Cake — $3
   - 2 Cakes — $5
   - 3-Pack — $7
   - 5-Pack — $10
   - Birthday Pack (5–6 cakes + packaging + note) — $12–$15

4. **3 social media post templates** — 1080×1080px. Pink/cream/gold. Space for a cake photo + your logo in the corner.

Save everything to a Canva folder called *Cake'd Up Brand Kit*.

---

## Step 2 — Build the Google Sites Website

**Go to sites.google.com → New site (blank)**

Name the site: `Caked Up` (no apostrophe — Google Sites URLs work better without special characters)

Your site URL will be: `sites.google.com/view/cakedup` (or similar — customize it in the settings)

---

### Page Structure

Your site has **one page** with these sections, stacked top to bottom:

---

**Section 1 — Header (Hero)**

- Insert → Image → Upload your Canva banner (the 1600×400px one)
- Below it, add a button: `Order Now →` — link it to your Google Form

This is the first thing people see. Make it count.

---

**Section 2 — About**

Short and sweet. Example text:
> *Hi! I'm AT, and I bake fresh homemade cakes for every occasion — or no occasion at all. Cake'd Up is my small business built on big flavors and even bigger love for baking. Every cake is made to order, just for you.*

Add a photo of yourself (optional but recommended — people buy from people they like).

---

**Section 3 — Menu & Pricing**

Insert your Canva menu graphic here, OR type it out:

| | |
|---|---|
| 🎂 1 Cake | **$3** |
| 🎂🎂 2 Cakes | **$5** |
| 🎂🎂🎂 3-Pack | **$7** |
| 🎂×5 5-Pack | **$10** |
| 🎁 Birthday Pack (5–6 cakes + note) | **$12–$15** |

Add a note below: *All cakes are fresh and made to order. Pre-order by the night before — I'll bring them to school the next day!*

---

**Section 4 — Gallery**

Insert → Image → Upload your best 3–5 cake photos. Arrange them in a grid if possible. Real photos of real cakes are always better than stock images.

Caption each photo if you want — flavor, occasion, or just a fun description.

---

**Section 5 — How to Order**

Three simple steps:

> **1.** Fill out the [Order Form](#) ← link to your Google Form
> **2.** Pay via Cash App `$YourHandle` or Venmo `@YourHandle` once your order is confirmed
> **3.** Pick up on your chosen date — we'll confirm by DM!

---

**Section 6 — Order Form (Embedded)**

Insert → Embed → paste your Google Form link

This embeds the form directly on the page. Customers never have to leave your site to place an order.

---

**Section 7 — Contact & Social**

> 📱 Instagram: [@YourHandle](#)
> 🎵 TikTok: [@YourHandle](#)
> 💸 Cash App: $YourHandle
> 💸 Venmo: @YourHandle

---

## Step 3 — Site Settings

Before publishing:

1. **Page title:** `Cake'd Up — Fresh Homemade Cakes`
2. **Favicon:** Upload your logo (the small icon that shows in the browser tab)
3. **Custom URL path:** In settings, set the URL to `/cakedup` so it reads `sites.google.com/view/cakedup`
4. **Theme:** Choose a clean white or cream theme. Let your Canva graphics bring the color.

---

## Step 4 — Publish

**Publish → Anyone on the internet → Publish**

Copy the link. That is your website. Share it everywhere.

---

## What Good Looks Like

Your site is done when:
- ✅ Loads on your phone in under 3 seconds
- ✅ Order Now button goes directly to Google Form
- ✅ Google Form responses appear in your Google Sheet
- ✅ Cash App / Venmo handles are correct and visible
- ✅ At least 3 real cake photos in the gallery
- ✅ You've placed a test order yourself to confirm the full flow works

---

## Optional Upgrade (Free, Month 2)

**Custom domain:** You can buy a domain like `cakedup.com` for ~$12/year (one-time) and connect it to your Google Sites. This is not needed at launch but makes the business look more established. Do this after your first $100/month.

---

```toml
[[kb.lessons_learned.candidates]]
id          = "LL-CAK-003"
category    = "technical"
pattern     = "google_sites_as_micro_business_mvp"
observation = "Google Sites is dismissed as 'basic' but it is the ideal zero-cost website for a micro-business at the $0–$100/month revenue stage. It integrates natively with Google Forms and Sheets, requires no hosting or maintenance, and is publishable in under 2 hours. The constraint is design, not capability — which Canva solves."
action      = "For any project with a $0 digital infrastructure budget and an owner with no coding experience, Google Sites + Canva + Google Forms is the recommended stack. Recommend a custom domain only after revenue justifies the $12/year cost."
severity    = "low"
phase       = "build_out"
project_type_applicable = ["non-technical", "mixed"]
scale_applicable        = ["hello_world", "small"]

[kb.ontology]
[[kb.ontology.patterns]]
id          = "pattern.ops.zero_cost_digital_stack"
name        = "Zero-Cost Digital Stack"
description = "Google Sites (website) + Google Forms (intake) + Google Sheets (management) + Canva (design) + Instagram/TikTok (marketing) + Cash App/Venmo (payment) = a complete digital business infrastructure at $0/month. Appropriate for micro-businesses under $500/month revenue."
signal      = "none"
mitigation  = "Upgrade to paid stack (e.g., Squarespace + Stripe) when monthly revenue consistently exceeds $300 and the tool limitations start creating friction."
```

---

*Generated by: TPM Agent — Cake'd Up | tpm run cakedup*
