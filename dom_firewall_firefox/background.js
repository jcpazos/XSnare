'use strict';

//var storageArea = chrome.storage.local;
var respData = {};

function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  var replacer = function(match, offset, string) {
    return '<script id="' + window.crypto.getRandomValues(new Uint16Array(1)) + '"';
  }

  let str = "";
  filter.ondata = event => {
    str += decoder.decode(event.data, {stream: true});
  };

  filter.onstop = event => {
    // Add a random ID to each script for comparison in the contentscript
    str = str.replace(/<script/g, replacer);
    !!respData[details.tabId] ? respData[details.tabId] += str : respData[details.tabId] = str;
    filter.write(encoder.encode(str));
    filter.close();    
  };

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
    return handler(request.params, sender.tab.id).then(function (result) {
      console.log("sending response back");
      return result;
    }).catch(function (err) {
        console.error("invalid handler: " + request.cmd);
        return false;
    });
  });

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


var BGAPI = {

  retrieveHTML: function(params, tabId) {
    return Promise.resolve(respData[tabId]);
  },

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

  verifyHTML: function(params, tabId) {

    var endPointsList = params.endPointsList;
    var documentToScan = document.getElementById(tabId).innerHTML;

    var filterTag = function(toFind, elm) {
      var toFindAttrs = toFind.attributes;
      var elmAttrs = elm.attributes;
      if (toFindAttrs.length != elmAttrs.length) {
        return false;
      }

      for (var i=0; i < toFindAttrs.length; i++) {
        if (toFindAttrs[i].name !== elmAttrs[i].name || toFindAttrs[i].value !== elmAttrs[i].value) {
          return false;
        }
      }

      return true;
    };

    return new Promise(function(resolve, reject) {
      var promises = [];

      for (var i=0; i<endPointsList.length; i++) {
        var start = htmlToElement(endPointsList[i][0]);
        var startTags = Array.from(document.getElementsByTagName(start.tagName));
        var startTag = Array.from(startTags).filter(elm => filterTag(start, elm))[0];

        //if !startTag, startTag hasn't loaded in the HTML yet, we are not in the correct event
        

        var end = htmlToElement(endPointsList[i][1]);
        var endTags = Array.from(document.getElementsByTagName(end.tagName));
        var endTag = Array.from(endTags).filter(elm => filterTag(end, elm))[0];


        //Check if event e occurs within startTag and endTag and stop it from running
        if (!startTag) {
          promises.push(resolve("success"));
        } else {
          //TODO: if the design is so that all content between endpoints is sanitized (as opposed to just disabling the single event) 
          //make it so that if e matches, remove the end points from list, so we don't keep repeating work.
          promises.push(checkAndSanitize(e, startTag, endTag));
        }
      }

      Promise.all(promises).then(function (res) {
        resolve("success");
      }).catch(function(err) {
        reject("failed");
      });
    });
  }


};

