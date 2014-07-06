

var snappinPinterest = snappinPinterest || {};

snappinPinterest.buildURL = function (imageURL, shareURL, description) {

  var pinBase = "http://www.pinterest.com/pin/create/button/";
  var imgEncoded = encodeURIComponent(imageURL);
  var shareURLEncoded = encodeURIComponent(shareURL);
  var descrEncoded = encodeURIComponent(description);

  // @todo: pinterest does not work with dara urls, so we may need a service
  // to build the url
  // maybe to imgur using
  // @see http://29a.ch/2011/9/11/uploading-from-html5-canvas-to-imgur-data-uri
  var url = pinBase;
  url += '?url=' + shareURLEncoded;
  url += '&media=' + imgEncoded
  url += '&description=' + descrEncoded;

  console.log(url);

  return url;
}
