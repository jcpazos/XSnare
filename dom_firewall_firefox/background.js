'use strict';

//var storageArea = chrome.storage.local;
const respData = {};
const mainFrameSignatures = Sigs.main_frame_signatures;
const scriptSignatures = Sigs.script_signatures;
let endPointsList = [];
let scriptsList = [];
let scriptReplaceValues = [];
let currSigs = [];
let xhrEndPointsList = [];
let xhrCurrSigs = [];
let probes = {};

String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

function mainFrameListener(details) {
  //reset array values
  endPointsList = [];
  scriptsList = [];
  scriptReplaceValues = [];
  currSigs = [];
  xhrEndPointsList = [];
  xhrCurrSigs = [];
  probes = {};
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
    try {
        //TODO: mark verified scripts as 'safe' so contentscript doesn't check them again for dynamic checks
        str = verifyHTML(str, details.url, details.tabId);
    } catch(err) {
        debugger;
        console.log("Error when verifying HTML: " + err);
        //TODO: advice the user that a vulnerability has been found. maybe add an alert box to the HTML.
        str = "<!DOCTYPE HTML><html><head></head><body>This webpage has been identified as malicious and was stopped from loading</body></html>";
    }
    //str = str.replace(/<script/g, replacer);
    filter.write(encoder.encode(str));
    //endTime = new Date();
    //console.log(endTime-startTime);
    filter.close();    
  };

  //return {}; // not needed
}

function xhrListener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  let str = "";
  filter.ondata = event => {
    str += decoder.decode(event.data, {stream: true});
  };

  filter.onstop = event => {

    try {
      str = verifyXHR(str, details.url);
    } catch(err) {
      debugger;
      console.log("Error when verifying XHR: " + err);
      //TODO: advice the user that a vulnerability has been found. maybe add an alert box to the HTML.
      //str = "";
    }
    filter.write(encoder.encode(str));
    filter.close();    
  };
}


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

/*browser.webRequest.onBeforeRequest.addListener(
  scriptListener,
  {urls: ["<all_urls>"], types: ["script"]},
  ["blocking"]
);*/


/*browser.webRequest.onBeforeRequest.addListener(
    xhrListener,
    {urls: ["<all_urls>"], types: ["xmlhttprequest"]},
    ["blocking"]
);*/


