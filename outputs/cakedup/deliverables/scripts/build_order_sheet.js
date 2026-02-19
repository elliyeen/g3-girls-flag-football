/**
 * Cake'd Up — Order Tracker Builder
 * ─────────────────────────────────
 * HOW TO RUN:
 * 1. Open Google Sheets (sheets.google.com) → create a new blank spreadsheet
 * 2. Click Extensions → Apps Script
 * 3. Delete any existing code in the editor
 * 4. Paste this entire script
 * 5. Click Save (floppy disk icon)
 * 6. Click Run (▶ play button)
 * 7. Approve permissions when asked (click "Allow")
 * 8. Go back to your spreadsheet — it's built!
 *
 * The script creates 3 tabs: Orders, Dashboard, Availability
 * Everything is formatted, colored, and formula-ready.
 */

function buildCakedUpSheet() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // ── COLORS ────────────────────────────────────────────────────────────────
  var PINK       = '#0ABAB5';  // Tiffany Blue
  var CREAM      = '#E0F7F6';  // Light Tiffany
  var GOLD       = '#B0B8C1';  // Silver
  var DARK       = '#1F2937';
  var WHITE      = '#FFFFFF';
  var RED        = '#F87171';
  var YELLOW     = '#FCD34D';
  var GREEN      = '#34D399';
  var LIGHT_PINK = '#C7EEEC';  // Softer Tiffany

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 1 — ORDERS
  // ══════════════════════════════════════════════════════════════════════════

  // Rename or create the Orders sheet
  var ordersSheet = ss.getSheetByName('Orders');
  if (!ordersSheet) {
    ordersSheet = ss.insertSheet('Orders', 0);
  } else {
    ordersSheet.clearContents();
    ordersSheet.clearFormats();
  }

  // Column headers
  var headers = [
    'Order #',
    'Date Ordered',
    'Customer Name',
    'Contact (IG or Phone)',
    'Order Type',
    'Quantity',
    'Price Each ($)',
    'Order Total ($)',
    'Pickup Date',
    'Payment Method',
    'Paid?',
    'Notes',
    'Status'
  ];

  ordersSheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Style header row
  var headerRange = ordersSheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground(PINK);
  headerRange.setFontColor(WHITE);
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment('center');

  // Column widths
  var colWidths = [70, 110, 140, 180, 110, 70, 110, 110, 110, 120, 70, 200, 100];
  for (var i = 0; i < colWidths.length; i++) {
    ordersSheet.setColumnWidth(i + 1, colWidths[i]);
  }

  // Order Total formula in H2:H200
  for (var row = 2; row <= 200; row++) {
    ordersSheet.getRange(row, 8).setFormula('=IF(F' + row + '="","",F' + row + '*G' + row + ')');
  }

  // Alternate row shading
  for (var row = 2; row <= 200; row++) {
    if (row % 2 === 0) {
      ordersSheet.getRange(row, 1, 1, headers.length).setBackground(CREAM);
    }
  }

  // ── DROPDOWNS ─────────────────────────────────────────────────────────────

  // Order Type (Column E)
  var orderTypeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Single', 'Pair', '3-Pack', '5-Pack', 'Birthday Pack'], true)
    .setAllowInvalid(false)
    .build();
  ordersSheet.getRange('E2:E200').setDataValidation(orderTypeRule);

  // Price Each (Column G)
  var priceRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['3', '5', '7', '10', '12', '15'], true)
    .setAllowInvalid(false)
    .build();
  ordersSheet.getRange('G2:G200').setDataValidation(priceRule);

  // Payment Method (Column J)
  var paymentRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Cash App', 'Venmo', 'Cash'], true)
    .setAllowInvalid(false)
    .build();
  ordersSheet.getRange('J2:J200').setDataValidation(paymentRule);

  // Paid? (Column K)
  var paidRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Yes', 'No'], true)
    .setAllowInvalid(false)
    .build();
  ordersSheet.getRange('K2:K200').setDataValidation(paidRule);

  // Status (Column M)
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Pending', 'Ready', 'Delivered'], true)
    .setAllowInvalid(false)
    .build();
  ordersSheet.getRange('M2:M200').setDataValidation(statusRule);

  // ── CONDITIONAL FORMATTING ────────────────────────────────────────────────

  // Paid? = Yes → green; No → red
  var paidYesRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Yes')
    .setBackground('#DCFCE7')
    .setRanges([ordersSheet.getRange('K2:K200')])
    .build();
  var paidNoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('No')
    .setBackground('#FEE2E2')
    .setRanges([ordersSheet.getRange('K2:K200')])
    .build();

  // Status colors
  var pendingRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pending')
    .setBackground(YELLOW)
    .setRanges([ordersSheet.getRange('M2:M200')])
    .build();
  var readyRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Ready')
    .setBackground('#BFDBFE')
    .setRanges([ordersSheet.getRange('M2:M200')])
    .build();
  var deliveredRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Delivered')
    .setBackground(GREEN)
    .setRanges([ordersSheet.getRange('M2:M200')])
    .build();

  ordersSheet.setConditionalFormatRules([
    paidYesRule, paidNoRule, pendingRule, readyRule, deliveredRule
  ]);

  // Format date columns
  ordersSheet.getRange('B2:B200').setNumberFormat('MM/DD/YYYY');
  ordersSheet.getRange('I2:I200').setNumberFormat('MM/DD/YYYY');

  // Format currency columns
  ordersSheet.getRange('G2:H200').setNumberFormat('$#,##0.00');

  // Freeze header row
  ordersSheet.setFrozenRows(1);

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 2 — DASHBOARD
  // ══════════════════════════════════════════════════════════════════════════

  var dashSheet = ss.getSheetByName('Dashboard');
  if (!dashSheet) {
    dashSheet = ss.insertSheet('Dashboard');
  } else {
    dashSheet.clearContents();
    dashSheet.clearFormats();
  }

  // Title
  dashSheet.getRange('A1').setValue("Cake'd Up — Revenue Tracker");
  dashSheet.getRange('A1').setFontSize(20).setFontWeight('bold').setFontColor(PINK);
  dashSheet.getRange('A1:C1').merge().setBackground(WHITE);
  dashSheet.setRowHeight(1, 40);

  // Spacer
  dashSheet.getRange('A2').setValue('');
  dashSheet.setRowHeight(2, 10);

  // Labels and formulas
  var dashData = [
    ['This Month\'s Revenue',  '=SUMIF(Orders!B:B,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Orders!H:H)'],
    ['Total Revenue (All Time)', '=SUM(Orders!H:H)'],
    ['Total Orders',            '=MAX(0,COUNTA(Orders!A:A)-1)'],
    ['Unpaid Orders',           '=COUNTIF(Orders!K:K,"No")'],
    ['Avg Order Value',         '=IFERROR(B4/B5,"—")'],
  ];

  for (var i = 0; i < dashData.length; i++) {
    var rowNum = i + 3;
    dashSheet.getRange(rowNum, 1).setValue(dashData[i][0]);
    dashSheet.getRange(rowNum, 2).setFormula(dashData[i][1]);
    dashSheet.getRange(rowNum, 1).setFontWeight('bold').setFontColor(DARK);
    if (i === 0) {
      dashSheet.getRange(rowNum, 1, 1, 2).setBackground(LIGHT_PINK);
    }
  }

  // Format currency cells
  dashSheet.getRange('B3:B4').setNumberFormat('$#,##0.00');
  dashSheet.getRange('B7').setNumberFormat('$#,##0.00');

  // Spacer
  dashSheet.setRowHeight(8, 20);

  // Goal section
  dashSheet.getRange('A9').setValue('Monthly Goal').setFontWeight('bold').setFontColor(DARK);
  dashSheet.getRange('B9').setValue(350).setNumberFormat('$#,##0.00');
  dashSheet.getRange('A9:B9').setBackground(CREAM);

  dashSheet.getRange('A10').setValue('Progress to Goal 🎯').setFontWeight('bold').setFontColor(DARK);
  dashSheet.getRange('B10').setFormula('=IFERROR(B3/B9,0)').setNumberFormat('0%');
  dashSheet.getRange('A10:B10').setBackground(CREAM);

  // Conditional formatting on progress cell
  var progressRed = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0.5)
    .setBackground(RED).setFontColor(WHITE)
    .setRanges([dashSheet.getRange('B10')])
    .build();
  var progressYellow = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(0.5, 0.79)
    .setBackground(YELLOW)
    .setRanges([dashSheet.getRange('B10')])
    .build();
  var progressGreen = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThanOrEqualTo(0.8)
    .setBackground(GREEN)
    .setRanges([dashSheet.getRange('B10')])
    .build();

  dashSheet.setConditionalFormatRules([progressRed, progressYellow, progressGreen]);

  // Column widths
  dashSheet.setColumnWidth(1, 220);
  dashSheet.setColumnWidth(2, 160);

  // ══════════════════════════════════════════════════════════════════════════
  // TAB 3 — AVAILABILITY
  // ══════════════════════════════════════════════════════════════════════════

  var availSheet = ss.getSheetByName('Availability');
  if (!availSheet) {
    availSheet = ss.insertSheet('Availability');
  } else {
    availSheet.clearContents();
    availSheet.clearFormats();
  }

  // Headers
  var availHeaders = ['Pickup Date', 'Orders Booked', 'Status'];
  availSheet.getRange(1, 1, 1, 3).setValues([availHeaders]);
  availSheet.getRange(1, 1, 1, 3)
    .setBackground(PINK)
    .setFontColor(WHITE)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Populate next 21 days
  var today = new Date();
  for (var d = 0; d < 21; d++) {
    var date = new Date(today);
    date.setDate(today.getDate() + d + 1);
    var row = d + 2;
    availSheet.getRange(row, 1).setValue(date).setNumberFormat('MM/DD/YYYY');
    availSheet.getRange(row, 2).setFormula('=COUNTIF(Orders!I:I,A' + row + ')');
    availSheet.getRange(row, 3).setFormula(
      '=IF(B' + row + '>=10,"FULL 🚫",IF(B' + row + '>=7,"Almost Full ⚠️","Open ✅"))'
    );
  }

  // Conditional formatting
  var fullRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('FULL')
    .setBackground(RED).setFontColor(WHITE)
    .setRanges([availSheet.getRange('C2:C22')])
    .build();
  var almostRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('Almost')
    .setBackground(YELLOW)
    .setRanges([availSheet.getRange('C2:C22')])
    .build();
  var openRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('Open')
    .setBackground(GREEN)
    .setRanges([availSheet.getRange('C2:C22')])
    .build();

  availSheet.setConditionalFormatRules([fullRule, almostRule, openRule]);
  availSheet.setColumnWidth(1, 120);
  availSheet.setColumnWidth(2, 130);
  availSheet.setColumnWidth(3, 150);
  availSheet.setFrozenRows(1);

  // ══════════════════════════════════════════════════════════════════════════
  // DONE
  // ══════════════════════════════════════════════════════════════════════════

  // Delete any leftover default "Sheet1"
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet) {
    ss.deleteSheet(defaultSheet);
  }

  // Move to Orders tab
  ss.setActiveSheet(ordersSheet);

  SpreadsheetApp.getUi().alert(
    "Cake'd Up Order Tracker is ready! 🎂\n\n" +
    "3 tabs created:\n" +
    "• Orders — log every order here\n" +
    "• Dashboard — check revenue and goal progress\n" +
    "• Availability — see which pickup dates are open\n\n" +
    "Next step: run build_order_form.js to create your Google Form!"
  );
}
