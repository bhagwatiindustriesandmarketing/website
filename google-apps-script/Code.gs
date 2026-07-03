/**
 * Bhagwati website form backend.
 * Paste this whole file into script.google.com (bound to a new Google Sheet),
 * deploy as a Web App, and put the resulting URL in .env as
 * NEXT_PUBLIC_FORMS_SCRIPT_URL. See setup steps shared separately.
 */

var SHEET_CONFIG = {
  contact: { name: "Contact", headers: ["Timestamp", "Name", "Phone", "Email", "Subject", "Message"] },
  faq: { name: "FAQ Questions", headers: ["Timestamp", "Name", "Contact Info", "Question"] },
  feedback: { name: "Feedback", headers: ["Timestamp", "Name", "Contact Info", "Rating", "Comments"] },
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var config = SHEET_CONFIG[data.type];
    if (!config) {
      return jsonOutput({ result: "error", message: "Unknown submission type" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(config.name);
    if (!sheet) {
      sheet = ss.insertSheet(config.name);
      sheet.appendRow(config.headers);
      sheet.getRange(1, 1, 1, config.headers.length).setFontWeight("bold");
    }

    var timestamp = new Date();
    var row;
    if (data.type === "contact") {
      row = [timestamp, data.name || "", data.phone || "", data.email || "", data.subject || "", data.message || ""];
    } else if (data.type === "faq") {
      row = [timestamp, data.name || "", data.contact || "", data.question || ""];
    } else {
      row = [timestamp, data.name || "", data.contact || "", data.rating || "", data.comments || ""];
    }
    sheet.appendRow(row);

    return jsonOutput({ result: "success" });
  } catch (err) {
    return jsonOutput({ result: "error", message: err.toString() });
  }
}

function doGet() {
  return ContentService.createTextOutput("Bhagwati forms endpoint is live.");
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
