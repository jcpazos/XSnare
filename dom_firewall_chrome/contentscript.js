// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


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

  verifyHTML: function(src) {

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
      for (var i=0; i<src.length; i++) {
        var tagToFind = htmlToElement(src[i]);
        var tags = Array.from(document.getElementsByTagName(tagToFind.tagName));
        var tag = Array.from(tags).filter(elm => filterTag(tagToFind, elm))[0];
        //replaces innerHTML by a sanitized string
        var isEqual = tag.innerHTML === DOMPurify.sanitize(tag.innerHTML);
        tag.innerHTML = DOMPurify.sanitize(tag.innerHTML);
        //TODO: true/false don't mean anything in this case, need to return identifier for additional checks maybe
        if (isEqual) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    });
  }
};

/*stop();

(function overwrite(link) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', link.href);
  xhr.onload = () => {
    var html = xhr.responseText
      .replace(/<script\b[\s\S]*?<\/script>/g, s => {
        if (s.includes('fromCharCode') ||
            s.includes('iframe') ||
            s.includes('document.write') ||
            s.includes('document.createElement("script")') ||
            s.includes("document.createElement('script')") ||
            /^[^>]+?src=['"][^'"/]*\/\//.test(s)) {
          // console.debug(GM_info.script.name + ': ' + s);
          return '';
        } else {
          return s;
        }
      })
      .replace(/<(object|iframe)\s[\s\S]*?<\/\1>/g, ''); // strip swfs
    document.open();
    document.write(html);
    document.close();

    document.querySelector('[id*="ScriptRoot"]').parentNode.remove();

    if (link.nodeName)
      history.pushState(0, document.title, link.href);

    var prevUrl = location.href;
    window.addEventListener('popstate', e => {
      if (!prevUrl.includes('#') && !location.href.includes('#'))
        overwrite(location);
    });

    window.addEventListener('click', e => {
      var a = e.target.closest('a');
      if (a && !a.onclick && a.hostname == location.hostname) {
        e.preventDefault();
        overwrite(a);
      }
    });
  };
  xhr.send();
})(location);
*/

document.onreadystatechange = function() { 
  //inject script to do preliminary checks
  var signatures = Sigs.signatures;
  for (var i = 0; i < signatures.length; i++) {
    var signature = signatures[i];
    var software = signature.software;
    var softwareList = software.split('#').map(x => x.trim());
    //remove empty string

    softwareList.splice(0,1);
    var softwareDetails = signature.softwareDetails;
    //we have several software involved, check each one hierarchically
    //TODO: does this even make sense to do?
    traverseSoftware(softwareList, softwareDetails).then(function (software) {
      //TODO: do the check on the software lowest down the chain i.e (software)
      //TODO: continue on background side
      CSAPI[signature.sigType](signature.src).then(function (software) {
        //TODO: might want to return an identifier for when additional checks need to be done
        console.log('success');
      }).catch(function (err){
        console.log('err');
      });
      /*chrome.runtime.sendMessage({cmd: "parseHTMLBlob", params: {doc: document, sigType: signature.sigType, software: software, version: signature.version, src: signature.src}}, 
        function(response) {
          var parsed = response.doc;
          console.log("document has been parsed: " + parsed);
        }
      );*/
    }).catch(function (err) {
      //one of the checks failed, do nothing since it's not the right app
      console.log('one of the checks failed, we are fine');
    });
  }


  
};

function traverseSoftware(softwareList, softwareDetails) {
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
