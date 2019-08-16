const {Builder, By, Key, logging, until} = require('selenium-webdriver');
const {Capabilities, UserPromptHandler} = require('selenium-webdriver/lib/capabilities');
const {NoSuchWindowError} =  require('selenium-webdriver/lib/error')
//var out = require('ya-csv');
var firefox = require('selenium-webdriver/firefox');

var fs = require("fs");

let urls = urlArray;

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

const trials = 20;
let i;

async function run_tests(url) {
	let loadTimes = [];
  	let loadTime = 0;
  	var start1;
	var end1;
	var end2;
	var end3;
	var end4;
	var end5;
	let driver;
	try {
		driver = await builder.build();
		await driver.manage().setTimeouts({pageLoad: 25000});
  		await driver.get("https://www.example.com");
		let j;
		for (j=0; j<trials; j++) {
			let data = [];
			try {
				await driver.get(url);
				loadTime = await driver.executeScript('return performance.getEntriesByType("navigation")[0]');
				let requestStart = loadTime.requestStart;
				let responseStart = loadTime.responseStart;
				let responseEnd = loadTime.responseEnd;
				let domContentLoaded = loadTime.domContentLoadedEventEnd;
				let domComplete = loadTime.domComplete;
				let duration = loadTime.duration;
				let bodySize = loadTime.decodedBodySize; 
				data = [requestStart, responseStart, responseEnd, domContentLoaded, domComplete, duration, bodySize];
			} catch (err) {
				console.log("error when retrieving  page: " + urls[i] + ': ' + err);
				if (driver) {
					try {
						loadTime = await driver.executeScript('return performance.getEntriesByType("navigation")[0]');
					} catch (err) {
						console.log("error when executing script, driver no longer available: " + err);
					}
				}
				/*if (driver) {
					await driver.quit();
					driver = await builder.build();
				}*/
			} finally {
				loadTimes.push(data);
			}
		}
	} catch (err) {
		console.log('error in extension tests when building driver: ' + err);
	}
	if (driver) {
		end4 = new Date();
		try {
			await driver.quit();	
		} catch (err) {
			//couldn't quit driver, session was already disconnected, so carry on
			console.log("error when quitting driver, session was already disconnected: " + err);
		}
		end5 = new Date();
		//console.log("Time to start driver: " + (end1-start1));
		//console.log("Time to await page get: " + (end2-end1));
		//console.log("Time to await script execute: " + (end3-end2));
		//console.log("Time to close driver: " + (end5-end4));
	}
	console.log("latest load time for page " + urls[i] + ": " + JSON.stringify(loadTime));
	return loadTimes;
}

let url = process.argv[2];
let plugin = process.argv[3];

function initExtensionTests(url) {
	run_tests_extension(url).then(function (loadTimes) {
		fs.writeFile("extension_warm_cache_wp_results_" + plugin +".txt", JSON.stringify(loadTimes), (err) => {
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