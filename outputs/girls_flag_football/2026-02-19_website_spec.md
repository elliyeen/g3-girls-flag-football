# Website Specification
## Girls Flag Football — Digital Platform Strategy
**Date:** 2026-02-19 | **Prepared by:** TPM Agent

---

## Overview

The website is the organization's most important sales tool. Every Nike conversation, every school district MOU, every parent deciding whether to register their daughter, every media journalist doing background research — they all land here first. It must be **professional, fast, mobile-first, and conversion-optimized on Day 1.**

**Platform Recommendation: Webflow** (Year 1)
- Professional agency-quality design without engineering overhead
- No-code content management (marketing team updates without developer)
- Fast page load (critical for mobile SEO)
- Clean export path to custom platform if needed in Year 2
- Cost: $23–$39/month + designer setup cost ($2,000–$4,000 one-time)

**Alternative if budget is tight: Squarespace** ($23/month, $500–$1,500 design setup)

**Do NOT use:** WordPress (security/maintenance overhead), Wix (looks amateur to sponsors), custom build (too slow and expensive for Phase 1)

---

## Site Architecture — Phase 1 (MVP)

```
Home
├── About
│   ├── Our Mission
│   ├── Our Story
│   └── Team / Coaches
├── Programs
│   ├── Age Groups (8–10, 11–13, 14–18)
│   ├── Schedule
│   └── Registration
├── Partners & Sponsors
│   ├── Current Partners
│   └── Become a Sponsor
├── News & Events
│   ├── News
│   └── Events Calendar
├── Donate
└── Contact
```

---

## Page-by-Page Specifications

### HOME PAGE (Most critical)

**Above the fold (what they see before scrolling):**
- Full-width hero image/video: Girls playing flag football — action, energy, joy
- Headline: Bold mission statement (e.g., "The game was made for them too.")
- Subheadline: "Arizona's girls flag football league — building athletes, confidence, and champions."
- Two CTAs: [Register Your Daughter] + [Partner With Us]
- Navigation: Clean, minimal, mobile-friendly hamburger on mobile

**Section 2: The Numbers (Social Proof)**
- X Girls Registered | X School Districts | X Games Played | X Coaches Certified
- (Start with small honest numbers — even 10 is fine at launch. Add this section once numbers exist.)

**Section 3: Why Flag Football for Girls**
- 3-column value prop: Athletic Development / Teamwork & Leadership / Path to College
- Images of girls at practice

**Section 4: Featured Story / Latest News**
- Pull latest blog post or player spotlight

**Section 5: Partners Row**
- Logos of current partners (USA Flag Football, NFL Flag, AZ Cardinals, sponsors)
- Even at launch: "Partnerships in progress" with governing body logos builds credibility

**Section 6: Get Involved CTA**
- Register / Donate / Volunteer / Sponsor — 4 tiles

**Footer:** Contact info, social links, 501(c)(3) tax ID, privacy policy

---

### REGISTER PAGE

**Phase 1 (before registration platform):**
- Waitlist/interest capture form: Name, child's name, age, email, zip code
- "Season 1 opens [date] — get notified first"
- Connect to email marketing (Mailchimp or HubSpot Free)

**Phase 2 (before Season 1 opens):**
- Full online registration via Amilia, Active Network, or SportsEngine
- Payment processing for registration fees
- Waiver and emergency contact capture
- Age group selection

**Registration platform recommendation: SportsEngine** (industry standard for youth leagues, includes payment + waivers + team management, $99/month)

---

### SPONSORS PAGE (Critical for Nike pitch)

This page must look like you already have a professional partner program — even before partners are signed.

**Sections:**
1. "Why Partner With Us" — bullet points with key stats and demographic data
2. Sponsorship Tiers table (Title Sponsor / Presenting / Gold / Silver / In-Kind)
3. Current Partners section with logos
4. "Become a Partner" CTA → sponsor inquiry form
5. Impact metrics: Girls served, games played, school districts, social reach

