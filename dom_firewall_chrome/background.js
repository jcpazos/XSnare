// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var storageArea = chrome.storage.local;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var handler = BGAPI[request.cmd];
    if (!handler) {
        console.error("invalid handler: " + request.cmd);
    }
    handler(request.params).then(function (result) {
      console.log("sending response back");
      sendResponse({doc: result});
    });
    return true;
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

