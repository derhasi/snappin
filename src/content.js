
(function ($) {

  // Remove any olverlays on init.
  removeOverlay();

  var overlay = $("<div id=\"snappinOverlay\"><div id=\"snappinClose\"></div></div>" ).appendTo("body");

  /**
   * Place area on mousedown.
   */
  overlay.mousedown(function (e) {

    $('#snappinArea').remove();
    var area = $("<div id=\"snappinArea\"></div>" ).appendTo(overlay);

    var pos = {
      left: e.pageX,
      top: e.pageY
    }

    // Set the position of the area.
    area.offset(pos);

    // Update area dimensions on mouse move.
    overlay.mousemove(function(e2) {
      area.width(e2.pageX - pos.left);
      area.height(e2.pageY - pos.top);
    });

    // On mouse up, we end the area update.
    overlay.mouseup(function() {
      overlay.unbind('mousemove');

      takeScreenshot(overlay, area);
    })


  });

  /**
   * Helper to remove overlay.
   */
  function removeOverlay() {
    $('#snappinOverlay, #snappinClose, #snappinArea').remove();
  }

  /**
   * Helper to initialise the screenshot for the given overlay and selected
   * area.
   */
  function takeScreenshot(overlay, area) {

    var overlayOffset = overlay.offset();
    var areaOffset = area.offset();

    var dim = {
      x: areaOffset.left - overlayOffset.left,
      y: areaOffset.top - overlayOffset.top,
      w: area.outerWidth(),
      h: area.outerHeight()
    };
    console.log('dim', dim);

    // Remove the overlay, before we take the screenshot.
    removeOverlay();

    // Send message to the backgrund page, so a screenshot can be taken.
    chrome.runtime.sendMessage({dimensions: dim}, function(response) {
      console.log(response);
    });


  }


})(jQuery);
