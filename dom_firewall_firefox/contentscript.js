'use strict';

var signatures = Sigs.signatures;

const CSAPI = {
    verifyHTML: function (e) {

        let i;
        const endPointsList = [];
        //TODO: move this functionality outside of verifyHTML so we don't keep loading scripts every time
        for (i = 0; i < signatures.length; i++) {
            const signature = signatures[i];
            if (isRunningPlugin(signature.softwareDetails) || isURL(signature.url)) {
                endPointsList.push(signature.endPoints.concat(signature.sigType));
            }
        }

        const filterTag = function (toFind, elm) {
            const toFindAttrs = toFind.attributes;
            const elmAttrs = elm.attributes;
            if (toFindAttrs.length !== elmAttrs.length) {
                return false;
            }

            for (let i = 0; i < toFindAttrs.length; i++) {
                if (toFindAttrs[i].name !== elmAttrs[i].name || toFindAttrs[i].value !== elmAttrs[i].value) {
                    return false;
                }
            }

            return true;
        };


        for (i = 0; i < endPointsList.length; i++) {
            const start = htmlToElement(endPointsList[i][0]);
            const possibleStartTags = Array.from(document.getElementsByTagName(start.tagName));
            const matchingStartTags = Array.from(possibleStartTags).filter(elm => filterTag(start, elm));
            const startTag = matchingStartTags[0];

            const end = htmlToElement(endPointsList[i][1]);
            const possibleEndTags = Array.from(document.getElementsByTagName(end.tagName));
            const matchingEndTags = Array.from(possibleEndTags).filter(elm => filterTag(end, elm));
            //The last matching tag is the correct one, other ones are duplicates inserted by attacker
            const endTag = matchingEndTags[matchingEndTags.length-1];

            checkAndSanitize(e, startTag, endTag);
        }
    }
};

function isRunningPlugin(plugin) {
    const regex = new RegExp(plugin);
    return !!document.head.outerHTML.match(regex);
}

function isURL(signatureUrl) {
    return document.URL === signatureUrl;
}

function verifyScript(e) {
	if (e.target.id !== "safe") {
		//console.log("Verifying script with ID: " + e.target.id);
		CSAPI["verifyHTML"](e);
		//console.log("HTML has been verified.");
	}
}

function verifyToggle(e) {
  //console.log("verifying toggle");
  CSAPI["verifyHTML"](e);
}

function finishVerify(e) {
	//console.log("Finishing script with ID: " + e.target.id);
}

//inject script to do preliminary checks
function init_firewall() {
	document.addEventListener("beforescriptexecute", verifyScript, true);
	document.addEventListener("afterscriptexecute", finishVerify, true);
  document.addEventListener("toggle", verifyToggle, true);

}

/**
 * @param {String} html representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function checkAndSanitize(e, startTag, endTag) {
  //check if e.target is in between startTag and endTag
    const $all = $(document.body).find('*').andSelf();
    if (!!$all.slice(0, $all.index(e.target)).filter(startTag)[0] && !!$all.slice($all.index(e.target)+1).filter(endTag)[0]) {
        e.preventDefault();
        e.stopPropagation();
        return "success";
    }
}


//init_firewall();