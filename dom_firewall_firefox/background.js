'use strict';

//var storageArea = chrome.storage.local;
var respData = {};
var signatures = Sigs.signatures;

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
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    //BGAPI.verifyHTML(doc);
    str = str.replace(/<script/g, replacer);
    if (!respData[details.tabId]) {
     respData[details.tabId] = str;
    } 
    
    var newStr = new XMLSerializer().serializeToString(doc);
    //filter.write(encoder.encode(newStr.substring(0,newStr.indexOf("<html")-1) + doc.documentElement.outerHTML));
    //filter.write(encoder.encode("<!DOCTYPE HTML><html><head></head><body></body></html>"));
    filter.write(encoder.encode(str));
    filter.close();    
  };

  //return {}; // not needed
}

function sendResponse(details) {
  browser.tabs.sendMessage(details.tabId, {fullHTML: respData[details.tabId]}
    ).then(response => {console.log("response sent and acknowledged.")}).catch(err => {console.log(err)});
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["<all_urls>"], types: ["main_frame"]},
  ["blocking"]
);

/*browser.webRequest.onCompleted.addListener(
  sendResponse,
  {urls: ["<all_urls>"]}
);*/
browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var data = respData[sender.tab.id];
    delete respData[sender.tab.id];
    return Promise.resolve(data);
});

/*browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var handler = BGAPI[request.cmd];
    return handler(request.params, sender.tab.id).then(function (result) {
      console.log("sending response back");
      return result;
    }).catch(function (err) {
        console.error("invalid handler: " + request.cmd);
        return false;
    });
  });*/

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function checkAndSanitize(e, startTag, endTag, doc) {
  var s = doc.body.innerHTML;
  var first = fullHTML.indexOf(startTag);
  var last = reverseDOMSearch(startTag, doc.body.lastChild, endTag);
  //first and last should be valid because the webpage is running the plugin with them
  //TODO: fix this
  var eTag = reverseDOMSearch(startTag, last, e.tagHTML);

  //if e is happening within bounds of first and last, i.e. within an injection point, stop JS execution
  if (!!eTag) {
    e.setAttribute("data-execute", "false");
    //var between = s.substr(first,last-first);
    //e.preventDefault();
    //var sanitized = DOMPurify.sanitize(between);
    //document.body.innerHTML = s.substring(0, first) + sanitized + s.substring(last);
  }
}


//Search for a DOM element identified by 'query' between 'start' and 'end'
//in reverse order
//TODO: make into a promise
function reverseDOMSearch(start, end, query) {
  if (!end || start === end) {
    return null;
  }
  
  //TODO: change this to a better comparison check,
  //otherwise there's no way of telling if you have the right 'query'
  if (end === query) {
    return end;
  }

  var previous = $(end).prev()[0];
  var lastChild = $(end).children().last()[0];
  var childrenSearch = reverseDOMSearch(start, lastChild, query);

  if (!!childrenSearch) {
    return childrenSearch;
  } else {
    return reverseDOMSearch(start, previous, query);
  }

}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}


function getCurrPlugins() {
  //TODO: get curr plugins
  return "wpPlugin";
}


var BGAPI = {

  retrieveHTML: function(params, tabId) {
    var data = respData[tabId];
    delete respData[tabId];
    return Promise.resolve(data);
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

  verifyHTML: function(doc) {

    var endPointsList = [];     

    var currPlugins = getCurrPlugins();
    for (var i=0; i < signatures.length; i++) {
      var signature = signatures[i];
      var software = signature.software;
      var softwareList = software.split('#').map(x => x.trim());
      if (softwareList.includes(currPlugins)) {
        endPointsList.push(signature.endPoints);
      }
    }

    //var endPointsList = params.endPointsList;
    //var documentToScan = doc.getElementById(tabId).innerHTML;

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

    //return new Promise(function(resolve, reject) {
      //var promises = [];

      var scripts = doc.getElementsByTagName("script");

      for (var j=0; j<scripts.length; j++) {
        var e = scripts[j];
        for (var i=0; i<endPointsList.length; i++) {
          var start = htmlToElement(endPointsList[i][0]);
          var startTags = Array.from(doc.getElementsByTagName(start.tagName));
          var startTag = Array.from(startTags).filter(elm => filterTag(start, elm))[0];

          //if !startTag, startTag hasn't loaded in the HTML yet, we are not in the correct event
          

          var end = htmlToElement(endPointsList[i][1]);
          var endTags = Array.from(doc.getElementsByTagName(end.tagName));
          var endTag = Array.from(endTags).filter(elm => filterTag(end, elm))[0];


          //Check if event e occurs within startTag and endTag and stop it from running
          if (!startTag) {
            continue;
          } else {
            //TODO: if the design is so that all content between endpoints is sanitized (as opposed to just disabling the single event) 
            //make it so that if e matches, remove the end points from list, so we don't keep repeating work.
            checkAndSanitize(e, startTag, endTag, doc);
          }
        }
      }
  }


};

