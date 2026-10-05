// Google Ads script: adds new negative keywords to the shared list
// "Relaunch negatives". Edit NEW_NEGATIVES each time, Preview, then Run.
// Adding a keyword that is already on the list is harmless.

var LIST_NAME = 'Relaunch negatives';

// From the search terms report through 2026-10-04.
var NEW_NEGATIVES = [
  // Competitors
  '"2m roofing"', '"bone dry"', '"distinctive roofing"', '"level 7"', '"all above roofing"',
  '"ragan"', '"rivera family"',
  // DIY and product searches
  '"flex seal"', '"liquid nails"', '"caulk"', '"best product"', '"crazy seal"',
  '"handyman"', '"screws"',
  // Research, not ready to hire
  '"how much"', '"pictures"', '"cheaper"', '"vs"', '"spanish tile"', '"pitched roof"',
  // Spanish-language searches
  '"cerca de mi"'
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
