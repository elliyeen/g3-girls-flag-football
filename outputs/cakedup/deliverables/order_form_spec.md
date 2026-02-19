# Google Form — Complete Build Spec
**Project:** Cake'd Up | **Milestone:** MS-002
**For:** AT — create this form exactly as written below. Copy every word.

---

## How to Create the Form

1. Go to **forms.google.com**
2. Click the **+** (blank form)
3. Title the form: `Cake'd Up — Pre-Order Form`
4. Description: `Order by tonight and I'll bring your cakes to school tomorrow! 🎂 Payment via Cash App or Venmo after your order is confirmed.`
5. Add each question below in order

---

## Question 1 — Name

- **Type:** Short answer
- **Question text:** `What's your name?`
- **Required:** Yes
- **Placeholder hint:** `First name is fine!`

---

## Question 2 — Contact

- **Type:** Short answer
- **Question text:** `Your Instagram handle or phone number`
- **Required:** Yes
- **Placeholder hint:** `@yourhandle or 555-000-0000`
- **Helper text below question:** `This is how I'll confirm your order and send payment details.`

---

## Question 3 — Order Type

- **Type:** Multiple choice (radio buttons)
- **Question text:** `What would you like to order?`
- **Required:** Yes
- **Options (one per line):**
  - `1 Cake — $3`
  - `2 Cakes — $5`
  - `3-Pack — $7`
  - `5-Pack — $10`
  - `Birthday Pack (5–6 cakes + packaging + note) — $12`
  - `Birthday Pack (5–6 cakes + packaging + note) — $15 (extra packaging)`

---

## Question 4 — Quantity

- **Type:** Short answer
- **Question text:** `How many of that option would you like?`
- **Required:** Yes
- **Placeholder hint:** `e.g. 1, 2, 3`
- **Helper text below question:** `If you want 2 x Birthday Packs, put 2. If you want 1 x 3-Pack, put 1.`

---

## Question 5 — Pickup / Delivery Date

- **Type:** Date
- **Question text:** `When do you want to pick up at school?`
- **Required:** Yes
- **Helper text below question:** `Order tonight = pickup tomorrow. I'll confirm if that date works!`

---

## Question 6 — Payment Method

- **Type:** Multiple choice (radio buttons)
- **Question text:** `How will you pay?`
- **Required:** Yes
- **Options:**
  - `Cash App`
  - `Venmo`
  - `Cash (in person)`

---

## Question 7 — Notes

- **Type:** Paragraph (long answer)
- **Question text:** `Any notes? Flavor preferences, who the Birthday Pack is for, allergies, etc.`
- **Required:** No
- **Placeholder hint:** `Optional — e.g. "chocolate cake please" or "Birthday Pack for my friend Maya"`

---

## After All Questions Are Added

**Link the form to your Google Sheet:**

1. Click the **Responses** tab at the top of the form
2. Click the green Sheets icon (or "Link to Sheets")
3. Select **Create a new spreadsheet** → name it `Caked Up Orders`
4. Click **Create**

From now on, every form submission automatically adds a row to your Sheet.

**Get the shareable link:**

1. Click **Send** (top right)
2. Click the link icon
3. Check "Shorten URL"
4. Copy the link — this is what goes on your website and in your bio

**Test it:**
Submit a test order yourself. Check that it appears in your Google Sheet. If it does, MS-002 is complete.

---

## What the Form Looks Like to a Student

```
┌─────────────────────────────────────────────┐
│  Cake'd Up — Pre-Order Form                 │
│                                             │
│  Order by tonight and I'll bring your       │
│  cakes to school tomorrow! 🎂               │
│  Payment via Cash App or Venmo after        │
│  your order is confirmed.                   │
│                                             │
│  What's your name? *                        │
│  [                              ]           │
│                                             │
│  Your Instagram handle or phone number *    │
│  [                              ]           │
│                                             │
│  What would you like to order? *            │
│  ○ 1 Cake — $3                              │
│  ○ 2 Cakes — $5                             │
│  ○ 3-Pack — $7                              │
│  ○ 5-Pack — $10                             │
│  ○ Birthday Pack — $12                      │
│  ○ Birthday Pack — $15                      │
│                                             │
│  How many of that option? *                 │
│  [                              ]           │
│                                             │
│  When do you want to pick up? *             │
│  [  MM / DD / YYYY              ]           │
│                                             │
│  How will you pay? *                        │
│  ○ Cash App                                 │
│  ○ Venmo                                    │
│  ○ Cash (in person)                         │
│                                             │
│  Any notes? (optional)                      │
│  [                              ]           │
│  [                              ]           │
│                                             │
│              [ Submit ]                     │
└─────────────────────────────────────────────┘
```

---

*Produced by: TPM Agent — Cake'd Up | tpm run cakedup*
