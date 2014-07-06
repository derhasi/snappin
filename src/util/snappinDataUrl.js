
var snappinDataUrl = snappinDataUrl || {};

/**
 * Crops a given dataURL to the dimensions
 *
 * @param {String} dataURL
 * @param {Object} dimensions
 * @param {Integer} dimensions.x
 * @param {Integer} dimensions.y
 * @param {Integer} dimensions.w
 * @param {Integer} dimensions.h
 * @param {snappinDataUrl~dataURLCallback} callback
 */
snappinDataUrl.dataURLCrop = function (dataURL, dimensions, callback) {
  // We create a canvas element in the current document. Working with the
  // element seems to work without embedding it to the DOM, so we do not add it
  // to the actual DOM and simply use it as temporary container for our image
  // manipulation.
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  context.canvas.width = dimensions.w;
  context.canvas.height = dimensions.h;

  // load image from data url
  var imageObj = new Image();
  imageObj.onload = function() {
    context.drawImage(this, -1 * dimensions.x , -1 * dimensions.x);

    // Create new dataurl for cropped image.
    var croppedDataUrl = canvas.toDataURL();

    callback(croppedDataUrl);

  };
  imageObj.src = dataURL;
}

/**
 * Callback for returning a data URl.
 *
 * @callback snappinDataUrl~dataURLCallback
 *
 * @param {string} dataUrl
 */
