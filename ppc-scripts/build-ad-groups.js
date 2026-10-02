// Google Ads script: builds the Roofers, Roof Replacement, and Storm Damage
// ad groups in the relaunch campaign, and adds two keywords to Roof Repair.
// Paste into Tools > Bulk actions > Scripts. Click Preview first, then Run.
// Safe to run twice: ad groups that already exist are skipped.

var CAMPAIGN_NAME_CONTAINS = 'Nashville Leads (Relaunch)';

var SHARED_HEADLINES = [
  'Free Roof Inspection',
  'We Match Any Written Quote',
  'Licensed & Insured Roofers',
  'Lifetime Workmanship Warranty',
  'Local Goodlettsville Roofer',
  'Open 24/7 - Call Now',
  'Photos of Everything We Find',
  'Stellar Roofing'
];
var D_INSPECT = "Free inspection with photos of everything we find. We'll match any written quote.";
var D_LOCAL = 'Licensed, insured and local to Goodlettsville. Lifetime workmanship warranty.';

var AD_GROUPS = [
  {
    name: 'Roofers',
    url: 'https://get.thestellarroofing.com/',
    path1: 'roofers', path2: 'nashville',
    keywords: [
      '[roofers near me]', '"roofers near me"', '"roofing company near me"',
      '"roofing contractors near me"', '"roofing company nashville"', '"roofers nashville"',
      '"roofing company hendersonville"', '"roofing company goodlettsville"',
      '"roofing company murfreesboro"', '"roofing company franklin tn"',
      '"roofing company clarksville tn"', '"roofing company gallatin"', '"roofing company mt juliet"'
    ],
    headlines: ['Nashville Roofing Company', 'Trusted Middle TN Roofers', 'Free Gutters With New Roof',
      'Roofers Near You', 'Roofing Company Near You'],
    descriptions: [D_INSPECT, D_LOCAL,
      'Replace your roof with us: free seamless gutters plus a dog spa day at Dog Oasis.',
      "Get your other quotes, then bring us the best one. We'll match it, apples to apples."]
  },
  {
    name: 'Roof Replacement',
    url: 'https://get.thestellarroofing.com/roof-replacement',
    path1: 'new-roof', path2: 'nashville',
    keywords: [
      '"roof replacement near me"', '[roof replacement near me]', '"roof replacement nashville"',
      '"new roof near me"', '"roof installation near me"', '"replace my roof"',
      '"new roof cost nashville"', '"roof replacement company"'
    ],
    headlines: ['Free Gutters With New Roof', 'Dog Spa Day on Install Day', 'Roof Replacement Nashville',
      'New Roof in Nashville', 'Roof Replacement Near You'],
    descriptions: [D_INSPECT, D_LOCAL,
      'Replace your roof with us: free seamless gutters plus a dog spa day at Dog Oasis.',
      'New roof from a local, licensed and insured crew. Free inspection and written estimate.']
  },
  {
    // No gutters or dog-spa lines here on purpose: insurance-claim traffic.
    name: 'Storm Damage',
    url: 'https://get.thestellarroofing.com/storm-damage',
    path1: 'storm-damage', path2: 'nashville',
    keywords: [
      '"roof hail damage"', '"hail damage roof repair"', '"hail damage roof"',
      '"storm damage roof repair"', '"wind damage roof"', '"storm damage roofer"',
      '"roof damage from storm"'
    ],
    headlines: ['Storm & Hail Roof Damage', 'Free Storm Damage Inspection', 'We Meet Your Adjuster On-Site',
      'Hail Damage Roof Repair', 'Wind Damage Roof Repair'],
    descriptions: [D_INSPECT, D_LOCAL,
      'Hail or wind damage? Free inspection with photos, and we can meet your adjuster on-site.',
      'Roof leaking after a storm? We answer the phone 24/7 and can tarp to stop the damage.']
  }
];

var EXTRA_ROOF_REPAIR_KEYWORDS = ['"roof leak contractor"', '"roof repair companies near me"'];

function main() {
  var campaigns = AdsApp.campaigns()
    .withCondition("campaign.name LIKE '%" + CAMPAIGN_NAME_CONTAINS + "%'")
    .withCondition("campaign.status != 'REMOVED'")
    .get();
  if (!campaigns.hasNext()) {
    Logger.log('STOP: no campaign found with "' + CAMPAIGN_NAME_CONTAINS + '" in its name.');
    return;
  }
  var campaign = campaigns.next();
  Logger.log('Campaign: ' + campaign.getName());

  AD_GROUPS.forEach(function (g) { buildAdGroup(campaign, g); });

  var repair = findAdGroup(campaign, 'Roof Repair');
  if (repair) {
    addKeywords(repair, EXTRA_ROOF_REPAIR_KEYWORDS);
  } else {
    Logger.log('Note: no "Roof Repair" ad group found; skipped the 2 extra keywords.');
  }
  Logger.log('Done.');
}

function findAdGroup(campaign, name) {
  var it = campaign.adGroups()
    .withCondition("ad_group.name = '" + name + "'")
    .withCondition("ad_group.status != 'REMOVED'")
    .get();
  return it.hasNext() ? it.next() : null;
}

function buildAdGroup(campaign, g) {
  if (findAdGroup(campaign, g.name)) {
    Logger.log('Skip "' + g.name + '": already exists.');
    return;
  }
  var op = campaign.newAdGroupBuilder().withName(g.name).withStatus('ENABLED').build();
  if (!op.isSuccessful()) {
    Logger.log('FAILED ad group "' + g.name + '": ' + op.getErrors().join('; '));
    return;
  }
  var adGroup = op.getResult();
  Logger.log('Created ad group "' + g.name + '"');

  addKeywords(adGroup, g.keywords);

  var toAsset = function (t) { return { text: t }; };
  var adOp = adGroup.newAd().responsiveSearchAdBuilder()
    .withHeadlines(g.headlines.concat(SHARED_HEADLINES).map(toAsset))
    .withDescriptions(g.descriptions.map(toAsset))
    .withFinalUrl(g.url)
    .withPath1(g.path1)
    .withPath2(g.path2)
    .build();
  Logger.log(adOp.isSuccessful()
    ? '  + ad (' + (g.headlines.length + SHARED_HEADLINES.length) + ' headlines, ' + g.descriptions.length + ' descriptions) -> ' + g.url
    : '  FAILED ad: ' + adOp.getErrors().join('; '));
}

function addKeywords(adGroup, keywords) {
  keywords.forEach(function (k) {
    var op = adGroup.newKeywordBuilder().withText(k).build();
    Logger.log(op.isSuccessful() ? '  + keyword ' + k : '  FAILED keyword ' + k + ': ' + op.getErrors().join('; '));
  });
}
