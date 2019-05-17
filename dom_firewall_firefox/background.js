'use strict';

//var storageArea = chrome.storage.local;
const respData = {};
const mainFrameSignatures = Sigs.main_frame_signatures;
const scriptSignatures = Sigs.script_signatures;
let endPointsList = [];
let scriptsList = [];
let scriptReplaceValues = [];
let currSigs = [];

String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

function mainFrameListener(details) {
  //reset array values
  endPointsList = [];
  scriptsList = [];
  scriptReplaceValues = [];
  currSigs = [];
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
        str = verifyHTML(str, details.url);
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

/*browser.webRequest.onBeforeRequest.addListener(
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
  if (!template.innerHTML) {
    template.innerHTML = html + '">';
  }
    return template.content.firstChild;
}


function isRunningPlugin(HTMLString, plugin) {
    //TODO: get curr plugins, might not be only in head, might have to check plugin version as well
    const regex = new RegExp("/wp-content/plugins/" + plugin);
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

function loadSignatures(HTMLString, url) {
  let i;
  for (i = 0; i < mainFrameSignatures.length; i++) {
    const signature = mainFrameSignatures[i];
    //const softwareList = software.split('#').map(x => x.trim());
    //TODO: make this more efficient to only check signatures that could be related to the current url
    //for example, if we load facebook.com, we shouldn't even be checking wordpress signatures
    if (/*isRunningPlugin(HTMLString, signature.softwareDetails) && */!!signature.url && url.includes(signature.url)) {
      if (signature.typeDet.includes("multiple")) {
        let i = 0;
        for (i=0; i < signature.endPoints.length; i++) {
          endPointsList.push(signature.endPoints[i].concat(signature.sigType[i]));
          currSigs.push(signature);
        }
      } else {
        endPointsList.push(signature.endPoints.concat(signature.sigType));
        currSigs.push(signature);
      }
    }
    else if (isRunningPlugin(HTMLString, signature.softwareDetails) && !signature.url) {
      if (signature.typeDet.includes("multiple")) {
        let i = 0;
        for (i=0; i < signature.endPoints.length; i++) {
          endPointsList.push(signature.endPoints[i].concat(signature.sigType[i]));
          currSigs.push(signature);
        }
      } else {
        endPointsList.push(signature.endPoints.concat(signature.sigType));
        currSigs.push(signature);
      }
    }
  }

  for (i=0; i < scriptSignatures.length; i++) {
    const signature = scriptSignatures[i];
    //const software = signature.software;
    //const softwareList = software.split('#').map(x => x.trim());
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

function verifyHTML(HTMLString, url) {

  let i;

  loadSignatures(HTMLString, url);

  let startIndices = [];
  let endIndices = [];

  for (i = 0; i<endPointsList.length; i++) {
    let start;
    let startRegex;
    let end;
    let endRegex;
    if (currSigs[i].type === "htmlTag") {
      start = htmlToElement(endPointsList[i][0]);
      startRegex = htmlToRegex(start, endPointsList[i][2]);
      end = htmlToElement(endPointsList[i][1]);
      endRegex = htmlToRegex(end, endPointsList[i][3]);
    } else {
      startRegex = new RegExp(endPointsList[i][0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      endRegex = new RegExp(endPointsList[i][1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    }

    if (currSigs[i].typeDet.includes("several")) {
      let currStart;
      let currEnd;
      currStart = startRegex.exec(HTMLString);
      currEnd = endRegex.exec(HTMLString);
      while (currStart && currEnd) {
        startIndices.push(currStart.index /*+ endPointsList[i][0].length*/);
        endIndices.push(currEnd.index);
        currStart = startRegex.exec(HTMLString);
        currEnd = endRegex.exec(HTMLString);
      }
    } else {
      let startMatch;
      let startIndex;
      //TODO: this needs to change assuming non-uniqueness, it currently just gets the last one, but it should be the nth to last one
      let endIndex;
      if (currSigs[i].endPointsPositions) {
        startIndex = findNIndex(startRegex, HTMLString, currSigs[i].endPointsPositions[i][0], true);
        endIndex = findNIndex(endRegex, HTMLString, currSigs[i].endPointsPositions[i][1], false);
      } else {
        startMatch = startRegex.exec(HTMLString);
        startIndex = !!startMatch ? startMatch.index : -1;
        endIndex = findLastIndex(endRegex, HTMLString);
      }
      if (startIndex !== -1 && endIndex !== -1) {
        //startIndex += endPointsList[i][0].length;
        startIndices.push(startIndex);
        endIndices.push(endIndex);
      }
    }
  }

  if (startIndices.length !== endIndices.length) {
    throw new Error("Error: startIndices length doesn't match endIndices length, illegal.");
  }

  let occurrenceMap = {};
  for (i=0; i<currSigs.length; i++) {
    let signature = currSigs[i];
    occurrenceMap[startIndices[i]] = signature.typeDet.substring(signature.typeDet.indexOf('-')+1);
  }



  if (startIndices.length === 1) {
    HTMLString = sanitizeInjectionPoint(HTMLString, startIndices[0], endIndices[0], occurrenceMap[startIndices[0]])[0];
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
