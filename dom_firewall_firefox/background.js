'use strict';

//var storageArea = chrome.storage.local;
var respData = {};
var signatures = Sigs.signatures;

String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

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
    /*var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');*/
    //BGAPI.verifyHTML(doc);
    try {
      str = verifyHTML(str);
    } catch(err) {
      str = "<!DOCTYPE HTML><html><head></head><body>This webpage has been identified as malicious and was stopped from loading</body></html>";
    }
    //str = str.replace(/<script/g, replacer);
    /*if (!respData[details.tabId]) {
     respData[details.tabId] = str;
    } */
    //var comment = "<!--" + (str.substr(str.indexOf("<html"))).replace(/-->/g, "") + "-->\n";
    //var strComm = str.substring(0,str.indexOf("<html")-1) + comment.replace(/(\r\n|\n|\r)/gm, "") + str.substr(str.indexOf("<html")-1);
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


function checkAndSanitize(e, startIndex, endIndex) {
  //if we can't find start and end, the HTML doesn't match what we expected it to be
  if (startIndex || endIndex == -1) {
    throw new Error("HTML doesn't match expected form.")
    return;
  }
  var elementRegex = new RegExp('id="' + e.target.id + '"', 'g');
  var elementIndex = elementRegex.exec(fullHTML).index;
  //check if e.target is in between startTag and endTag
  if (startIndex < elementIndex && elementIndex < endIndex) {
    e.preventDefault();
    console.log("Prevented a malicious script!");
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


function isRunningPlugin(HTMLString, plugin) {
  //TODO: get curr plugins
  var regex = new RegExp("html>.*" + plugin + ".*<\/html>", "g");
  if (HTMLString.match(regex)) {
    return true;
  }
  return false;

}

function inInjectionPoint(scriptIndex, endPointsIndices) {

  for (var i =0; i<endPointsIndices.length; i++) {
    if (endPointsIndices[i][0] < scriptIndex && scriptIndex < endPointsIndices[i][1]) {
      return true;
    }
  }
  return false;
}

function findLastIndex(regex, HTMLString) {
  var currMatch;
  var match;
  while (match = regex.exec(HTMLString)) {
    currMatch = match;
  }
  return !!currMatch ? currMatch.index : -1;
}

function getRegexIndices(regex, string) {
  var indices = [];
  var match;
  while (match = regex.exec(string)) {
    indices.push(match.index);
  }
  return indices;
}

//converts a signature to regex to match HTML string against element HTML tag
function sigToRegex(signatureHTMLTag) {
  //const regex = /<\s*option\s+class=(\\"|'|"\/)level-0(\\"|'|")\s+value=(\\"|'|"\/)[^>]*(\\"|'|")\s*>/g;
  let s = `<\\s*` + signatureHTMLTag.tagName.toLowerCase();
  for (var i=0; i <signatureHTMLTag.attributes.length; i++) {
    s+=`\\s+`+signatureHTMLTag.attributes[i].name + `=(\\"|'|"\/)` + signatureHTMLTag.attributes[i].value + `(\\"|'|")`;
  }
  s+=`\\s*>`;

  return new RegExp(s, 'g');
}

function verifyHTML(HTMLString) {

    var currPlugins = getCurrPlugins(HTMLString);
    var endPointsList = [];

    for (var i=0; i < signatures.length; i++) {
      var signature = signatures[i];
      var software = signature.software;
      var softwareList = software.split('#').map(x => x.trim());
      if (isRunningPlugin(HTMLString, signature.softwareDetails)) {
        endPointsList.push(signature.endPoints);
      }
    }

    var endPointsIndices = [];
    
    for (var i=0; i<endPointsList.length; i++) {
      var start = htmlToElement(endPointsList[i][0]);
      var startRegex = sigToRegex(start);
      var startIndex = startRegex.exec(HTMLString);
      var startIndex = !!startIndex ? startIndex.index : -1;

      
      var end = htmlToElement(endPointsList[i][1]);
      var endRegex = sigToRegex(end);
      var endIndex = findLastIndex(endRegex, HTMLString);

      if (startIndex == -1 || endIndex == -1) {
        throw new Error("Invalid HTML, doesn't match expected");
      }
      endPointsIndices.push([startIndex, endIndex]);
    }

    var scriptsStart = getRegexIndices(/<script/g, HTMLString);
    var scriptsEnd = getRegexIndices(/<\/script>/g, HTMLString);
    if (scriptsStart.length != scriptsEnd.length) {
      throw new Error("Invalid HTML, improperly balanced script tags");
    }

    for (var i=0; i<scriptsStart.length; i++) {
      if (inInjectionPoint(scriptsStart[i], endPointsIndices))
        HTMLString = HTMLString.replaceBetween(scriptsStart[i],scriptsEnd[i], "");
    }
    return HTMLString;
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

