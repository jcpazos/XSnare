const {Builder, By, Key, logging, until} = require('selenium-webdriver');
const {Capabilities, UserPromptHandler} = require('selenium-webdriver/lib/capabilities');
const {NoSuchWindowError} =  require('selenium-webdriver/lib/error')
//var out = require('ya-csv');
var firefox = require('selenium-webdriver/firefox');
var fs = require("fs");

//TODO: for caldera forms, need to create a form in the wordpress instance, 
//		for events-manager need to create an event
// 		for multi-step-form, create a new form and preview it, then get the url
//		for quizlord, can also create a new quiz and get its url
const urls = ["wp-admin/options-general.php?page=rcc-settings", "wp-admin/admin.php?page=rcsm-weblizar", "wp-admin/admin.php?page=activity_log_page","wp-admin/profile.php?wp_http_referer=%2Fwp-admin%2Fusers.php","wp-admin/admin.php?page=wpdevart-extras", "wp-admin/admin.php?page=wpdevart-forms", "wp-admin/admin.php?page=bookly-payments", "wp-admin/admin.php?edit=CF5d5f250093242&page=caldera-forms", "wp-admin/profile.php", "wp-admin/admin-ajax.php?action=wpdm_generate_password", "wp-admin/admin.php?page=tonjoo_excerpt", "wp-admin/post.php?post=10&action=edit", "wp-admin/admin.php?page=loginizer_brute_force", "wp-admin/options-general.php?page=flickrrss-settingspage.php", "wp-admin/admin.php?page=gd-rating-system-information&panel=%27%22%3E%3Csvg%2Fonload%3Dconsole.log%28%2Fxss%2F%29%3E%3C%27%22", "wp-admin/index.php", "wp-admin/options-general.php?page=wpdf-options", "2019/08/13-2/", "wp-admin/admin.php?page=quizlord", "wp-admin/options-general.php?page=read-and-understood-menu-slug-01", "wp-admin/options-general.php?page=relevanssi%2Frelevanssi.php" , 'wp-content/plugins/sagepay-server-gateway-for-woocommerce/includes/pages/redirect.php?page=</script>"><script>alert("R1XS4.COM")</script>', "wp-content/plugins/share-this-image/sharer.php", 'wp-admin/edit.php?post_type=sdm_downloads', 'wp-admin/themes.php?page=snazzy_maps&tab=1&text="%3B><%2Fscript><script>alert(42)<%2Fscript>', '?war_soundy_pl_preview', '?war_soundy_preview', 'wp-admin/options-general.php?page=srbtranslatoptions', 'wp-admin', '?post_type=tggr-tweets&p=18&preview=true', 'wp-admin/admin.php?page=slideshow-galleries&method=view&id=1\"><script>console.log(1)<%2Fscript>', 'wp-admin/admin.php?page=slideshow-slides&method=save\"><script>console.log(1)<%2Fscript>&id=1', 'wp-admin/options-general.php?page=ctcc&tab=content', 'wp-admin/admin.php?page=pffree-weblizar', 'wp-admin/options-general.php?page=wordpress_file_upload&action=plugin_settings', 'wp-admin/admin.php?page=wpglobus_options', 'wp-admin/admin.php?page=wplivechat-menu-gdpr-page', 'wp-admin/admin.php?page=wps_pages_page&page-uri=%3F"><script>console.log(document.cookie)%3B<%2Fscript>', 'index.php/community/?%22%3E%3Cscript%3Econsole.log(/XSS/)%3C/script%3E', 'wp-content/plugins/z-url-preview/class.zlinkpreview.php']
let prepend = 'http://localhost:8080/'

for (var k = 0; k<urls.length; k++) {
	urls[k] = prepend + urls[k];
}

let extension_cold_cache = [];
let extension_warm_cache = [];
let no_extension_cold_cache = [];
let no_extension_warm_cache = [];
let profile_path = './firefox_profiles';

const trials = 25;

let options_extension_verify = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1.3-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true)
				  		.setProfile(profile_path);

let options_extension = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1.6-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true)
				  		.setProfile(profile_path);

let capabilities = new Capabilities()
				  		.setAlertBehavior(UserPromptHandler.ACCEPT);

let builder_extension_verify = new Builder()
					.withCapabilities(
				  		capabilities)
				  	.setFirefoxOptions(
				        options_extension_verify)
				  	.forBrowser('firefox');				  		

