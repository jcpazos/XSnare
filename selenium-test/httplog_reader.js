const readline = require('readline');
const fs = require('fs');
var resMap = new Map();

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
    input: fs.createReadStream('./top_results/httpserver_top_results.txt')
});

let line_no = 0;

function median(values){
  if(values.length ===0) return 0;

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

// event is emitted after each line
rl.on('line', function(line) {
    line_no++;
    let timeStart = line.indexOf("time=") + 5;
    let timeEnd = line.indexOf("&loadedSignatures=");
    let lengthStart = line.indexOf("length=") + 7;
    let lengthEnd = line.indexOf("&url=");
    let urlStart = line.indexOf("url=") + 4;
    let urlEnd = line.indexOf("HTTP/")-1;
    let probesStart = line.indexOf("loadedProbes=") + 13;
    let probesEnd = line.indexOf("&length=");
    let currTime = line.substring(timeStart, timeEnd);
    let currLength = line.substring(lengthStart, lengthEnd);
    let currUrl = line.substring(urlStart, urlEnd);
    let currProbes = line.substring(probesStart, probesEnd);


    if (currUrl.includes("adssettings.google.com")) {
    	currUrl = "addssettings.google.com";
    } else if (currUrl.includes("bing.com")) {
    	currUrl = "bing.com";
    } else if (currUrl.includes("accounts.google.com/ServiceLogin?service=feedburner")) {
    	currUrl = "accounts.google.com/ServiceLogin?service=feedburner";
    } else if (currUrl.includes("godaddy.com")) {
    	currUrl = "godaddy.com";
    } else if (currUrl.includes("000webhost.com")) {
    	currUrl = "000webhost.com";
    }
    let tmp = resMap.get(currUrl);

    if (!tmp) {
    	resMap.set(currUrl, []);
    }

    let isWordPress;
    isWordPress = (currProbes === "wordpress");

    resMap.get(currUrl).push({'time': Number(currTime), 'length': Number(currLength), 'isWordPress': isWordPress});

    	//console.log("time: " + currTime + " length: " + currLength + " url: " + currUrl);

});

// end
rl.on('close', function(line) {
	resMap.delete("Lis");


	let mediansArray = [];
	let mediansArraywp = [];

	let sites = 0;
	resMap.forEach(function(value, key) {
		let timeMedian = [];
		let lengthMedian = [];
		let maxTime = 0;
		let maxLength = 0;

		for (var i = 0; i < 20; i++) {
			if (value[i]) {
				maxTime = Math.max(maxTime, value[i].time);
				maxLength = Math.max(maxLength, value[i].length);
			}
		}

		for (var i = 0; i < 20; i++) {
			if (value[i]) {
				timeMedian.push(value[i].time);
				lengthMedian.push(value[i].length);
			} else {
				timeMedian.push(maxTime);
				lengthMedian.push(maxLength);
			}
		}

		//console.log("times: " + JSON.stringify(timeMedian) + " lengths: " + JSON.stringify(lengthMedian));
		if (value[0].isWordPress) {
			mediansArraywp.push([median(timeMedian), median(lengthMedian)]);
		} else {
			mediansArray.push([median(timeMedian), median(lengthMedian)]);
		}
		//console.log("mediansArray: " + mediansArray[mediansArray.length-1]);

		sites++;	
	  	//console.log(JSON.stringify(value));
	});

	let lengthMap = new Map();
	let lengthMapwp = new Map();

	for (var i=0; i<mediansArray.length; i++) {
		let tmp = lengthMap.get(mediansArray[i][1]);
		if (!!tmp) {
			lengthMap.set(mediansArray[i][1], Math.max(tmp, mediansArray[i][0]));
		}
		else {
			lengthMap.set(mediansArray[i][1], mediansArray[i][0]);
		}
	}

	for (var i=0; i<mediansArraywp.length; i++) {
		let tmp = lengthMapwp.get(mediansArraywp[i][1]);
		if (!!tmp) {
			lengthMapwp.set(mediansArraywp[i][1], Math.max(tmp, mediansArraywp[i][0]));
		}
		else {
			lengthMapwp.set(mediansArraywp[i][1], mediansArraywp[i][0]);
		}
	}

	let sorted = Array.from(lengthMap.keys()).sort((a,b) => a-b).map(function(k) {return {key: k, value: lengthMap.get(k)}});

	let sortedwp = Array.from(lengthMapwp.keys()).sort((a,b) => a-b).map(function(k) {return {key: k, value: lengthMapwp.get(k)}});

	let lengths = [];
	let times = [];
	let lengthswp = [];
	let timeswp = [];

	for (var i=0; i<sorted.length; i++) {
		times.push(sorted[i].value);
		lengths.push(sorted[i].key);
	}

	for (var i=0; i<sortedwp.length; i++) {
		timeswp.push(sortedwp[i].value);
		lengthswp.push(sortedwp[i].key);
	}


	//console.log(JSON.stringify(mediansArray));
	//console.log(JSON.stringify(mediansArraywp));
	console.log(JSON.stringify(times));
	console.log(JSON.stringify(lengths));
	console.log(JSON.stringify(timeswp));
	console.log(JSON.stringify(lengthswp));
    //console.log('Total sites : ' + sites);
});