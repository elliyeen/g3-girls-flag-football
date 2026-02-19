/**
 * Cake'd Up — Google Form Builder
 * ────────────────────────────────
 * HOW TO RUN:
 * 1. Go to script.google.com → New project
 * 2. Delete any existing code
 * 3. Paste this entire script
 * 4. Click Save, then click Run (▶)
 * 5. Approve permissions when asked
 * 6. A new Google Form called "Cake'd Up — Pre-Order Form" will be created
 *    and saved to your Google Drive
 * 7. Open the form → Responses tab → click the green Sheets icon
 *    → connect to your "Caked Up Orders" spreadsheet
 *
 * To share: open the form → Send → link icon → Shorten URL
 */

function buildCakedUpForm() {

  // ── CREATE FORM ───────────────────────────────────────────────────────────
  var form = FormApp.create("Cake'd Up — Pre-Order Form");

  form.setDescription(
    "Order by tonight and I'll bring your cakes to school tomorrow!\n" +
    "I'll DM you to confirm and send payment info once your order is in.\n" +
    "Orders close at 8pm for next-day pickup."
  );

  form.setConfirmationMessage(
    "Order received!\n\n" +
    "I'll DM you to confirm and send payment details. " +
    "See you at school tomorrow!"
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(true);

  // ── SECTION 1: About You ──────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle("About You")
    .setHelpText("Quick — takes 30 seconds.");

  form.addTextItem()
    .setTitle("What's your name?")
    .setHelpText("First name is fine!")
    .setRequired(true);

  form.addTextItem()
    .setTitle("Your Instagram handle or phone number")
    .setHelpText("This is how I'll confirm your order and send payment details.")
    .setRequired(true);

  // ── SECTION 2: Your Order ─────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle("Your Order")
    .setHelpText("What are you getting?");

  var orderTypeItem = form.addMultipleChoiceItem();
  orderTypeItem
    .setTitle("What would you like to order?")
    .setChoices([
      orderTypeItem.createChoice("1 Cake — $3"),
      orderTypeItem.createChoice("2 Cakes — $5"),
      orderTypeItem.createChoice("5-Pack — $10"),
      orderTypeItem.createChoice("Birthday Pack (5–6 cakes + packaging + note) — $12"),
      orderTypeItem.createChoice("Birthday Pack — extra packaging — $15")
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle("How many of that option would you like?")
    .setHelpText("e.g. 1, 2, 3 — if you want 2 Birthday Packs, put 2.")
    .setRequired(true);

  // ── SECTION 3: Flavor ─────────────────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle("Pick Your Flavor")
    .setHelpText("Every cake is made to order — pick what you want!");

  var flavorItem = form.addMultipleChoiceItem();
  flavorItem
    .setTitle("Which flavor would you like?")
    .setChoices([
      flavorItem.createChoice("Carrot Cake"),
      flavorItem.createChoice("Berry Explosion"),
      flavorItem.createChoice("Cookies & Cream"),
      flavorItem.createChoice("Texas Vanilla Bean"),
      flavorItem.createChoice("Surprise me!")
    ])
    .setRequired(true);

  // ── SECTION 4: Pickup & Payment ───────────────────────────────────────────
  form.addSectionHeaderItem()
    .setTitle("Pickup & Payment")
    .setHelpText("Last step — you're almost done!");

  form.addDateItem()
    .setTitle("When do you want to pick up at school?")
    .setHelpText("Order tonight = pickup tomorrow! I'll confirm if that date works.")
    .setRequired(true);

  var paymentItem = form.addMultipleChoiceItem();
  paymentItem
    .setTitle("How will you pay?")
    .setChoices([
      paymentItem.createChoice("Cash App"),
      paymentItem.createChoice("Cash (in person)")
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Any notes? (optional)")
    .setHelpText(
      "Special requests, who the Birthday Pack is for, allergies, etc.\n" +
      "e.g. 'extra frosting please' or 'Birthday Pack for my friend Maya'"
    )
    .setRequired(false);

  // ── DONE — LOG LINKS ──────────────────────────────────────────────────────
  var formUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();

  Logger.log("Form created!");
  Logger.log("Share with students: " + formUrl);
  Logger.log("Edit the form here: " + editUrl);

  // Save links to a new Sheet tab for easy reference
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var linksSheet = ss.getSheetByName('Form Links');
    if (!linksSheet) {
      linksSheet = ss.insertSheet('Form Links');
    }
    linksSheet.clearContents();

    linksSheet.getRange('A1').setValue("Cake'd Up — Form Links");
    linksSheet.getRange('A1')
      .setFontWeight('bold')
      .setFontSize(14)
      .setFontColor('#0ABAB5');

    linksSheet.getRange('A3').setValue('Share with students:');
    linksSheet.getRange('B3').setValue(formUrl);
    linksSheet.getRange('A4').setValue('Edit form:');
    linksSheet.getRange('B4').setValue(editUrl);

    linksSheet.setColumnWidth(1, 180);
    linksSheet.setColumnWidth(2, 520);

    linksSheet.getRange('A3:A4').setFontWeight('bold');

    SpreadsheetApp.getUi().alert(
      "Cake'd Up Pre-Order Form is ready!\n\n" +
      "Share link:\n" + formUrl + "\n\n" +
      "Links also saved to the 'Form Links' tab.\n\n" +
      "Next: open the form → Responses tab → green Sheets icon\n" +
      "→ connect to your 'Caked Up Orders' spreadsheet."
    );
  } catch(e) {
    // Script may be run outside of a spreadsheet context — links are in the log
    Logger.log("Note: Run inside a spreadsheet for the full UI experience.");
  }
}
