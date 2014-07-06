
var snappinImgur = snappinImgur || {};

/**
 *
 * @param {string} dataUrl
 * @param {snappinImgur~uploadCallback} callback
 */
snappinImgur.upload = function(dataUrl, callback) {


  var xhr = new XMLHttpRequest();

  xhr.open("POST", "https://api.imgur.com/3/image", true);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Client-ID 281b366e55f86e5');

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);

      // In the case the request was succcesfull, we got some data, to pass to
      // our application.
      if (resp.success) {
        callback(null, resp.data.link, resp.data);
      }
      // Otherweise we got an error and pass that error object.
      else {
        callback(data);
      }



    }
  }

  // We only need the base64 part for our url to be shared.
  var dataBase64 = dataUrl.replace(/.*,/, '');

  var data = {
    image: dataBase64,
    type: "base64"
  };

  xhr.send(JSON.stringify(data));

}

/**
 * Callback for returning a data URl.
 *
 * @callback snappinImgur~uploadCallback
 *
 * @param {Object} err
 * @param {String} link
 * @param {Object} deleteData
 */
