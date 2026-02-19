# Cake'd Up — Everything AT Needs to Launch
**Built by: TPM Agent | Date: 2026-02-19**

Everything is ready. AT does 4 things. That's it.

---

## Step 1 — Build the Google Sheet (5 minutes)

1. Go to **sheets.google.com** → create a new blank spreadsheet
2. Name it: `Caked Up Orders`
3. Click **Extensions → Apps Script**
4. Delete any existing code
5. Open `scripts/build_order_sheet.js` → copy all the code → paste it in
6. Click **Save** (floppy disk), then click **Run** (▶)
7. Click **Allow** when Google asks for permissions
8. Go back to the spreadsheet — 3 tabs are built: Orders, Dashboard, Availability ✅

---

## Step 2 — Build the Google Form (3 minutes)

1. Go to **script.google.com** → click **New project**
2. Delete any existing code
3. Open `scripts/build_order_form.js` → copy all the code → paste it in
4. Click **Save**, then click **Run** (▶)
5. Click **Allow** when prompted
6. Check the **Execution log** (View → Logs) — it shows your form link ✅
7. Open the form → click **Responses** tab → click the green Sheets icon
8. Select **Use an existing spreadsheet** → pick `Caked Up Orders`
9. Copy the shareable link (Send → link icon → Shorten URL) — this goes in the website

---

## Step 3 — Launch the Website (10 minutes)

### Option A — GitHub Pages (Free, Looks Best)
1. Go to **github.com** → sign up free
2. Click **New repository** → name it `cakedup` → set to **Public** → click Create
3. Upload the `website/` folder contents (drag and drop)
4. Go to **Settings → Pages → Source → main branch → Save**
5. Your site is live at: `https://[your-username].github.io/cakedup` ✅

### Option B — Google Sites (No account needed, already have Google)
1. Go to **sites.google.com** → New site
2. Open `website_copy.md` → copy each section → paste into Google Sites
3. Embed the Google Form in the Order section (Insert → Embed → paste form link)
4. Publish ✅

---

## Step 4 — Add AT's Photos + Handles

**In the website file (`website/index.html`):**
- Replace `YOUR_HANDLE` (appears 4 times) with AT's Instagram, TikTok, Cash App, Venmo handles
- Add cake photos: create a `photos/` folder next to `index.html`, add photos named `cake1.jpg` through `cake5.jpg`
- In `index.html`, replace the emoji `<div class="gallery-item">🎂</div>` lines with:
  ```html
  <div class="gallery-item"><img src="photos/cake1.jpg" alt="Cake" /></div>
  ```
- Replace the Google Form placeholder with the embed code from Step 2

**In the Google Sheet:**
- No changes needed — the scripts built everything

---

## What AT's Social Media Handles Go Into

| File | Where to replace |
|---|---|
| `website/index.html` | 4× `YOUR_HANDLE` near the bottom |
| `social_media_launch_kit.md` | 3× `@[YourHandle]` in the bio and caption sections |
| `website_copy.md` | Contact section |

---

## Files in This Folder

```
deliverables/
├── README.md                        ← this file
├── order_tracker_template.csv       ← fallback if script fails
├── order_form_spec.md               ← fallback if script fails
├── website_copy.md                  ← Google Sites copy (paste version)
├── canva_design_brief.md            ← logo, banner, menu, post templates
├── social_media_launch_kit.md       ← every caption, DM, weekly schedule
├── sheets_formula_sheet.md          ← manual formula instructions
├── scripts/
│   ├── build_order_sheet.js         ← runs in Google Sheets Apps Script
│   └── build_order_form.js          ← runs in Google Apps Script
└── website/
    └── index.html                   ← full website, ready to upload
```

---

## Test Checklist (Run After Setup)

```
☐  Google Sheet opens — 3 tabs visible (Orders, Dashboard, Availability)
☐  Dashboard shows $0 revenue and 0% progress to $350 goal
☐  Availability shows next 21 dates with Open status
☐  Google Form opens and all 7 questions are there
☐  Submit a test order through the form
☐  Test order appears in the Orders tab of the Sheet ← most important check
☐  Website loads on AT's phone
☐  "Pre-Order Now" button opens the form
☐  Prices are correct: $3 / $5 / $7 / $10 / $12–$15
☐  Delete the test order from the Sheet when done
```

---

## Need Help?

Run `tpm run cakedup` to get an updated project status, risk alerts, and next actions.

---

*Built by: TPM Agent — Cake'd Up | tpm run cakedup*
