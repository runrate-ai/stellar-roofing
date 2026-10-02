// Google Ads script: copies the relaunch campaign's numbers into a Google
// Sheet named "Stellar Ads Report" (created on first run, reused after).
// Read-only: it changes nothing in Google Ads.
// Paste into Tools > Bulk actions > Scripts, Run once, then set Frequency: Daily.

var CAMPAIGN_NAME_CONTAINS = 'Nashville Leads (Relaunch)';
var SHEET_NAME = 'Stellar Ads Report';
var RANGE = 'LAST_30_DAYS';

var WHERE = " WHERE campaign.name LIKE '%" + CAMPAIGN_NAME_CONTAINS + "%' AND segments.date DURING " + RANGE;
var METRICS = [
  ['metrics.impressions', 'Impressions'],
  ['metrics.clicks', 'Clicks'],
  ['metrics.cost_micros', 'Cost ($)'],
  ['metrics.conversions', 'Conversions']
];

var TABS = [
  {
    name: 'Daily',
    from: 'campaign',
    fields: [['segments.date', 'Date']].concat(METRICS),
    tail: ' ORDER BY segments.date DESC'
  },
  {
    name: 'Search terms',
    from: 'search_term_view',
    fields: [
      ['search_term_view.search_term', 'Search term'],
      ['ad_group.name', 'Ad group'],
      ['search_term_view.status', 'Added/excluded']
    ].concat(METRICS),
    tail: ' ORDER BY metrics.cost_micros DESC'
  },
  {
    name: 'Ad groups',
    from: 'ad_group',
    fields: [['ad_group.name', 'Ad group'], ['ad_group.status', 'Status']].concat(METRICS),
    tail: " AND ad_group.status != 'REMOVED'"
  },
  {
    name: 'Keywords',
    from: 'keyword_view',
    fields: [
      ['ad_group.name', 'Ad group'],
      ['ad_group_criterion.keyword.text', 'Keyword'],
      ['ad_group_criterion.keyword.match_type', 'Match type'],
      ['ad_group_criterion.status', 'Status']
    ].concat(METRICS),
    tail: " AND ad_group_criterion.status != 'REMOVED' ORDER BY metrics.cost_micros DESC"
  },
  {
    name: 'Ads',
    from: 'ad_group_ad',
    fields: [
      ['ad_group.name', 'Ad group'],
      ['ad_group_ad.status', 'Status'],
      ['ad_group_ad.policy_summary.approval_status', 'Approval'],
      ['ad_group_ad.ad_strength', 'Ad strength']
    ].concat(METRICS),
    tail: " AND ad_group_ad.status != 'REMOVED'"
  },
  {
    name: 'Conversions by type',
    from: 'campaign',
    fields: [
      ['segments.conversion_action_name', 'Conversion action'],
      ['metrics.conversions', 'Conversions']
    ],
    tail: ''
  }
];

function main() {
  var ss = openOrCreate(SHEET_NAME);
  TABS.forEach(function (tab) { writeTab(ss, tab); });

  var info = ss.getSheetByName('Info') || ss.insertSheet('Info', 0);
  info.clear();
  info.getRange(1, 1, 3, 2).setValues([
    ['Campaign', CAMPAIGN_NAME_CONTAINS],
    ['Date range', RANGE],
    ['Last updated', Utilities.formatDate(new Date(), AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd HH:mm')]
  ]);
  var blank = ss.getSheetByName('Sheet1');
  if (blank) ss.deleteSheet(blank);

  Logger.log('Report written to: ' + ss.getUrl());
}

function openOrCreate(name) {
  var files = DriveApp.getFilesByName(name);
  while (files.hasNext()) {
    var f = files.next();
    if (!f.isTrashed()) return SpreadsheetApp.openById(f.getId());
  }
  return SpreadsheetApp.create(name);
}

function writeTab(ss, tab) {
  var query = 'SELECT ' + tab.fields.map(function (f) { return f[0]; }).join(', ') +
    ' FROM ' + tab.from + WHERE + tab.tail;
  var rows = [tab.fields.map(function (f) { return f[1]; })];
  try {
    var it = AdsApp.report(query).rows();
    while (it.hasNext()) {
      var r = it.next();
      rows.push(tab.fields.map(function (f) {
        var v = r[f[0]];
        return f[0] === 'metrics.cost_micros' ? Number(v) / 1e6 : v;
      }));
    }
  } catch (e) {
    rows.push(['ERROR: ' + e]);
    Logger.log(tab.name + ' failed: ' + e);
  }
  var width = rows[0].length;
  rows = rows.map(function (r) { while (r.length < width) r.push(''); return r; });

  var sheet = ss.getSheetByName(tab.name) || ss.insertSheet(tab.name);
  sheet.clear();
  sheet.getRange(1, 1, rows.length, width).setValues(rows);
  sheet.setFrozenRows(1);
  Logger.log(tab.name + ': ' + (rows.length - 1) + ' rows');
}