/*browser.webRequest.onBeforeRequest.addListener(
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
  if (!template.innerHTML) {
    template.innerHTML = html + '">';
  }
    return template.content.firstChild;
}


function isRunningPlugin(HTMLString, plugin) {
    //TODO: get curr plugins, might not be only in head, might have to check plugin version as well
    const regex = new RegExp("/wp-content/plugins/" + plugin);
    return !!HTMLString.substring(HTMLString.indexOf("<head>"), HTMLString.indexOf("</head>")).match(regex) || !!HTMLString.match(regex)
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

//finds regex match at position either from the top or the bottom, start=true means front, start=false, means bottom
function findNIndex(regex, HTMLString, position, start) {
  let match;
  let matches = [];
  while (match = regex.exec(HTMLString)) {
    matches.push(match);
  }
  position = start ? position-1 : matches.length-position;
  return !!matches[position] ? matches[position].index : -1;
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
function htmlToRegex(signatureHTMLTag, isComplete) {
    //const regex = /<\s*option\s+class=(\\"|'|"\/)level-0(\\"|'|")\s+value=(\\"|'|"\/)[^>]*(\\"|'|")\s*>/g;

    let s = `<\\s*` + signatureHTMLTag.tagName.toLowerCase();
    for (let i=0; i <signatureHTMLTag.attributes.length; i++) {
        s+=`\\s+`+signatureHTMLTag.attributes[i].name + `=(\\"|'|"\/)?` + signatureHTMLTag.attributes[i].value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + `(\\"|'|")?`;
    }
    if (isComplete === "complete") {
        s+=`\\s*\/?>`;
    }
    return new RegExp(s, 'g');
}

function isRunningWordPress(HTMLString, url) {
  return HTMLString.includes("wp-content") || HTMLString.includes("wp-toolbar") || url.includes("wp-content") || url.includes("wp-admin");
}

function runProbes(HTMLString, url, domain) {
  //this might be done better by loading a signature-like language for probes
  //for now i'm hardcoding known probes
  //probes are a list of a known probe i.e 'wordpress' and any additional versioning information necessary
  //e.g. for wordpress, can load domain/wp-admin/plugins.php if user has access to this page

  //probe for wordpress detection + default plugin versioning. This versioning method only works for
  //users with access to wp-admin/plugins.php
  if (isRunningWordPress(HTMLString, url)) {
    var index = probes.length;
    probes['WordPress'] = {};
    //probes.push(['WordPress', {}]);
    fetch('http://' + domain + '/wp-admin/plugins.php').then(function (response) {
      if (!response.ok) {
        console.log("No access to this resource, user not authenticated");
      }
      return response.text();
    }).then(function(response) {
      let x = 1;
      let domparser = new DOMParser();
      let doc = domparser.parseFromString(response, "text/html");
      let pluginList = doc.getElementById("the-list");
      let versions = pluginList.getElementsByClassName('plugin-version-author-uri');
      let i;
      for (i=0; i<versions.length; i++) {
        let pluginName = versions[i].parentElement.parentElement.getAttribute('data-slug');
        let versionNumber = versions[i].innerHTML.match('Version [^ ]*')[0].substring(8);
        probes['WordPress'][pluginName] = versionNumber;
      }
    }).catch(function (error) {
      //user was unauthenticated or doesn't have access to this page
      probes['WordPress'] = null;
      console.log(error);
    })
  }

  //the domain name itself is a probe with no default versioning
  probes[domain] = null;
}

function loadSignatures(HTMLString, url, tabId) {
  let matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  const domain = matches && matches[1];  // domain will be null if no match is found

  //TODO: if the page is running wordpress, try to load the plugins page synchronously.
  let pluginsRunning;
  runProbes(HTMLString, url, domain);

  let toCheck = [];
  let i;

  let loadedProbes = Object.keys(probes);
  for (i=0; i < loadedProbes.length; i++) {
    if (mainFrameSignatures[loadedProbes[i]]) {
      toCheck = toCheck.concat(mainFrameSignatures[loadedProbes[i]]);
    }
    if (probes[loadedProbes[i]] && Object.keys(probes[loadedProbes[i]]).length < 1) {
      //request for versioning has not come back yet, wait
      //TODO: fix race condition here, insert interval on loading
    }
  }

  for (i = 0; i < toCheck.length; i++) {
  
    const signature = toCheck[i];
    if ((!!signature.url && url.includes(signature.url)) || (isRunningPlugin(HTMLString, signature.softwareDetails) && !signature.url)) {
      //check if versioning is correct when probe passed
      if (probes[signature.software] && probes[signature.software][signature.softwareDetails] && (signature.version !== probes[signature.software][signature.softwareDetails])) {
        continue;
      }
      //otherwise, plugins page did not load correctly, so carry on
      if (signature.type === 'all') {
        endPointsList.push([]);
        currSigs.push(signature);
      }
      else if (signature.type === 'listener') {

        var xhrListener = function (details) {
          let filter = browser.webRequest.filterResponseData(details.requestId);
          let decoder = new TextDecoder("utf-8");
          let encoder = new TextEncoder();

          let str = "";
          filter.ondata = event => {
            str += decoder.decode(event.data, {stream: true});
          };

          filter.onstop = event => {

            try {
              str = verifyXHR(str, details.url);
            } catch(err) {
              debugger;
              console.log("Error when verifying XHR: " + err);
              //TODO: advice the user that a vulnerability has been found. maybe add an alert box to the HTML.
              //str = "";
            }
            filter.write(encoder.encode(str));
            filter.close();    
          };
        }

        const data = signature.listenerData;
        const path = data.url;
        if (data.listenerType === 'xhr') {
          browser.webRequest.onBeforeRequest.addListener(
              xhrListener,
              {urls: ["*://" + domain + "/" + path], types: ["xmlhttprequest"], tabId: tabId},
              ["blocking"]
          );

          browser.tabs.onRemoved.addListener(function (details) {
            browser.webRequest.onBeforeRequest.removeListener(xhrListener);
          });
          browser.tabs.onUpdated.addListener(function (details) {
            browser.webRequest.onBeforeRequest.removeListener(xhrListener);
          });

          xhrEndPointsList.push([]);
          xhrCurrSigs.push(data);
          if (data.typeDet.includes("multiple")) {
            let i = 0;
            for (i=0; i < data.endPoints.length; i++) {
              xhrEndPointsList[xhrEndPointsList.length-1].push(data.endPoints[i].concat(data.sigType[i]));
            }
          } else {
            xhrEndPointsList[xhrEndPointsList.length-1].push(data.endPoints.concat(data.sigType));
          }
        }
      } else {
        endPointsList.push([]);
        currSigs.push(signature);
        if (signature.typeDet.includes("multiple")) {
          let i = 0;
          for (i=0; i < signature.endPoints.length; i++) {
            endPointsList[endPointsList.length-1].push(signature.endPoints[i].concat(signature.sigType[i]));
          }
        } else {
          endPointsList[endPointsList.length-1].push(signature.endPoints.concat(signature.sigType));

        }
      }
    }
  }

  for (i=0; i < scriptSignatures.length; i++) {
    const signature = scriptSignatures[i];
    if (isRunningPlugin(HTMLString, signature.softwareDetails) ||  url.includes(signature.url)) {
      scriptsList.push(signature.url);
      scriptReplaceValues.push([signature.toReplace, signature.replaceValues]);
    }
  }
}

//TODO: add functionality to do different things based on occurrence and what the signature dictates for sanitization
//TODO: might be able to have the signature specify allowed/blocked elements as per https://github.com/cure53/DOMPurify, Can I configure DOMPurify?
function sanitizeInjectionPoint(HTMLString, startIndex, endIndex, occurrence) {
  //let toReplace = HTMLString.replaceBetween(startIndex, endIndex, "");
  let toReplace = HTMLString.replaceBetween(startIndex, endIndex, DOMPurify.sanitize(HTMLString.substring(startIndex, endIndex)));
  let trimmedCount = HTMLString.length - toReplace.length;
  HTMLString = toReplace;
  return [HTMLString, trimmedCount];
}

function findIndices(dataString, endPointsList, currSigs) {
  let i;
  let j;
  let startIndices = [];
  let endIndices = [];

  for (i = 0; i<endPointsList.length; i++) {

    //sanitize the whole string
    if (currSigs[i].type === "all") {
        startIndices.push(0);
        endIndices.push(dataString.length-1);
        continue;
    }

    for (j=0; j<endPointsList[i].length; j++) {
      let start;
      let startRegex;
      let end;
      let endRegex;
      if (currSigs[i].type === "htmlTag") {
        start = htmlToElement(endPointsList[i][j][0]);
        startRegex = htmlToRegex(start, endPointsList[i][j][2]);
        end = htmlToElement(endPointsList[i][j][1]);
        endRegex = htmlToRegex(end, endPointsList[i][j][3]);
      } else {
        startRegex = new RegExp(endPointsList[i][j][0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        endRegex = new RegExp(endPointsList[i][j][1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      }

      if (currSigs[i].typeDet.includes("several")) {
        let currStart;
        let currEnd;
        currStart = startRegex.exec(dataString);
        currEnd = endRegex.exec(dataString);
        while (currStart && currEnd) {
          startIndices.push(currStart.index /*+ endPointsList[i][0].length*/);
          endIndices.push(currEnd.index);
          currStart = startRegex.exec(dataString);
          currEnd = endRegex.exec(dataString);
        }
      } else {
        let startMatch;
        let startIndex;
        let endIndex;
        if (currSigs[i].endPointsPositions) {
          startIndex = findNIndex(startRegex, dataString, currSigs[i].endPointsPositions[j][0], true);
          endIndex = findNIndex(endRegex, dataString, currSigs[i].endPointsPositions[j][1], false);
        } else {
          startMatch = startRegex.exec(dataString);
          startIndex = !!startMatch ? startMatch.index : -1;
          endIndex = findLastIndex(endRegex, dataString);
        }
        if (startIndex !== -1 && endIndex !== -1) {
          //startIndex += endPointsList[i][0].length;
          startIndices.push(startIndex);
          endIndices.push(endIndex);
        }
      }
    }
  }
  return [startIndices, endIndices];
}

