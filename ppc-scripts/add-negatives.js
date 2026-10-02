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
  var lists = AdsApp.negativeKeywordLists()
    .withCondition("shared_set.name = '" + LIST_NAME + "'")
    .get();
  if (!lists.hasNext()) {
    Logger.log('STOP: no negative keyword list named "' + LIST_NAME + '".');
    return;
  }
  var list = lists.next();
  list.addNegativeKeywords(NEW_NEGATIVES);
  Logger.log('Added ' + NEW_NEGATIVES.length + ' negatives to "' + list.getName() + '".');
}
