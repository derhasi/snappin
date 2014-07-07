
(function ($) {

  // Remove any olverlays on init.
  $('#snappinOverlay, #snappinClose, #snappinArea').remove();

  var overlay = $("<div id=\"snappinOverlay\"><div id=\"snappinClose\"></div></div>" ).appendTo("body");


  var dimensions = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };

  $('#snappinOverlay').mousedown(function (e) {

    console.log(e);

    $('#snappinArea').remove();
    var area = $("<div id=\"snappinArea\"></div>" ).appendTo("#snappinOverlay");

    dimensions.left = e.pageX;
    dimensions.top = e.pageY;

    console.log(dimensions);

    // Set the position of the area.
    area.offset(dimensions);

    // Update area dimensions on mouse move.
    $('#snappinOverlay').mousemove(function(e2) {
      area.width(e2.pageX - dimensions.left);
      area.height(e2.pageY - dimensions.top);
    });

    // On mouse up, we end the area update.
    $('#snappinOverlay').mouseup(function() {
      $('#snappinOverlay').unbind('mousemove');
    })

    // @todo: initScreenshot()

  });

  function initScreenshot(dimensions) {
    chrome.runtime.sendMessage({dimensions: dimensions}, function(response) {
      console.log(response.farewell);
    });
  }


})(jQuery);
