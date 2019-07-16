const {Builder, By, Key, logging, until} = require('selenium-webdriver');

var firefox = require('selenium-webdriver/firefox');
//logging.installConsoleHandler();
//logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);
const urls = ['http://www.google.com', 'http://www.amazon.ca', 'http://www.reddit.com'];
const width = 640;
const height = 480;

const trials = 100;
 
async function run_tests_extension() {
  	let loadTimes = [];
 	let driver = await new Builder()
	  	.forBrowser('firefox')
	  	.setFirefoxOptions(
	        new firefox.Options()
	        .headless()
	        .windowSize({width, height})
	  		.addExtensions('../web-ext-artifacts/dom_firewall-0.1-an+fx.xpi'))
	  		.build();

	let i;
	try {
		for (i=0; i<urls.length; i++) {
			await driver.get(urls[i]);
			let j;
			let loadTimeAcc = 0;
			for (j=0; j<trials; j++) {
				loadTimeAcc += await driver.executeScript('return performance.getEntriesByType("navigation")[0].duration');
			}
			loadTimeAcc = loadTimeAcc/trials;
			loadTimes.push(loadTimeAcc);
		}
	} catch (err) {
		console.log(err);
	} finally {
	await driver.quit();
	return loadTimes;
	}
}

async function run_tests() {
  	let loadTimes = [];
 	let driver = await new Builder()
	  	.forBrowser('firefox')
	  	.setFirefoxOptions(
	        new firefox.Options()
	        .headless()
	        .windowSize({width, height}))
	  		.build();

	let i;
	try {
		for (i=0; i<urls.length; i++) {
			await driver.get(urls[i]);
			let j;
			let loadTimeAcc = 0;
			for (j=0; j<trials; j++) {
				loadTimeAcc += await driver.executeScript('return performance.getEntriesByType("navigation")[0].duration');
			}
			loadTimeAcc = loadTimeAcc/trials;
			loadTimes.push(loadTimeAcc);
		}
	} catch (err) {
		console.log(err);
	} finally {
	await driver.quit();
	return loadTimes;
	}
}

run_tests_extension(urls).then(function (loadTimes) {
	console.log("Load times with extension running: " + loadTimes);
});

run_tests(urls).then(function (loadTimes) {
	console.log("Load times without extension running: " + loadTimes);
});


