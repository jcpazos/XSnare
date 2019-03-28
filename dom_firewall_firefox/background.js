'use strict';

//var storageArea = chrome.storage.local;
const respData = {};
const mainFrameSignatures = Sigs.main_frame_signatures;
const scriptSignatures = Sigs.script_signatures;
let endPointsList = [];
let scriptsList = [];
let scriptReplaceValues = [];

String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

function mainFrameListener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  const replacer = function () {
    //TODO: instead of replacing id, consider adding a new attribute or a 'safe' class, since IDs are sometimes important
    return '<script id="' + /*window.crypto.getRandomValues(new Uint16Array(1))*/"safe" + '"';
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
        //TODO: mark verified scripts as 'safe' so contentscript doesn't check them again for dynamic checks
        str = verifyHTML(str, details.url);
    } catch(err) {
        console.log("Error when verifying HTML: " + err);
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

/*function xhrListener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  let str = "";
  filter.ondata = event => {
    str += decoder.decode(event.data, {stream: true});
  };

  filter.onstop = event => {

    filter.write(encoder.encode(str));
    filter.close();    
  };
}*/


function replaceInScript(str, toReplace, replaceValue) {
  //TODO: In str, replace string toReplace or string starting at index toReplace with replaceValue
}

function scriptListener(details) {
  if (!scriptsList.includes(details.url)) {
    return {};
  }
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();
  let str = "";
    filter.ondata = event => {
      str += decoder.decode(event.data, {stream: true});
      let i;
      let currScript = scriptReplaceValues[scriptsList.indexOf(details.url)];
      for (i=0; i < currScript.length; i++) {
        str = replaceInScript(str, currScript[0][i], currScript[1][i]);
      }
      let newStr = encoder.encode(str);
      filter.write(newStr);
      filter.disconnect();
    };
  return {};
}

/*function specListener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  let str = "";
  filter.ondata = event => {
    str += decoder.decode(event.data, {stream: true});
  };

  filter.onstop = event => {

    filter.write(encoder.encode(str));
    filter.close();    
  };
}*/

browser.webRequest.onBeforeRequest.addListener(
  mainFrameListener,
  {urls: ["<all_urls>"], types: ["main_frame"]},
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  scriptListener,
  {urls: ["<all_urls>"], types: ["script"]},
  ["blocking"]
);


/*browser.webRequest.onBeforeRequest.addListener(
    xhrListener,
    {urls: ["<all_urls>"], types: ["xmlhttprequest"]},
    ["blocking"]
);


browser.webRequest.onBeforeRequest.addListener(
    specListener,
    {urls: ["<all_urls>"], types: ["speculative"]},
    ["blocking"]
);*/




/**
 * @param {String} html representing a single element
 * @return {ChildNode}
 */
function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    if (!template.innerHTML) {
        template.innerHTML = html + ">";
    }
    return template.content.firstChild;
}


function isRunningPlugin(HTMLString, plugin) {
    //TODO: get curr plugins
    const regex = new RegExp(plugin);
    return !!HTMLString.substring(HTMLString.indexOf("<head>"), HTMLString.indexOf("</head>")).match(regex);


}
function inInjectionPoint(scriptIndex, endPointsIndices) {

  for (let i =0; i<endPointsIndices.length; i++) {
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
function sigToRegex(signatureHTMLTag, isComplete) {
    //const regex = /<\s*option\s+class=(\\"|'|"\/)level-0(\\"|'|")\s+value=(\\"|'|"\/)[^>]*(\\"|'|")\s*>/g;

    let s = `<\\s*` + signatureHTMLTag.tagName.toLowerCase();
    for (let i=0; i <signatureHTMLTag.attributes.length; i++) {
        s+=`\\s+`+signatureHTMLTag.attributes[i].name + `=(\\"|'|"\/)` + signatureHTMLTag.attributes[i].value.replace(/(?=[() ])/g, '\\') + `(\\"|'|")`;
    }
    if (isComplete === "complete") {
        s+=`\\s*>`;
    }
    return new RegExp(s, 'g');
}

function isURL(signatureUrl, HTMLUrl) {
    return signatureUrl === HTMLUrl;
}

function loadSignatures(HTMLString, url) {
  let i;
  for (i = 0; i < mainFrameSignatures.length; i++) {
    const signature = mainFrameSignatures[i];
    //const software = signature.software;
    //const softwareList = software.split('#').map(x => x.trim());
    if (isRunningPlugin(HTMLString, signature.softwareDetails) || isURL(signature.url, url)) {
      endPointsList.push(signature.endPoints.concat(signature.sigType));
    }
  }

  for (i=0; i < scriptSignatures.length; i++) {
    const signature = scriptSignatures[i];
    //const software = signature.software;
    //const softwareList = software.split('#').map(x => x.trim());
    if (isRunningPlugin(HTMLString, signature.softwareDetails) || isURL(signature.url, url)) {
      scriptsList.push(signature.url);
      scriptReplaceValues.push([signature.toReplace, signature.replaceValues]);
    }
  }
}

function verifyHTML(HTMLString, url) {

  let i;

  loadSignatures(HTMLString, url);

  const endPointsIndices = [];

  for (i = 0; i<endPointsList.length; i++) {
    const start = htmlToElement(endPointsList[i][0]);
    const startRegex = sigToRegex(start,endPointsList[i][2]);
    let startMatch = startRegex.exec(HTMLString);
    let startIndex = !!startMatch ? startMatch.index : -1;


    const end = htmlToElement(endPointsList[i][1]);
    const endRegex = sigToRegex(end,endPointsList[i][3]);
    const endIndex = findLastIndex(endRegex, HTMLString);

    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Invalid HTML, doesn't match expected");
    }
    endPointsIndices.push([startIndex, endIndex]);
  }

  const scriptsStart = getRegexIndices(/<script/g, HTMLString);
  const scriptsEnd = getRegexIndices(/(<\/script>|<\\\/script>)/g, HTMLString);
  if (scriptsStart.length !== scriptsEnd.length) {
    throw new Error("Invalid HTML, improperly balanced script tags");
  }

  for (i = 0; i<scriptsStart.length; i++) {
    if (inInjectionPoint(scriptsStart[i], endPointsIndices))
      HTMLString = HTMLString.replaceBetween(scriptsStart[i],scriptsEnd[i], "");
  }
  return HTMLString;
}



/*
var BGAPI = {

  retrieveHTML: function(params, tabId) {
    var data = respData[tabId];
    delete respData[tabId];
    return Promise.resolve(data);
  }

};*/

