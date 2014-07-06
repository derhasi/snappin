
(function ($) {

  $('body').css('background', 'red');

  console.log(top);

  $('body').click(function() {
    var dimensions = {"x": 100, "y": 100, "w": 500, "h": 500};

    chrome.runtime.sendMessage({dimensions: dimensions}, function(response) {
      console.log(response.farewell);
    });

  });


})(jQuery);
