
/**
 *
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  // Load the content script after jquery has been loaded.
  chrome.tabs.executeScript(null, { file: "bower_components/jquery/dist/jquery.js" }, function() {
    chrome.tabs.executeScript(null, { file: "src/content.js" });
  });
});
