'use strict';

var signatures = Sigs.signatures;
var endPointsList = [];
var scriptsToBlock;
var fullHTML;
var rewriteScriptId = window.crypto.getRandomValues(new Uint16Array(1));
var newDoc;

/*browser.runtime.onMessage.addListener(request => {
	fullHTML = request.fullHTML;
	return Promise.resolve({response: "Hi from content script"});
});*/

var CSAPI = {
  wordPress: function(details) {
    return new Promise(function(resolve, reject) {
      var metaTags = Array.from(document.getElementsByTagName('meta'));
      var wpTag = metaTags.filter(tag => tag.content.includes("WordPress"))[0];
      if (!!wpTag) {
        resolve("wpv" + wpTag.content.substr(10));
      } else {
        reject("Fail: Could not detect WordPress site.");
      }
    });
  },

  wpPlugin: function(details) {
    return new Promise(function(resolve, reject) {
      var scriptTags = Array.from(document.getElementsByTagName('script'));
      var pluginTag = scriptTags.filter(tag => tag.src.includes("plugins/" + details))[0];
       if (!!pluginTag) {
        resolve("(wpPlugin) WF Cookie Consent");
       } else {
        reject("Fail: Could not detect wp plugin: " + details);
       }
    });
  },

  verifyHTML: function(e) {

  	var y = 1;
    if (!fullHTML) {
      console.log("can't verify script yet, stopping execution.");
      //e.preventDefault();
      return;
    }

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


    for (var i=0; i<endPointsList.length; i++) {
      var start = htmlToElement(endPointsList[i][0]);
      var startRegex = sigToRegex(start);
      var startIndex = !!startRegex.exec(fullHTML) ? startRegex.exec(fullHTML).index : -1;


      /*
      var possibleStartTags = Array.from(newDoc.getElementsByTagName(start.tagName));
      var matchingStartTags = Array.from(possibleStartTags).filter(elm => filterTag(start, elm));
      var startTag = matchingStartTags[0];*/
      
      var end = htmlToElement(endPointsList[i][1]);
      var endRegex = sigToRegex(end);
      var endIndex = findLastIndex(endRegex);

      /*
      var possibleEndTags = Array.from(newDoc.getElementsByTagName(end.tagName));
      var matchingEndTags = Array.from(possibleEndTags).filter(elm => filterTag(end, elm));
      //The last matching tag is the correct one, other ones are duplicates inserted by attacker
      var endTag = matchingEndTags[matchingEndTags.length-1];*/

      checkAndSanitize(e, startIndex, endIndex);
    }
  }
}

function findLastIndex(regex) {
  var currMatch;
  var match;
  while (match = regex.exec(fullHTML)) {
    currMatch = match;
  }
  return !!currMatch ? currMatch.index : -1;
}

//converts a signature to regex to match fullHTML against e.target. signature is an HTML element
function sigToRegex(signatureHTMLTag) {
  //const regex = /<\s*option\s+class=(\\"|'|"\/)level-0(\\"|'|")\s+value=(\\"|'|"\/)[^>]*(\\"|'|")\s*>/g;
  let s = `<\\s*` + signatureHTMLTag.tagName.toLowerCase();
  for (var i=0; i <signatureHTMLTag.attributes.length; i++) {
    s+=`\\s+`+signatureHTMLTag.attributes[i].name + `=(\\"|'|"\/)` + signatureHTMLTag.attributes[i].value + `(\\"|'|")`;
  }
  s+=`\\s*>`;

  return new RegExp(s, 'g');
}

//Stops script execution
function denyScript(e) {
	if (!fullHTML) {
		console.log("Destroying script with ID: " + e.target.id);
		e.stopPropagation();
		e.preventDefault();
		$(e.target).remove();
	}
}

function verifyScript(e) {

  if (!document.body) {
    console.log("Body hasn't loaded yet, no need to verify.");
    return;
  }
	/*if (!fullHTML) {
		console.log("Denying script with ID: " + e.target.id);
		e.stopPropagation();
		e.preventDefault();
		$(e.target).remove();
		return;
	}*/
	//No need to sanitize scripts without an id, these were injected dynamically and are thus assumed safe
	if (e.target.id) {
		console.log("Verifying script with ID: " + e.target.id);
		//Do I need to await on this?
		CSAPI["verifyHTML"](e);
		console.log("HTML has been verified.");
	}
}

function finishDeny(e) {
	//console.log("Finishing script with ID: " + e.target.id);
}

function finishVerify(e) {
	//console.log("Finishing script with ID: " + e.target.id);
}

