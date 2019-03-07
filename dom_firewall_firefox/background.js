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

  const replacer = function () {
    return '<script id="' + window.crypto.getRandomValues(new Uint16Array(1)) + '"';
  };

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

/*browser.webRequest.onCompleted.addListener(
  sendResponse,
  {urls: ["<all_urls>"]}
);*/


/**
 * @param {String} html representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}


function isRunningPlugin(HTMLString, plugin) {
  //TODO: get curr plugins
  let regex = new RegExp("html>.*" + plugin + ".*<\/html>", "g");
  return !!HTMLString.match(regex);


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
  let currMatch;
  let match;
  while (match = regex.exec(HTMLString)) {
    currMatch = match;
  }
  return !!currMatch ? currMatch.index : -1;
}

function getRegexIndices(regex, string) {
  let indices = [];
  let match;
  while (match = regex.exec(string)) {
    indices.push(match.index);
  }
  return indices;
}

//converts a signature to regex to match HTML string against element HTML tag
function sigToRegex(signatureHTMLTag) {
  //const regex = /<\s*option\s+class=(\\"|'|"\/)level-0(\\"|'|")\s+value=(\\"|'|"\/)[^>]*(\\"|'|")\s*>/g;
  let s = `<\\s*` + signatureHTMLTag.tagName.toLowerCase();
  for (let i=0; i <signatureHTMLTag.attributes.length; i++) {
    s+=`\\s+`+signatureHTMLTag.attributes[i].name + `=(\\"|'|"\/)` + signatureHTMLTag.attributes[i].value + `(\\"|'|")`;
  }
  s+=`\\s*>`;

  return new RegExp(s, 'g');
}

function verifyHTML(HTMLString) {

  let i;
  const currPlugins = getCurrPlugins(HTMLString);
  const endPointsList = [];

  for (i = 0; i < signatures.length; i++) {
    const signature = signatures[i];
    const software = signature.software;
    const softwareList = software.split('#').map(x => x.trim());
    if (isRunningPlugin(HTMLString, signature.softwareDetails)) {
      endPointsList.push(signature.endPoints);
    }
  }

  const endPointsIndices = [];

  for (i = 0; i<endPointsList.length; i++) {
    const start = htmlToElement(endPointsList[i][0]);
    const startRegex = sigToRegex(start);
    let startMatch = startRegex.exec(HTMLString);
    let startIndex = !!startMatch ? startMatch.index : -1;


    const end = htmlToElement(endPointsList[i][1]);
    const endRegex = sigToRegex(end);
    const endIndex = findLastIndex(endRegex, HTMLString);

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Invalid HTML, doesn't match expected");
    }
    endPointsIndices.push([startIndex, endIndex]);
  }

  const scriptsStart = getRegexIndices(/<script/g, HTMLString);
  const scriptsEnd = getRegexIndices(/<\/script>/g, HTMLString);
  if (scriptsStart.length !== scriptsEnd.length) {
    throw new Error("Invalid HTML, improperly balanced script tags");
  }

  for (i = 0; i<scriptsStart.length; i++) {
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
  }

};

