
/**
 *
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  // Load the content script after jquery has been loaded.
  chrome.tabs.executeScript(null, { file: "bower_components/jquery/dist/jquery.js" }, function() {
    chrome.tabs.executeScript(null, { file: "src/content.js" });
  });

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");

    if (request.dimensions != undefined) {
      takeScreenshot(request.dimensions);

      sendResponse({farewell: "goodbye"});
    }

   });
});


function takeScreenshot(dimensions) {

  chrome.tabs.captureVisibleTab({format: "png"}, function(img) {

    console.log(img);

    var url = img;

    snappinDataUrl.dataURLCrop(url, dimensions, function (croppedDataUrl) {

      chrome.tabs.create({
        url: croppedDataUrl
      });

    });

  });
}