let builder_extension = new Builder()
					.withCapabilities(
				  		capabilities)
				  	.setFirefoxOptions(
				        options_extension)
				  	.forBrowser('firefox');


let options_no_extension = new firefox.Options()
				        .headless()
				        .setProfile(profile_path);

let builder_no_extension = new Builder()
					.withCapabilities(
				  		capabilities)
				  	.setFirefoxOptions(
				        options_no_extension)
				  	.forBrowser('firefox');		  	

let i;

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
 
async function run_tests_warm_extension(url) {
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
		driver = await builder_extension.build();
		await driver.manage().setTimeouts({pageLoad: 25000});
  		await driver.get("https://www.example.com");
  		await driver.get("http://localhost:8080/wp-admin");
	 	await driver.findElement(By.id('user_login')).sendKeys('root');
	 	await sleep(1000);
 		await driver.findElement(By.id('user_pass')).sendKeys('root');
 		await sleep(1000);
 		await driver.executeScript('document.getElementById("loginform").submit()');
 		await sleep(1000);

 		await driver.get('http://localhost:8080/wp-admin/plugins.php');
 		await driver.executeScript('document.getElementsByClassName("activate")[0].firstElementChild.click()');
 		await sleep(1000);

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
	console.log("latest load time for warm extension page " + url + ": " + JSON.stringify(loadTime));
	return loadTimes;
}

