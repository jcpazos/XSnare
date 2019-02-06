'use strict';

var signatures = Sigs.signatures;
var endPointsList = [];

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
}

document.onreadystatechange = function() { 
  
};

function starting(e) {

  CSAPI["verifyHTML"](e).then( function (res) {
    console.log("HTML has been verified.");
  });
}

function finishing(e) {
  console.log("Starting script with ID: " + e.target.id);
}


//inject script to do preliminary checks
function init_firewall() {
  //get curr plugins
  var currPlugins = getCurrPlugins();
  for (var i=0; i < signatures.length; i++) {
    var signature = signatures[i];
    var software = signature.software;
    var softwareList = software.split('#').map(x => x.trim());
    if (softwareList.includes(currPlugins)) {
      endPointsList.push(signature.endPoints);
    }
  }

  //TODO: DO THIS IN THE BACKGROUND PAGE
  var sending = browser.runtime.sendMessage({
    cmd: "executeSandbox";
    params: {url: location.href};
  });
  sending.then(handleResponse, handleError);


  document.addEventListener("beforescriptexecute", starting, true);
  document.addEventListener("afterscriptexecute", finishing, true);
}



/*function traverseSoftware(softwareList, softwareDetails) {
  return new Promise(function(resolve, reject) {
    var promises = [];
    const reducer = (accumulator, currentValue) => accumulator && !!currentValue;

    for (var i = 0; i < softwareList.length; i++) {
      var software = softwareList[i];
      promises.push(CSAPI[software](softwareDetails));
    }

    Promise.all(promises).then(function (res) {
      //all checks went through, will need to go more in-depth
      resolve(res[res.length-1]);
    }).catch(function(err) {
      reject("failed");
    });
  });
}*/



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


function checkAndSanitize(e, startTag, endTag) {
  var s = document.body.innerHTML;
  var first = s.indexOf(startTag);
  var last = reverseDOMSearch(startTag, document.body.lastChild, endTag);
  //first and last should be valid because the webpage is running the plugin with them
  //TODO: fix this
  var eTag = reverseDOMSearch(startTag, last, e.tagHTML);

  //if e is happening within bounds of first and last, i.e. within an injection point, stop JS execution
  if (!!eTag) {
    //var between = s.substr(first,last-first);
    e.preventDefault();
    //var sanitized = DOMPurify.sanitize(between);
    //document.body.innerHTML = s.substring(0, first) + sanitized + s.substring(last);
  }
}

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

function setUpListener() {
  var targetNode = document.body;

  // Options for the observer (which mutations to observe)
  var config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  var callback = function(mutationsList) {
      for(var mutation of mutationsList) {
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
}

init_firewall();