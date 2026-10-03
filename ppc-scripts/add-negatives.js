// Google Ads script: adds new negative keywords to the shared list
// "Relaunch negatives". Edit NEW_NEGATIVES each time, Preview, then Run.
// Adding a keyword that is already on the list is harmless.

var LIST_NAME = 'Relaunch negatives';

// From the 2026-09-29 to 10-01 search terms report.
var NEW_NEGATIVES = [
  // Competitors and Maps-style business lookups
  '"above all roofing"', '"garcia brothers"', '"4 square roofing"', '"bill reagan"',
  '"carter & sons"', '"erie home"', '"feazel"', '"hayes brothers"', '"henry & sons"',
  '"henry brothers"', '"hernandez & sons"', '"jolly roofing"', '"midsouth construction"',
  '"radnor roofing"', '"rd herbert"', '"robinson family"', '"rss nashville"',
  '"shaded acres"', '"southern roofing"', '"stephen pinaire"', '"union roofing"',
  '"valdez & sons"', '"llc"', '"brothers"', '"& sons"', '"and sons"',
  // Products and DIY
  '"sealer"', '"sealant"', '"coating"', '"pipe boot"'
];

function main() {
  // Match the list name ignoring capitals ("Relaunch Negatives" vs "Relaunch negatives").
  var list = null;
  var lists = AdsApp.negativeKeywordLists().get();
  while (lists.hasNext()) {
    var l = lists.next();
    if (l.getName().toLowerCase() === LIST_NAME.toLowerCase()) list = l;
  }
  if (!list) {
    Logger.log('STOP: no negative keyword list named "' + LIST_NAME + '".');
    return;
  }
  list.addNegativeKeywords(NEW_NEGATIVES);
  Logger.log('Added ' + NEW_NEGATIVES.length + ' negatives to "' + list.getName() + '".');
}