function handleResponse(resp) {
	fullHTML = resp;
	sessionStorage.setItem('fullHTML', resp);
	var parser = new DOMParser();
	newDoc = parser.parseFromString(resp, 'text/html');

	if (!document.body) {
		return;
	}
  	
	console.log("doing the thing");

	var sc = document.createElement("script");
	sc.id = rewriteScriptId;
	var escapedHTML = newDoc.documentElement.outerHTML.replace(/`/g, '\\`');	
	var newHTML = resp.substring(0,resp.indexOf("<html")) +  newDoc.documentElement.outerHTML;
	//sessionStorage.setItem("fullHTML", resp);
	sc.innerHTML = 'document.write(`' + escapedHTML + '`);'+ 'console.log("document was written");' + 'document.close();' ;
	document.body.appendChild(sc);

	console.log("handling response");
}

function handleError(err) {
	//TODO: handle error
	console.log("handling error:" + err);
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

//inject script to do preliminary checks
function init_firewall() {

	/*var currPlugins = getCurrPlugins();
	for (var i=0; i < signatures.length; i++) {
		var signature = signatures[i];
		var software = signature.software;
		var softwareList = software.split('#').map(x => x.trim());
		if (softwareList.includes(currPlugins)) {
		  endPointsList.push(signature.endPoints);
		}
	}

	fullHTML = sessionStorage.getItem("fullHTML");

	if (fullHTML) {
		sessionStorage.removeItem('fullHTML');
	}

	//TODO: still have to verify if CS is loaded again, Firefox really doesn't like this approach with facebook
	//document.addEventListener("beforescriptexecute", verifyScript, true);
	//document.addEventListener("afterscriptexecute", finishVerify, true);

	/*if (!inIframe() && !fullHTML) {
		browser.runtime.sendMessage({
			  cmd: "retrieveHTML",
			  params: {url: location.href}  
		}).then(handleResponse, handleError);
    //let resp = await browser.runtime.sendMessage({content: "message from CS"});
    handleResponse(resp);
	}*/

	

	//If we have the full HTML, verify scripts, otherwise stop them from executing and get it from the BG
	/*if (!!sessionStorage.getItem("fullHTML")) {
		fullHTML = sessionStorage.getItem("fullHTML");
		sessionStorage.removeItem("fullHTML");
		document.addEventListener("beforescriptexecute", verifyScript, true);
		document.addEventListener("afterscriptexecute", finishVerify, true);
	} else {
		if (!inIframe()) {
			browser.runtime.sendMessage({
				  cmd: "retrieveHTML",
				  params: {url: location.href}  
			}).then(handleResponse, handleError);
		}
		document.addEventListener("beforescriptexecute", denyScript, true);
		document.addEventListener("afterscriptexecute", finishDeny, true);
	}*/
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

//TODO: this should be more robust. On an arbitrarily placed 'tagtoSearch'
//this won't work, we need to refine the search and keep looking.
//A 'bottom-up selector' might be useful here.
/*
function matchFirstAttack(e) {
  //Top-down, bottom-up approach to isolate injected code
  //var headerTag = document.querySelector('#first');
  var headerTag = document.querySelector('#first');
  //the tag that should go after the header
  //TODO: tagToSearch is the tag that goes immediately after the header tag,
  // i.e the 'end' of the injection point. This needs to be marked with an unique
  // identifier so as to look for it with top-down bottom-up approach.
  //now we know the injected code is between  headerTag and isMatch
  //we can grab the html between these two points and remove any javascript i.e
  //a script tag, or a called funtion from an inserted element
  var s = document.body.innerHTML;
  //why can't we just do this at the beginning and skip the searching?
  //maybe because the identification cannot be done before injection happens as it's all loaded inline?
  var first = s.indexOf('<div id="first">');
  var last = s.lastIndexOf('<div class="second">');
  var between = s.substr(first,last-first);
  if (e.target.outerHTML.includes('<script')) {
    e.preventDefault();
    var sanitized = DOMPurify.sanitize(between);
    document.body.innerHTML = s.substring(0, first) + sanitized + s.substring(last);
  }
}*/

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

/*function checkAndSanitize(e, startTag, endTag) {
  //check if e.target is in between startTag and endTag

  var toSanitize = newDoc.getElementById(e.target.id);
  var $all = $(newDoc.body).find('*').andSelf();
  if (!!$all.slice(0, $all.index(toSanitize)).filter(startTag)[0] && !!$all.slice($all.index(toSanitize)+1).filter(endTag)[0]) {
    e.preventDefault();
    return "success";
  } 
  //var eTag = reverseDOMSearch(startTag, last, e.target.outerHTML.substring(0,e.target.outerHTML.indexOf('>')+1));
  
  //if e is happening within bounds of first and last, i.e. within an injection point, stop JS execution
  if (!!eTag) {
    //var between = s.substr(first,last-first);
    //e.preventDefault();
    //var sanitized = DOMPurify.sanitize(between);
    //document.body.innerHTML = s.substring(0, first) + sanitized + s.substring(last);
  }
}*/

function getCurrPlugins() {
  //TODO: get curr plugins
  return "wpPlugin";
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

String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

/*function setUpListener() {
  var targetNode = document.body;

  // Options for the observer (which mutations to observe)
  var config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  var callback = function(mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type == 'childList') {
        console.log('A child node has been added or removed.');
      }
      else if (mutation.type == 'attributes') {
        console.log('The ' + mutation.attributeName + ' attribute was modified.');
      }
    }
  };

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}*/

init_firewall();