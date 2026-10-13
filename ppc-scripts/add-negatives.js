// Google Ads script: adds new negative keywords to the shared list
// "Relaunch negatives". Edit NEW_NEGATIVES each time, Preview, then Run.
// Adding a keyword that is already on the list is harmless.

var LIST_NAME = 'Relaunch negatives';

// From the search terms report through 2026-10-11.
var NEW_NEGATIVES = [
  // Competitors
  '"5 star roofing"', '"best choice"', '"abc roofing"', '"armor roofing"', '"baker roofing"',
  '"best pro roofing"', '"bill ray"', '"blue ribbon"', '"bowen roofing"', '"brandon james"',
  '"centimark"', '"collier roofing"', '"ford roofing"', '"heartland roofing"', '"metal masters"',
  '"mid south roofing"', '"music city roofer"', '"premier roofing"', '"procare"',
  '"roof commander"', '"ryan roofing"', '"shingle rx"', '"storm guard"', '"styles roofing"',
  '"summit roofing"', '"roof dude"', '"three hartz"', '"tn recon"', '"true built"',
  '"weathertech"', '"zabala"', '"roof savers"', '"roofers mart"', '"mennonite"', '"erie"',
  // DIY, research, and assistance-program searches
  '"cement"', '"wet patch"', '"m seal"', '"leak stopper"', '"roof seal"', '"pipe collar"',
  '"how do you"', '"how long"', '"how often"', '"what to do"',
  '"estimator"', '"price list"', '"per foot"', '"sq ft"', '"homewyse"',
  '"largest roofing"', '"top 10"', '"top 100"', '"united states"',
  '"low income"', '"habitat for humanity"', '"program"', '"roof coatings"', '"crew"', '"locations"'
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
