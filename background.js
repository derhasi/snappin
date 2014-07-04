
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
  chrome.tabs.captureVisibleTab(null, function(img) {

    console.log(img);

    var url = img;

    fillCanvas(url, dimensions, function (canvas) {

      // Create new dataurl for cropped image.
      var croppedDataUrl = canvas.toDataURL();

      chrome.tabs.create({
        url: croppedDataUrl
      });

    });

  });
}


function fillCanvas(dataURL, dimensions, callback) {
  var canvas = document.getElementById('snappinCanvas');
  var context = canvas.getContext('2d');

  context.canvas.width = dimensions.w;
  context.canvas.height = dimensions.h;

  // load image from data url
  var imageObj = new Image();
  imageObj.onload = function() {
    context.drawImage(this, -1 * dimensions.x , -1 * dimensions.x);

    callback(canvas);
  };
  imageObj.src = dataURL;

}

