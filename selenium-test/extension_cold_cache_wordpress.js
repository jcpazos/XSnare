const {Builder, By, Key, logging, until} = require('selenium-webdriver');
const {Capabilities, UserPromptHandler} = require('selenium-webdriver/lib/capabilities');
const {NoSuchWindowError} =  require('selenium-webdriver/lib/error')
//var out = require('ya-csv');
var firefox = require('selenium-webdriver/firefox');
var fs = require("fs");

const trials = 20;

let options = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1.1-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true);
let capabilities = new Capabilities()
				  		.setAlertBehavior(UserPromptHandler.ACCEPT);

let builder = new Builder()
					.withCapabilities(
				  		capabilities)
				  	.setFirefoxOptions(
				        options)
				  	.forBrowser('firefox');

let i;
 
async function run_tests_extension(url) {
  	let loadTimes = [];
  	let loadTime = 0;
	let j;
	var start1 = new Date();
	for (j=0; j<trials; j++) {
		var start1;
		var end1;
		var end2;
		var end3;
		var end4;
		var end5;
		loadTime = 0;
		let driver;
		let data = [];
		try {
			start1 = new Date();
		 	driver = await builder.build();
		 	await driver.manage().setTimeouts({pageLoad: 25000});
		 	end1 = new Date();
			await driver.get(url);
			end2 = new Date();
			loadTime = await driver.executeScript('return performance.getEntriesByType("navigation")[0]');
			end3 = new Date();
			//console.log(loadTime);
			let requestStart = loadTime.requestStart;
			let responseStart = loadTime.responseStart;
			let responseEnd = loadTime.responseEnd;
			let domContentLoaded = loadTime.domContentLoadedEventEnd;
			let domComplete = loadTime.domComplete;
			let duration = loadTime.duration;
			let bodySize = loadTime.decodedBodySize; 
			data = [requestStart, responseStart, responseEnd, domContentLoaded, domComplete, duration, bodySize];
			/*loadTimes[1].push();
			loadTimes[2].push();
			loadTimes[3].push();*/	
		} catch (err) {
			console.log('error in extension tests when loading page ' + url + ': ' + err);
			if (driver) {
				try {
					loadTime = await driver.executeScript('return performance.getEntriesByType("navigation")[0]');
				} catch (err) {
					console.log("error when executing script, driver no longer available: " + err);
				}
			}
		} finally {
			loadTimes.push(data);
			if (driver) {
				end4 = new Date();
				await driver.quit();
				end5 = new Date();
				console.log("Time to start driver: " + (end1-start1));
				console.log("Time to await page get: " + (end2-end1));
				console.log("Time to await script execute: " + (end3-end2));
				console.log("Time to close driver: " + (end5-end4));

			}
		}
		
	}
	console.log("latest load time for page " + urls[i] + ": " + JSON.stringify(loadTime));
	//console.log("tests took: " + (end5-start1));
	return loadTimes;
}

let url = process.argv[2];
let plugin = process.argv[3];

function initExtensionTests(url) {
	run_tests_extension(url).then(function (loadTimes) {
		fs.writeFile("extension_cold_cache_wp_results_" + plugin +".txt", JSON.stringify(loadTimes), (err) => {
			if (err) console.log(err);
			console.log("Successfully written to file.");
		});
	}).catch (function (err) {
		console.log("initextensiontests err : " + err);
	});
}


//let end = process.argv[3];
initExtensionTests(url);
//initExtensionTests(228, urls.length);

/*run_tests_extension(0, urls.length).then(function (loadTimes) {
	fs.writeFile("extension_warm_cache_results_" + end + ".txt", loadTimes, (err) => {
		if (err) console.log(err);
		console.log("Successfully written to file.");
	});
}).catch (function (err) {
	console.log("initextensiontests err : " + err);
});*/