function verifyXHR(responseData, url) {
  let indices = findIndices(responseData, xhrEndPointsList, xhrCurrSigs);
  let startIndices = indices[0];
  let endIndices = indices[1];
  if (startIndices.length !== endIndices.length) {
    throw new Error("Error: startIndices length doesn't match endIndices length, illegal.");
  }

  let i;
  let occurrenceMap = {};
  for (i=0; i<xhrCurrSigs.length; i++) {
    let signature = xhrCurrSigs[i];
    occurrenceMap[startIndices[i]] = signature.typeDet.substring(signature.typeDet.indexOf('-')+1);
  }

  if (startIndices.length === 1) {
    responseData = sanitizeInjectionPoint(responseData, startIndices[0], endIndices[0], occurrenceMap[startIndices[0]])[0];
  }
  else if (startIndices.length > 1) {
    let sortedStart = startIndices;
    sortedStart.sort((a, b) => a - b);
    let sortedEnd = endIndices;
    sortedEnd.sort((a, b) => a - b);

    //if there's more than 1 CVE in the current page, need to check for duplicates
    for (i=0; i <sortedStart.length; i++) {
      if (sortedEnd[i] > sortedStart[i+1]) {
        responseData = sanitizeInjectionPoint(responseData, sortedStart[0], endIndices[sortedEnd.length-1], 'unique')[0];
        return responseData;
      }
    }
    //now we know all injection points are independent from each other, sanitize each individually
    //and find new indices again after each sanitization
    let trimmedCount = 0;
    for (i=0; i<sortedStart.length; i++) {
      sortedStart = sortedStart.map(x => {return x-trimmedCount});
      sortedEnd = sortedEnd.map(x => {return x-trimmedCount});
      //sortedStart[i]-=trimmedCount;
      //sortedEnd[i]-=trimmedCount;
      let sanitized = sanitizeInjectionPoint(responseData, sortedStart[i], sortedEnd[i], occurrenceMap[sortedStart[i]]);
      responseData = sanitized[0];
      trimmedCount = sanitized[1];
    }
  }

  console.log("XHR has been verified.");
  return responseData;

}

