// Google Ads script: adds new negative keywords to the shared list
// "Relaunch negatives". Edit NEW_NEGATIVES each time, Preview, then Run.
// Adding a keyword that is already on the list is harmless.

var LIST_NAME = 'Relaunch negatives';

// From the search terms report through 2026-10-06.
var NEW_NEGATIVES = [
  // Competitors
  '"valor roofing"', '"weatherguard"', '"summit ridge"', '"top dawg"', '"watson roofing"',
  '"taltek"', '"risher"', '"steve keese"', '"parmer"', '"metro roofing"', '"a 1 roofing"',
  '"next level roofing"', '"proudfoot"', '"tim rigsby"', '"abs roofing"', '"highway roofing"',
  '"nextdoor roofing"', '"no limits roofing"', '"redemption roofing"', '"family roof repair"',
  '"executive park"', '[top roofing]',
  // DIY and product searches
  '"turbo poly"', '"roof patch"', '"what\'s good"', '"sealing"', '"leak source"',
  '"spray"', '"flex armor"', '"erie metal"'
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
