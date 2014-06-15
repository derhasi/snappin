// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
// Note: It's OK that this is a global variable (and not in localStorage),
// because the event page will stay open as long as any screenshot tabs are
// open.
var id = 100;

function takeScreenshot() {
  chrome.tabs.captureVisibleTab(null, function(img) {

    console.log(img);

    var pinBase = "http://www.pinterest.com/pin/create/button/";
    var imgEncoded = encodeURIComponent(img);
    var shareURL = "http://undpaul.de";
    var shareURLEncoded = encodeURIComponent(shareURL);
    var descrEncoded = encodeURIComponent('Title');

    // @todo: pinterest does not work with dara urls, so we may need a service
    // to build the url
    // maybe to imgur using
    // @see http://29a.ch/2011/9/11/uploading-from-html5-canvas-to-imgur-data-uri
    var url = pinBase;
    url += '?url=' + shareURLEncoded;
    url += '&media=' + imgEncoded
    url += '&description=' + descrEncoded;

    console.log(url);

    chrome.tabs.create({
      url: url
    });

//    chrome.tabs.create({url: viewTabUrl}, function(tab) {
//      var targetId = tab.id;
//
//      var addSnapshotImageToTab = function(tabId, changedProps) {
//        // We are waiting for the tab we opened to finish loading.
//        // Check that the the tab's id matches the tab we opened,
//        // and that the tab is done loading.
//        if (tabId != targetId || changedProps.status != "complete")
//          return;
//
//        // Passing the above test means this is the event we were waiting for.
//        // There is nothing we need to do for future onUpdated events, so we
//        // use removeListner to stop geting called when onUpdated events fire.
//        chrome.tabs.onUpdated.removeListener(addSnapshotImageToTab);
//
//        // Look through all views to find the window which will display
//        // the screenshot.  The url of the tab which will display the
//        // screenshot includes a query parameter with a unique id, which
//        // ensures that exactly one view will have the matching URL.
//        var views = chrome.extension.getViews();
//        for (var i = 0; i < views.length; i++) {
//          var view = views[i];
//          if (view.location.href == viewTabUrl) {
//            view.setScreenshotUrl(screenshotUrl);
//            break;
//          }
//        }
//      };
//      chrome.tabs.onUpdated.addListener(addSnapshotImageToTab);
//    });
  });
}

// Listen for a click on the camera icon.  On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function(tab) {
  takeScreenshot();
});