async function run_tests_warm_no_extension(url) {
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
		driver = await builder_extension.build();
		await driver.manage().setTimeouts({pageLoad: 25000});
  		await driver.get("https://www.example.com");
  		await driver.get("http://localhost:8080/wp-admin");
	 	await driver.findElement(By.id('user_login')).sendKeys('root');
	 	await sleep(1000);
 		await driver.findElement(By.id('user_pass')).sendKeys('root');
 		await sleep(1000);
 		await driver.executeScript('document.getElementById("loginform").submit()');
 		await sleep(1000);

	 		

		let j;
		for (j=0; j<trials; j++) {
			let data = [];
			try {
				await driver.get(url);
				loadTime = await driver.executeScript('return performance.getEntriesByType("navigation")[0]');
				await sleep(1000);
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
	console.log("latest load time warm no extension for page " + url + ": " + JSON.stringify(loadTime));
	return loadTimes;
}

let url = process.argv[2];
//let plugin = process.argv[3];

async function initTests(url) { 

	let loadTimes;
	let stream;

	loadTimes = await run_tests_warm_extension(url);
	extension_warm_cache.push(loadTimes);
	stream = fs.createWriteStream("./results_empty/extension_warm_top_results.txt", {flags:'a'});
	stream.write(JSON.stringify(loadTimes));
	stream.write(",");
	stream.end();

	loadTimes = await run_tests_warm_no_extension(url);
	no_extension_warm_cache.push(loadTimes);
	stream = fs.createWriteStream("./results_empty/no_extension_warm_top_results.txt", {flags:'a'});
	stream.write(JSON.stringify(loadTimes));
	stream.write(",");
	stream.end();



	

	return true;
}

/*function initExtensionTests(url) {
	run_tests_extension(url).then(function (loadTimes) {
		fs.writeFile("extension_cold_cache_wp_results_" + plugin +".txt", JSON.stringify(loadTimes), (err) => {
			if (err) console.log(err);
			console.log("Successfully written to file.");
		});
	}).catch (function (err) {
		console.log("initextensiontests err : " + err);
	});
}*/


//let end = process.argv[3];
initTests(urls[url]).then(function () {
	console.log("Tests successfully completed, processing results.");
	processResults();
	console.log("scripts processed succesfully");
}).catch(function (err) {
	console.log("error when writing tests: " + err);
});
//initExtensionTests(228, urls.length);

/*run_tests_extension(0, urls.length).then(function (loadTimes) {
	fs.writeFile("extension_warm_cache_results_" + end + ".txt", loadTimes, (err) => {
		if (err) console.log(err);
		console.log("Successfully written to file.");
	});
}).catch (function (err) {
	console.log("initextensiontests err : " + err);
});*/

function processResults() {
	let i;
	let max_byte_size = 0;
	let extension_cold_cache_results = [];
	let extension_warm_cache_results = [];
	let no_extension_cold_cache_results = [];
	let no_extension_warm_cache_results = [];

	for (i=0; i<extension_cold_cache.length; i++) {
		for (j=0; j<trials; j++) {
			if (extension_cold_cache[i][j][6] > max_byte_size) {
				max_byte_size = extension_cold_cache[i][j][6];
			}
		}
	}

	for (i=0; i<extension_cold_cache.length; i++) {
		let newRes = [];
		let j;
		for (j=0;j<trials;j++) {
			let toAdd = [];
			if (extension_cold_cache[i][j] && extension_cold_cache[i][j][0] && extension_cold_cache[i][j][0] !== -1) {
				toAdd[0] = extension_cold_cache[i][j][1] - extension_cold_cache[i][j][0];
				toAdd[1] = extension_cold_cache[i][j][2] - extension_cold_cache[i][j][0];
				toAdd[2] = extension_cold_cache[i][j][4] - extension_cold_cache[i][j][0];
				toAdd[3] = extension_cold_cache[i][j][6];
			} else {
				toAdd[0] = 25000;
				toAdd[1] = 25000;
				toAdd[2] = 25000;
				toAdd[3] = max_byte_size;
			}
			if (toAdd[3] === 0) {
				toAdd[3] = max_byte_size;
			}
			if (toAdd[0] === 0) {
				toAdd[0] = extension_cold_cache[i][j][3];
			}
			if (toAdd[1] === 0) {
				toAdd[1] = extension_cold_cache[i][j][3];
			}
			newRes.push(toAdd);
		}
		extension_cold_cache_results.push(newRes);
	}

	for (i=0; i<extension_warm_cache.length; i++) {
		for (j=0; j<trials; j++) {
			if (extension_warm_cache[i][6] > max_byte_size) {
				max_byte_size = extension_warm_cache[i][6];
			}
		}
	}


	for (i=0; i<extension_warm_cache.length; i++) {
		let newRes = [];
		let j;
		for (j=0;j<trials;j++) {
			let toAdd = [];
			if (extension_warm_cache[i][j] && extension_warm_cache[i][j][0] && extension_warm_cache[i][j][0] !== -1) {
				toAdd[0] = extension_warm_cache[i][j][1] - extension_warm_cache[i][j][0];
				toAdd[1] = extension_warm_cache[i][j][2] - extension_warm_cache[i][j][0];
				toAdd[2] = extension_warm_cache[i][j][4] - extension_warm_cache[i][j][0];
				toAdd[3] = extension_warm_cache[i][j][6];
			} else {
				toAdd[0] = 25000;
				toAdd[1] = 25000;
				toAdd[2] = 25000;
				toAdd[3] = max_byte_size;
			}
			if (toAdd[3] === 0) {
				toAdd[3] = max_byte_size;
			}
			if (toAdd[0] === 0) {
				toAdd[0] = extension_warm_cache[i][j][3];
			}
			if (toAdd[1] === 0) {
				toAdd[1] = extension_warm_cache[i][j][3];
			}
			newRes.push(toAdd);
		}
		extension_warm_cache_results.push(newRes);
	}

	for (i=0; i<no_extension_cold_cache.length; i++) {
		for (j=0; j<trials; j++) {
			if (no_extension_cold_cache[i][6] > max_byte_size) {
				max_byte_size = no_extension_cold_cache[i][6];
			}
		}
	}

	for (i=0; i<no_extension_cold_cache.length; i++) {
		let newRes = [];
		let j;
		for (j=0;j<trials;j++) {
			let toAdd = [];
			if (no_extension_cold_cache[i][j] && no_extension_cold_cache[i][j][0] && no_extension_cold_cache[i][j][0] !== -1) {
				toAdd[0] = no_extension_cold_cache[i][j][1] - no_extension_cold_cache[i][j][0];
				toAdd[1] = no_extension_cold_cache[i][j][2] - no_extension_cold_cache[i][j][0];
				toAdd[2] = no_extension_cold_cache[i][j][4] - no_extension_cold_cache[i][j][0];
				toAdd[3] = no_extension_cold_cache[i][j][6];
			} else {
				toAdd[0] = 25000;
				toAdd[1] = 25000;
				toAdd[2] = 25000;
				toAdd[3] = max_byte_size;
			}
			if (toAdd[3] === 0) {
				toAdd[3] = max_byte_size;
			}
			if (toAdd[0] === 0) {
				toAdd[0] = no_extension_cold_cache[i][j][3];
			}
			if (toAdd[1] === 0) {
				toAdd[1] = no_extension_cold_cache[i][j][3];
			}
			newRes.push(toAdd);
		}
		no_extension_cold_cache_results.push(newRes);
	}


	for (i=0; i<no_extension_warm_cache.length; i++) {
		for (j=0; j<trials; j++) {
			if (no_extension_warm_cache[i][6] > max_byte_size) {
				max_byte_size = no_extension_warm_cache[i][6];
			}
		}
	}

	for (i=0; i<no_extension_warm_cache.length; i++) {
		let newRes = [];
		let j;
		for (j=0;j<trials;j++) {
			let toAdd = [];
			if (no_extension_warm_cache[i][j] && no_extension_warm_cache[i][j][0] && no_extension_warm_cache[i][j][0] !== -1) {
				toAdd[0] = no_extension_warm_cache[i][j][1] - no_extension_warm_cache[i][j][0];
				toAdd[1] = no_extension_warm_cache[i][j][2] - no_extension_warm_cache[i][j][0];
				toAdd[2] = no_extension_warm_cache[i][j][4] - no_extension_warm_cache[i][j][0];
				toAdd[3] = no_extension_warm_cache[i][j][6];
			} else {
				toAdd[0] = 25000;
				toAdd[1] = 25000;
				toAdd[2] = 25000;
				toAdd[3] = max_byte_size;
			}
			if (toAdd[3] === 0) {
				toAdd[3] = max_byte_size;
			}
			if (toAdd[0] === 0) {
				toAdd[0] = no_extension_warm_cache[i][j][3];
			}
			if (toAdd[1] === 0) {
				toAdd[1] = no_extension_warm_cache[i][j][3];
			}
			newRes.push(toAdd);
		}
		no_extension_warm_cache_results.push(newRes);
	}

	//get means from valid results
	let no_extension_cold_means = [];
	let no_extension_cold_medians = [];

	for (i=0;i<no_extension_cold_cache_results.length;i++) {
		let currMean = [];
		let currMedians = [];
		let j
		for (j=0; j<4; j++) {
			let pageMedians = [];
			let mean = 0;
			let k;
			for (k=0;k<trials;k++) {
				if (!Number.isNaN(no_extension_cold_cache_results[i][k][0])) {
					mean+=no_extension_cold_cache_results[i][k][j];
					pageMedians.push(no_extension_cold_cache_results[i][k][j]);
				}
			}
			currMean.push(mean/trials);
			pageMedians.sort((a, b) => a - b);
			currMedians.push(pageMedians[(trials-1)/2]);
		}
		no_extension_cold_medians.push(currMedians);
		no_extension_cold_means.push(currMean);
	}

	//get means from valid results
	let no_extension_warm_means = [];
	let no_extension_warm_medians = [];
	for (i=0;i<no_extension_warm_cache_results.length;i++) {
		let currMean = [];
		let currMedians = [];
		let j
		for (j=0; j<4; j++) {
			let pageMedians = [];
			let mean = 0;
			let k;
			for (k=0;k<trials;k++) {
				if (!Number.isNaN(no_extension_warm_cache_results[i][k][0])) {
					mean+=no_extension_warm_cache_results[i][k][j];
					pageMedians.push(no_extension_warm_cache_results[i][k][j]);
				}
			}
			currMean.push(mean/trials);
			pageMedians.sort((a, b) => a - b);
			currMedians.push(pageMedians[(trials-1)/2]);
		}
		no_extension_warm_medians.push(currMedians);
		no_extension_warm_means.push(currMean);
	}

	//get means from valid results
	let extension_cold_means = [];
	let extension_cold_medians = [];
	for (i=0;i<extension_cold_cache_results.length;i++) {
		let currMean = [];
		let currMedians = [];
		let j
		for (j=0; j<4; j++) {
			let pageMedians = [];
			let mean = 0;
			let k;
			for (k=0;k<trials;k++) {
				if (!Number.isNaN(extension_cold_cache_results[i][k][0])) {
					mean+=extension_cold_cache_results[i][k][j];
					pageMedians.push(extension_cold_cache_results[i][k][j]);
				}
			}
			currMean.push(mean/trials);
			pageMedians.sort((a, b) => a - b);
			currMedians.push(pageMedians[(trials-1)/2]);
		}
		extension_cold_means.push(currMean);
		extension_cold_medians.push(currMedians);
	}

	let extension_warm_means = [];
	let extension_warm_medians = [];

	for (i=0;i<extension_warm_cache_results.length;i++) {
		let currMean = [];
		let currMedians = [];
		let j
		for (j=0; j<4; j++) {
			let pageMedians = [];
			let mean = 0;
			let k;
			for (k=0;k<trials;k++) {
				if (!Number.isNaN(extension_warm_cache_results[i][k][0])) {
					mean+=extension_warm_cache_results[i][k][j];
					pageMedians.push(extension_warm_cache_results[i][k][j]);
				}
			}
			currMean.push(mean/trials);
			pageMedians.sort((a, b) => a - b);
			currMedians.push(pageMedians[(trials-1)/2]);
		}
		extension_warm_means.push(currMean);
		extension_warm_medians.push(currMedians);
	}

	let counter_cold_means = 0;
	let counter_cold_medians = 0;

	let counter_warm_means = 0;
	let counter_warm_medians = 0;

	for (i=0; i<extension_cold_medians.length; i++) {
		if (extension_cold_medians[i][0] > no_extension_cold_medians[i][0]) {
			counter_cold_medians++;
		}
		if (extension_cold_means[i][0] > no_extension_cold_means[i][0]) {
			counter_cold_means++;
		}
		if (extension_warm_medians[i][0] > no_extension_warm_medians[i][0]) {
			counter_cold_medians++;
		}
		if (extension_warm_means[i][0] > no_extension_warm_means[i][0]) {
			counter_cold_means++;
		}
	}

	let extension_cold_sizes = [];
	let speedups_cold_responseStart = [];
	let speedups_cold_responseEnd = [];
	let speedups_cold_domResponse = [];

	let speedups_warm_responseStart = [];
	let speedups_warm_responseEnd = [];
	let speedups_warm_domResponse = [];

	for (i=0; i<extension_cold_medians.length; i++) {
		extension_cold_sizes.push(extension_cold_medians[i][3]);
		let speedup_cold_responseStart = 100*(extension_cold_medians[i][0] - no_extension_cold_medians[i][0])/(no_extension_cold_medians[i][0]+1);
		let speedup_cold_responseEnd = 100*(extension_cold_medians[i][1] - no_extension_cold_medians[i][1])/(no_extension_cold_medians[i][1]+1);
		let speedup_cold_domResponse = 100*(extension_cold_medians[i][2] - no_extension_cold_medians[i][2])/(no_extension_cold_medians[i][2]+1);

		speedups_cold_responseStart.push(speedup_cold_responseStart);
		speedups_cold_responseEnd.push(speedup_cold_responseEnd);
		speedups_cold_domResponse.push(speedup_cold_domResponse);

		let speedup_warm_responseStart = 100*(extension_warm_medians[i][0] - no_extension_warm_medians[i][0])/(no_extension_warm_medians[i][0]+1);
		let speedup_warm_responseEnd = 100*(extension_warm_medians[i][1] - no_extension_warm_medians[i][1])/(no_extension_warm_medians[i][1]+1);
		let speedup_warm_domResponse = 100*(extension_warm_medians[i][2] - no_extension_warm_medians[i][2])/(no_extension_warm_medians[i][2]+1);

		speedups_warm_responseStart.push(speedup_warm_responseStart);
		speedups_warm_responseEnd.push(speedup_warm_responseEnd);
		speedups_warm_domResponse.push(speedup_warm_domResponse);
	}

	let sizeMap = new Map();

	for (i=0; i<extension_cold_sizes.length; i++) {
		let tmp = sizeMap.get(extension_cold_sizes[i]);
		if (!!tmp) {
			sizeMap.set(extension_cold_sizes[i], Math.max(tmp, extension_cold_medians[i][1]));
		}
		else {
			sizeMap.set(extension_cold_sizes[i], extension_cold_medians[i][1]);
		}
	}

	let sortedMap = sorted = Array.from(sizeMap.keys()).sort((a,b) => a-b).map(function(k) {return {key: k, value: sizeMap.get(k)}});
	let sizes = [];
	let times = [];
	for (i=0; i<sorted.length; i++) {
		times.push(sorted[i].value);
		sizes.push(sorted[i].key);
	}


	stream = fs.createWriteStream("./results_empty/speedups_warm_responseEnd.txt", {flags:'a'});
	stream.write(JSON.stringify(speedups_warm_responseEnd));
	stream.write(",");
	stream.end();

}