function verifyHTML(HTMLString, url, tabId) {

  loadSignatures(HTMLString, url, tabId);

  let indices = findIndices(HTMLString, endPointsList, currSigs);
  let startIndices = indices[0];
  let endIndices = indices[1];

  if (startIndices.length !== endIndices.length) {
    throw new Error("Error: startIndices length doesn't match endIndices length, illegal.");
  }

  let i;
  let occurrenceMap = {};
  for (i=0; i<currSigs.length; i++) {
    let signature = currSigs[i];
    occurrenceMap[startIndices[i]] = signature.typeDet.substring(signature.typeDet.indexOf('-')+1);
  }



  if (startIndices.length === 1) {
    HTMLString = sanitizeInjectionPoint(HTMLString, startIndices[0], endIndices[0], occurrenceMap[startIndices[0]])[0];
    console.log("Sanitized unique injection point");
  }
  else if (startIndices.length > 1) {
    let sortedStart = startIndices;
    sortedStart.sort((a, b) => a - b);
    let sortedEnd = endIndices;
    sortedEnd.sort((a, b) => a - b);

    //if there's more than 1 CVE in the current page, need to check for duplicates
    for (i=0; i <sortedStart.length; i++) {
      if (sortedEnd[i] > sortedStart[i+1]) {
        HTMLString = sanitizeInjectionPoint(HTMLString, sortedStart[0], endIndices[sortedEnd.length-1], 'unique')[0];
        return HTMLString;
      }
    }
    //now we know all injection points are independent from each other, sanitize each individually
    //and find new indices again after each sanitization
    let trimmedCount = 0;
    for (i=0; i<sortedStart.length; i++) {
      sortedStart = sortedStart.map(x => {return x-trimmedCount});
      sortedEnd = sortedEnd.map(x => {return x-trimmedCount});
      //sortedStart[i]-=trimmedCount;
      //sortedEnd[i]-=trimmedCount;
      let sanitized = sanitizeInjectionPoint(HTMLString, sortedStart[i], sortedEnd[i], occurrenceMap[sortedStart[i]]);
      console.log("Sanitized injection point #" + (i+1));
      HTMLString = sanitized[0];
      trimmedCount = sanitized[1];
    }
  }
  /*
    if (startIndex !== -1 && endIndex !== -1) {
      /*if (occurrence[i] === "unique") {
        //we are in the right infected page
        HTMLString = HTMLString.replaceBetween(startIndex, endIndex, "");

        
        //TODO: might not be able to do this check, as a page might have a plugin in the head but not be the infected subpage
      } else {
        while (startIndex && endIndex) {
          HTMLString = HTMLString.replaceBetween(startIndex, endIndex, "");
          startMatch = startRegex.exec(HTMLString);
          startIndex = !!startMatch ? startMatch.index : -1;
          endIndex = findLastIndex(endRegex, HTMLString);
          HTMLString = HTMLString.replaceBetween(startIndex, endIndex, "");
        }
      }
      HTMLString = HTMLString.replaceBetween(startIndex, endIndex, "");
    }*/
  console.log("HTML is now clean!");
  return HTMLString;
}