**Sponsorship Tier Table:**
| Tier | Investment | Benefits |
|---|---|---|
| Title Sponsor | $50,000+ | Name in organization title, all logo placements, event naming rights, content rights |
| Presenting Sponsor | $25,000 | "Presented by [Sponsor]" on events, jersey logo, social media features |
| Gold Partner | $10,000 | Logo on website, jersey patch, social shoutouts (4/season) |
| Silver Partner | $5,000 | Website logo, social shoutout (2/season) |
| In-Kind Partner | Product/Service | Logo on website, season acknowledgment |

---

### ABOUT / MISSION PAGE

- Founder story (authentic, personal — why girls flag football, why AZ)
- Mission statement
- Vision statement (national expansion)
- Core values (3–5 bullets: Inclusion, Excellence, Empowerment, Community, Joy)
- Team photos and bios (coaching staff, board, founder)

**Note:** This page is the most-read page by Nike and institutional partners. It must be authentic, not corporate. Nike's team will read every word.

---

### DONATE PAGE

- Clear 501(c)(3) language: "Your donation is tax-deductible"
- Giving levels with named impact:
  - $50 = Equipment for one player
  - $150 = Registration scholarship for one player
  - $500 = Gear for an entire team
  - $1,000 = Season sponsor for a school district team
  - Custom amount
- Payment: Stripe or PayPal Giving Fund (lower fees for nonprofits)
- Impact counter: "Raised to date: $X" (even at $0 at launch — update weekly)

---

## Technical Requirements

| Requirement | Spec |
|---|---|
| Mobile-first | 65%+ of traffic will be mobile (parents on phones) |
| Page load | < 2 seconds on mobile (Google Core Web Vitals) |
| Analytics | Google Analytics 4 + Google Search Console |
| SEO | Optimized for: "girls flag football arizona", "flag football girls league AZ", "youth flag football girls" |
| SSL | Required (HTTPS mandatory for payment + trust) |
| Accessibility | WCAG 2.1 AA (required for school district partnerships + grant eligibility) |
| CMS | Non-technical staff must be able to update news/events |
| Email capture | Integrated with Mailchimp or HubSpot Free |
| Social sharing | Open Graph tags for all pages (Instagram/Facebook share previews) |

---

## Phase 2 Website Upgrades (Before Season 1 Opens)

- Player registration portal (SportsEngine or custom)
- Season schedule and standings
- Score reporting
- Player/team profiles
- Photo gallery (game and practice photos — critical for social media and Nike pitch)
- Video embed section (YouTube highlight reels)
- Volunteer signup form
- Coach application form

---

## Phase 3 Website Upgrades (After Nike Deal)

- Nike co-branded elements (if contractually required)
- National expansion pages (Texas, California, Florida chapters)
- Chapter directory / chapter application
- Merchandise store (Printful or Shopify integration)
- Alumni section / college pipeline tracking
- Press kit / media room (downloadable logos, photos, fact sheet)

---

## Content Calendar — First 90 Days Post-Launch

| Week | Content Focus |
|---|---|
| Week 1–2 | Founder story, mission post, "why flag football for girls" |
| Week 3–4 | Coach spotlight, coaching philosophy |
| Week 5–6 | School district partnership announcement |
| Week 7–8 | Season 1 registration open announcement |
| Week 9–10 | Player testimonials / parent quotes (waitlist interest) |
| Week 11–12 | First practice day coverage |

**Social Media Priority Order:**
1. **TikTok** — Primary growth engine. Girls aged 10–18 live here. Authentic, raw practice footage performs better than polished content.
2. **Instagram** — Primary trust/credibility platform. Parents research here. Polished brand content.
3. **YouTube** — Highlight reels, coach clinics, player spotlights. Evergreen content that compounds over time.
4. **Facebook** — Parent community communication, event announcements.

---

*Generated by: TPM Agent — Girls Flag Football | tpm run girls_flag_football*
