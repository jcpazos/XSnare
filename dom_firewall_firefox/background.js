'use strict';

//var storageArea = chrome.storage.local;

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

