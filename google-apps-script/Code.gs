// Google Apps Script - Lead Form Handler
// 1. Replace SPREADSHEET_ID with your actual spreadsheet ID
// 2. Run initializeSheet() once to set up headers
// 3. Deploy as Web App (Execute as: Me, Access: Anyone)

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
var SHEET_NAME = 'Leads';

function initializeSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  var headers = [
    'ID',
    'Timestamp',
    'Name',
    'Phone',
    'Email',
    'Industry',
    'FundingAmount',
    'PrivacyConsent',
    'MarketingConsent',
    'Status',
    'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setBackground('#06B6D4').setFontColor('#FFFFFF').setFontWeight('bold');
  sheet.setFrozenRows(1);

  Logger.log('Sheet initialized successfully!');
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var result = saveFormData(data);

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveFormData(data) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    initializeSheet();
    sheet = ss.getSheetByName(SHEET_NAME);
  }

  var today = new Date();
  var dateStr = Utilities.formatDate(today, 'Asia/Seoul', 'yyyyMMdd');
  var lastRow = sheet.getLastRow();

  var sequence = 1;
  if (lastRow > 1) {
    var lastId = sheet.getRange(lastRow, 1).getValue();
    if (lastId && lastId.toString().indexOf(dateStr) === 0) {
      sequence = parseInt(lastId.toString().split('-')[1]) + 1;
    }
  }
  var leadId = dateStr + '-' + ('00' + sequence).slice(-3);

  var industryMap = {
    'manufacturing': 'Manufacturing',
    'service': 'Service',
    'food': 'Food/Restaurant',
    'it': 'IT/Software',
    'retail': 'Retail',
    'other': 'Other'
  };

  var fundingMap = {
    'under30m': 'Under 30M',
    '30m-100m': '30M - 100M',
    '100m-300m': '100M - 300M',
    'over300m': 'Over 300M'
  };

  var rowData = [
    leadId,
    Utilities.formatDate(today, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
    data.name || '',
    data.phone || '',
    data.email || '',
    industryMap[data.industry] || data.industry || '',
    fundingMap[data.fundingAmount] || data.fundingAmount || '',
    data.privacyConsent ? 'Y' : 'N',
    data.marketingConsent ? 'Y' : 'N',
    'New',
    ''
  ];

  sheet.appendRow(rowData);

  Logger.log('Lead saved: ' + leadId);

  return {
    success: true,
    leadId: leadId,
    message: 'Form submitted successfully'
  };
}

function testSaveData() {
  var testData = {
    name: 'Test User',
    phone: '010-1234-5678',
    email: 'test@example.com',
    industry: 'manufacturing',
    fundingAmount: '100m-300m',
    privacyConsent: true,
    marketingConsent: false
  };

  var result = saveFormData(testData);
  Logger.log(result);
}
