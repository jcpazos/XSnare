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
const urls = ["wp-admin/options-general.php?page=rcc-settings", "wp-admin/admin.php?page=rcsm-weblizar", "wp-admin/admin.php?page=activity_log_page","wp-admin/profile.php?wp_http_referer=%2Fwp-admin%2Fusers.php","wp-admin/admin.php?page=wpdevart-extras", "wp-admin/admin.php?page=wpdevart-forms", "wp-admin/admin.php?page=bookly-payments", "wp-admin/admin.php?edit=CF5d5f250093242&page=caldera-forms", "wp-admin/profile.php", "wp-admin/admin-ajax.php?action=wpdm_generate_password", "wp-admin/admin.php?page=tonjoo_excerpt", "wp-admin/post.php?post=10&action=edit", "wp-admin/options-general.php?page=flickrrss-settingspage.php", "wp-admin/admin.php?page=gd-rating-system-information&panel=%27%22%3E%3Csvg%2Fonload%3Dconsole.log%28%2Fxss%2F%29%3E%3C%27%22", "wp-admin/index.php", "wp-admin/options-general.php?page=wpdf-options", "wp-admin/admin.php?page=loginizer_brute_force", "wp-admin/admin.php?page=quizlord", "wp-admin/options-general.php?page=read-and-understood-menu-slug-01", "wp-admin/options-general.php?page=relevanssi%2Frelevanssi.php" , 'wp-content/plugins/sagepay-server-gateway-for-woocommerce/includes/pages/redirect.php?page=</script>"><script>alert("R1XS4.COM")</script>', "wp-content/plugins/share-this-image/sharer.php", 'wp-admin/edit.php?post_type=sdm_downloads']
let prepend = 'http://localhost:8080/'

for (var k = 0; k<urls.length; k++) {
	urls[k] = prepend + urls[k];
}

const trials = 20;

let options_extension_verify = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1.3-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true);
let options_extension = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1.4-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true);

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
				        .headless();	

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
 
async function run_tests_cold_extension(url) {
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
		 	driver = await builder_extension.build();

		 	await driver.manage().setTimeouts({pageLoad: 25000});
		 	await driver.get("http://localhost:8080/wp-admin");
		 	await driver.findElement(By.id('user_login')).sendKeys('root');
		 	await sleep(1000);
	 		await driver.findElement(By.id('user_pass')).sendKeys('root');
	 		await sleep(1000);
	 		await driver.executeScript('document.getElementById("loginform").submit()');
	 		await sleep(1000);
	 		if (j==0) {
		 		await driver.get('http://localhost:8080/wp-admin/plugins.php');
		 		await driver.executeScript('document.getElementsByClassName("activate")[0].firstElementChild.click()');
		 		await sleep(1000);
	 		}
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
	console.log("latest load time for cold extension page " + url + ": " + JSON.stringify(loadTime));
	//console.log("tests took: " + (end5-start1));
	return loadTimes;
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
		driver = await builder_extension_verify.build();
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

async function run_tests_cold_no_extension(url) {
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
		 	driver = await builder_no_extension.build();
		 	await driver.manage().setTimeouts({pageLoad: 25000});
		 	await driver.get("http://localhost:8080/wp-admin");
		 	await driver.findElement(By.id('user_login')).sendKeys('root');
		 	await sleep(1000);
	 		await driver.findElement(By.id('user_pass')).sendKeys('root');
	 		await sleep(1000);
	 		await driver.executeScript('document.getElementById("loginform").submit()');
	 		await sleep(1000);

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
	console.log("latest load time cold no extension for page " + url + ": " + JSON.stringify(loadTime));
	//console.log("tests took: " + (end5-start1));
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
		driver = await builder_no_extension.build();
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

	loadTimes = await run_tests_cold_extension(url);
	/*fs.writeFile("extension_cold_cache_wp_results_" + plugin +".txt", JSON.stringify(loadTimes), (err) => {
			if (err) console.log(err);
			console.log("Successfully written to cold extension file.");
	});*/
	stream = fs.createWriteStream("extension_cold_cache_wordpress_results.txt", {flags:'a'});
	stream.write(JSON.stringify(loadTimes));
	stream.write(",");
	stream.end();


	loadTimes = await run_tests_warm_extension(url);
	/*fs.writeFile("extension_cold_cache_wp_results_" + plugin +".txt", JSON.stringify(loadTimes), (err) => {
			if (err) console.log(err);
			console.log("Successfully written to warm extension file.");
	});*/
	stream = fs.createWriteStream("extension_warm_cache_wordpress_results.txt", {flags:'a'});
	stream.write(JSON.stringify(loadTimes));
	stream.write(",");
	stream.end();

	loadTimes = await run_tests_cold_no_extension(url);
	/*fs.writeFile("no_extension_cold_cache_wp_results_" + plugin +".txt", JSON.stringify(loadTimes), (err) => {
			if (err) console.log(err);
			console.log("Successfully written to cold no extension file.");
	});*/
	stream = fs.createWriteStream("no_extension_cold_cache_wordpress_results.txt", {flags:'a'});
	stream.write(JSON.stringify(loadTimes));
	stream.write(",");
	stream.end();

	loadTimes = await run_tests_warm_no_extension(url);
	/*fs.writeFile("no_extension_warm_cache_wp_results_" + plugin +".txt", JSON.stringify(loadTimes), (err) => {
			if (err) console.log(err);
			console.log("Successfully written warm no extension to file.");
	});*/
	stream = fs.createWriteStream("no_extension_warm_cache_wordpress_results.txt", {flags:'a'});
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
	console.log("Tests successfully completed");
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

