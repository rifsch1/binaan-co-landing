/**
 * seedLeads() — pastes 150 fictional Binaan leads into the active spreadsheet.
 * Run once from the Apps Script editor (Extensions > Apps Script > Run > seedLeads).
 * Distribution: 30 Hot (score >=70), 75 Warm (40-69), 45 Cold (<40)
 */
function seedLeads() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Leads');
  if (!sheet) { Logger.log('ERROR: Sheet named "Leads" not found.'); return; }

  const lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, 20).clearContent();

  const NAMES = [
    'Ahmad Rashid bin Haji Sulaiman', 'Siti Norfaizah Mohd Yusof', 'Muhammad Hazwan Abdullah',
    'Nurul Ain binti Roslan', 'Mohd Faizal Kassim', 'Rabiatul Adawiyah Hj Ramli',
    'Haziq Firdaus Saifuddin', 'Norashikin bte Ismail', 'Azlan Shah Hamzah',
    'Izzuddin Malik Othman', 'Lim Wei Ming', 'Tan Mei Ling', 'Chong Kar Wai',
    'Wong Siew Fen', 'Lee Boon Hwa', 'Ng Chee Keong', 'Yap Kah Leng',
    'Ong Swee Lin', 'Kevin Ng Weng Fatt', 'Grace Chan Lay Yee',
    'Alan Chia Beng Hock', 'Fiona Lee Hui Shan', 'David Teo Kah Seng',
    'Sarah Khor Mei Yi', 'James Loh Zhen Yang', 'Michelle Tan Shu Ting',
    'Rajesh Kumar Nair', 'Priya Nair Krishnan', 'Suresh Menon Pillai',
    'Kavitha Pillai Ramachandran', 'Farid Hakim bin Nordin', 'Zulaikha Aziz Hamid',
    'Hanim Zainal Abidin', 'Roslan bin Othman', 'Nadia Husna Ariffin',
    'Zainudin Hashim', 'Syafiqah Mohd Hanif', 'Arif Hamizan Ibrahim',
  ];

  const DOMAINS = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com'];

  const PHONES = [
    '+601172250309', '+601161234567', '+601198765432', '+601123456789',
    '+6012-345 6789', '+6013-456 7890', '+6019-876 5432', '+6011-9923 4455',
    '+673 838 1234', '+673 719 5678', '+673 223 4567', '+673 876 5432',
    '+65 9123 4567', '+65 8234 5678', '+65 9876 5432', '+65 8765 1234',
  ];

  const PROJECT_TYPES = [
    'New Residential Home', 'Commercial Building', 'Major Renovation',
    'Interior Design', 'Mixed Development', 'Government Project', 'Other',
  ];

  const BUDGETS = {
    Hot:  ['MYR 500,000 - 1,000,000', 'Above MYR 1,000,000', 'Above SGD 200,000', 'SGD 50,000 - 200,000'],
    Warm: ['MYR 150,000 - 500,000', 'MYR 500,000 - 1,000,000', 'SGD 50,000 - 200,000', 'MYR 50,000 - 150,000'],
    Cold: ['Below MYR 50,000', 'MYR 50,000 - 150,000'],
  };

  const TIMELINES = {
    Hot:  ['ASAP / Within 1 month', '1-3 months'],
    Warm: ['1-3 months', '3-6 months', '6-12 months'],
    Cold: ['6-12 months', '12+ months / Exploring'],
  };

  const LOCATIONS = [
    'Kuala Lumpur, Malaysia', 'Petaling Jaya, Selangor, Malaysia',
    'Johor Bahru, Johor, Malaysia', 'Georgetown, Penang, Malaysia',
    'Kota Kinabalu, Sabah, Malaysia', 'Subang Jaya, Selangor, Malaysia',
    'Shah Alam, Selangor, Malaysia', 'Klang, Selangor, Malaysia',
    'Ipoh, Perak, Malaysia', 'Kuching, Sarawak, Malaysia',
    'Bandar Seri Begawan, Brunei', 'Seria, Brunei', 'Tutong, Brunei',
    'Singapore', 'Jurong West, Singapore', 'Tampines, Singapore',
  ];

  const NOTES = [
    'Looking for modern minimalist design', 'Need completion by year end',
    'Have existing contractor, need conversion system only',
    'First time building, need full guidance', 'Renovation of existing shophouse',
    'Need energy-efficient solutions throughout', 'Prefer green certified materials',
    'Budget is flexible for the right design', 'Targeting high-end market segment',
    'Referred by existing Binaan client', 'Have land ready, need design-build package',
    'Investment property, not primary residence', '', '', '', '',
  ];

  const CATEGORIES = ['Residential', 'Commercial', 'Renovation', 'Mixed Use', 'Government'];

  const RECOMMENDED_ACTIONS = {
    Hot:  ['Call within 2 hours', 'Schedule discovery call today', 'Send proposal this week', 'Prioritise - book call ASAP'],
    Warm: ['Follow up within 24 hours', 'Send project portfolio', 'Schedule call this week', 'Nurture with case studies'],
    Cold: ['Add to email sequence', 'Monthly check-in only', 'Send newsletter subscription', 'Low priority - monitor'],
  };

  const FOLLOW_UP_MESSAGES = {
    Hot: [
      "Hi [Name], thank you for reaching out to Binaan. Your project sounds like a great fit - can we schedule a quick call tomorrow?",
      "Hi [Name], great to hear from you! We'd love to help bring your project to life. When are you free for a 15-min discovery call?",
    ],
    Warm: [
      "Hi [Name], thanks for your enquiry. I'd love to share some relevant case studies. When would be a good time to connect?",
      "Hi [Name], appreciate you reaching out to Binaan. Let me send you some project examples and we can go from there.",
    ],
    Cold: [
      "Hi [Name], thank you for your interest in Binaan. We'll keep your details on file and reach out when the timing is right.",
      "Hi [Name], thanks for getting in touch. We'd love to help when you're ready to move forward with your project.",
    ],
  };

  const SUMMARIES = [
    'Residential development with clear budget and near-term timeline.',
    'High-value commercial project with urgent requirements and strong intent.',
    'Interior design project at early exploration stage with flexible budget.',
    'New residential home with detailed specifications and defined timeline.',
    'Mixed development enquiry with strong commercial intent and premium budget.',
    'Government-linked project with formal procurement requirements.',
    'Renovation project with defined scope and mid-range budget.',
    'Investment property development with commercial ROI considerations.',
    'Entry-level residential project still in early planning phase.',
    'Premium residential build with high-end finish requirements.',
  ];

  const KEY_STRENGTHS = [
    'Clear budget and timeline; project type well-defined.',
    'High-value project with urgent timeline; highly motivated buyer.',
    'Government backing provides stable funding certainty.',
    'Commercial development with strong ROI potential.',
    'Experienced client with defined requirements and clear vision.',
    'Premium budget range; minimal price sensitivity.',
    'Referral lead; pre-qualified trust already established.',
  ];

  const CONCERNS = [
    'Timeline may be unrealistic given stated project scope.',
    'Budget is on the lower end for the stated project type.',
    'Limited information provided; needs further qualification.',
    'Still in exploration stage; conversion may not be near-term.',
    'Remote location may add logistics and cost complexity.',
    'No notes provided; specific intent unclear from enquiry alone.',
    'Multiple competing vendors likely being evaluated.',
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const rand = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
  const makeEmail = (name) => {
    const p = name.toLowerCase().replace(/[^a-z\s]/g, '').split(' ');
    return p[0] + '.' + p[p.length - 1] + '@' + pick(DOMAINS);
  };

  const now = new Date();

  const makeLead = (tier) => {
    const ts = new Date(now.getTime() - rand(0, 89) * 86400000 - rand(0, 86400000));
    const timestamp = Utilities.formatDate(ts, 'Asia/Kuala_Lumpur', 'yyyy-MM-dd HH:mm:ss');
    const name = pick(NAMES);
    const score = tier === 'Hot' ? rand(70, 96) : tier === 'Warm' ? rand(40, 69) : rand(8, 39);
    const urgency = tier === 'Hot' ? 'High' : tier === 'Warm' ? pick(['High', 'Medium']) : 'Low';
    const confidence = tier === 'Hot'
      ? (rand(78, 97) / 100).toFixed(2)
      : tier === 'Warm' ? (rand(50, 77) / 100).toFixed(2)
      : (rand(20, 49) / 100).toFixed(2);

    return [
      timestamp,
      Math.random() > 0.45 ? 'Chatbot' : 'Form',
      name,
      makeEmail(name),
      pick(PHONES),
      pick(PROJECT_TYPES),
      pick(BUDGETS[tier]),
      pick(TIMELINES[tier]),
      pick(LOCATIONS),
      pick(NOTES),
      pick(SUMMARIES),
      pick(CATEGORIES),
      urgency,
      score,
      tier,
      pick(RECOMMENDED_ACTIONS[tier]),
      pick(FOLLOW_UP_MESSAGES[tier]),
      pick(KEY_STRENGTHS),
      pick(CONCERNS),
      confidence,
    ];
  };

  const rows = [];
  for (let i = 0; i < 30; i++) rows.push(makeLead('Hot'));
  for (let i = 0; i < 75; i++) rows.push(makeLead('Warm'));
  for (let i = 0; i < 45; i++) rows.push(makeLead('Cold'));

  // Fisher-Yates shuffle
  for (let i = rows.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rows[i], rows[j]] = [rows[j], rows[i]];
  }

  sheet.getRange(2, 1, rows.length, 20).setValues(rows);
  Logger.log('Seeded ' + rows.length + ' leads (30 Hot / 75 Warm / 45 Cold).');
  SpreadsheetApp.getUi().alert('Done! ' + rows.length + ' leads seeded into the Leads sheet.');
}
