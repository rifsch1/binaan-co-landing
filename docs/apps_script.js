/**
 * Binaan Lead Engine — Apps Script Web App
 *
 * DEPLOY SETTINGS (Deploy > New deployment > Web app):
 *   Execute as:  Me
 *   Who can access: Anyone
 *
 * Usage: GET https://<your-web-app-url>?action=read
 * Returns: { rows: [...], total: N }
 *
 * Paste ALL of this into the Apps Script editor (same project as seedLeads).
 * You can have both functions in the same project.
 */

function doGet(e) {
  const out = (data) =>
    ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);

  try {
    if (!e || !e.parameter || e.parameter.action !== 'read') {
      return out([]);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
    if (!sheet) return out([]);

    const values = sheet.getDataRange().getValues();
    if (values.length < 2) return out([]);

    const headers = values[0].map(h => String(h).trim());
    const rows = values.slice(1)
      .filter(row => row[2] !== '')          // skip rows with no Name (col C)
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => { obj[h] = row[i] instanceof Date ? row[i].toISOString() : row[i]; });
        return obj;
      });

    return out(rows);   // dashboard expects a direct array

  } catch (err) {
    return out({ error: err.toString() });
  }
}
