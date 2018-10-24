'use strict';

//var storageArea = chrome.storage.local;
var respData = [];

function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
    let str = decoder.decode(event.data, {stream: true});
    respData.push(str);
    // Just change any instance of Example in the HTTP response
    // to WebExtension Example.
    str = str.replace(/xss/g, 'WebExtension Example');
    filter.write(encoder.encode(str));
    filter.disconnect();
  }

  //return {}; // not needed
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["<all_urls>"], types: ["main_frame"]},
  ["blocking"]
);

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var handler = BGAPI[request.cmd];
    return handler(request.params).then(function (result) {
      console.log("sending response back");
      return {doc: result};
    }).catch(function (err) {
        console.error("invalid handler: " + request.cmd);
        return false;
    });
  });

var BGAPI = {
  parseHTMLBlob: function(params) {
    return new Promise(function(resolve, reject) {
      //TODO: do better checks on app version, plugins, etc.
      var verifyMethod = params.sigType;
      var verifySrc = params.src;

      BGAPI[verifyMethod](verifySrc, params.doc).then(function (result) {

      });

      console.log(params.doc);
      //TODO: load app-specific signatures

      //TODO: apply signatures and do checks


      //TODO: return modified doc
      var parsed = params.doc;
      resolve(parsed);
    });
  },

  verifyHTML: function(src, document) {
    
  }


};

