//var hrstart = process.hrtime();
//var timeStart = new Date();
const {Builder, By, Key, logging, until} = require('selenium-webdriver');
const {Capabilities, UserPromptHandler} = require('selenium-webdriver/lib/capabilities');
const {NoSuchWindowError} =  require('selenium-webdriver/lib/error')
//var out = require('ya-csv');
var firefox = require('selenium-webdriver/firefox');
const urlString = 'www.microsoft.com,www.google.com,apple.com,www.blogger.com,support.google.com,play.google.com,youtube.com,plus.google.com,en.wikipedia.org,mozilla.org,docs.google.com,accounts.google.com,adobe.com,wordpress.org,sites.google.com,drive.google.com,youtu.be,github.com,creativecommons.org,maps.google.com,linkedin.com,vimeo.com,uol.com.br,cloudflare.com,amazon.com,bbc.co.uk,europa.eu,live.com,istockphoto.com,dailymotion.com,vk.com,nih.gov,theguardian.com,slideshare.net,google.es,cnet.com,usatoday.com,scribd.com,cnn.com,developers.google.com,w3.org,bbc.com,gstatic.com,imdb.com,photos.google.com,mail.google.com,hugedomains.com,mail.ru,nytimes.com,es.wikipedia.org,msn.com,medium.com,google.co.uk,whatsapp.com,forbes.com,www.yahoo.com,opera.com,news.google.com,fr.wikipedia.org,reuters.com,networkadvertising.org,pt.wikipedia.org,dropbox.com,paypal.com,google.com.br,amazon.co.jp,facebook.com,google.de,news.yahoo.com,feedburner.com,wikimedia.org,mediafire.com,google.co.jp,ebay.com,techcrunch.com,files.wordpress.com,get.google.com,cpanel.net,yelp.com,samsung.com,groups.google.com,www.gov.uk,hp.com,goodreads.com,washingtonpost.com,apache.org,about.com,archive.org,youronlinechoices.com,bit.ly,steampowered.com,oracle.com,google.fr,change.org,abcnews.go.com,wsj.com,terra.com.br,goo.gl,un.org,playstation.com,elpais.com,booking.com,bing.com,picasaweb.google.com,aol.com,policies.google.com,harvard.edu,nypost.com,engadget.com,ipv4.google.com,marketingplatform.google.com,translate.google.com,fb.com,wikia.com,t.me,bloomberg.com,id.wikipedia.org,ok.ru,wired.com,www.wix.com,ted.com,amazon.de,cbsnews.com,code.google.com,myaccount.google.com,gnu.org,android.com,surveymonkey.com,nasa.gov,books.google.com,disqus.com,aliexpress.com,pinterest.com,telegraph.co.uk,tools.google.com,ft.com,rakuten.co.jp,de.wikipedia.org,draft.blogger.com,rt.com,google.ru,foxnews.com,stanford.edu,abril.com.br,cdc.gov,lefigaro.fr,huffingtonpost.com,amazon.co.uk,telegram.me,businessinsider.com,google.it,issuu.com,aboutads.info,tinyurl.com,ox.ac.uk,ucoz.ru,alibaba.com,mega.nz,gmail.com,doubleclick.net,pl.wikipedia.org,4shared.com,usnews.com,skype.com,naver.com,welt.de,disney.com,eventbrite.com,wikihow.com,espn.com,rambler.ru,picasa.google.com,twitch.tv,shopify.com,themeforest.net,netflix.com,e-recht24.de,academia.edu,php.net,loc.gov,foursquare.com,news.com.au,channel4.com,zdnet.com,blackberry.com,plesk.com,t.co,mit.edu,www.wikipedia.org,hollywoodreporter.com,google.pl,soundcloud.com,sciencemag.org,lemonde.fr,pbs.org,sciencedirect.com,fortune.com,mirror.co.uk,abc.net.au,ign.com,bitly.com,target.com,walmart.com,imageshack.us,wa.me,indiatimes.com,iubenda.com,cbc.ca,spotify.com,huffpost.com,about.me,yale.edu,gravatar.com,bandcamp.com,adssettings.google.com,xbox.com,dell.com,smh.com.au,depositfiles.com,sedo.com,a8.net,independent.co.uk,wp.com,sciencedaily.com,bt.com,ovh.co.uk,it.wikipedia.org,entrepreneur.com,berkeley.edu,express.co.uk,ja.wikipedia.org,nationalgeographic.com,undeveloped.com,www.weebly.com,stackoverflow.com,wpfr.net,amazon.es,ietf.org,bund.de,vice.com,photos1.blogger.com,000webhost.com,ameblo.jp,photobucket.com,cisco.com,psychologytoday.com,sapo.pt,lycos.com,whitehouse.gov,ea.com,naver.jp,spiegel.de,intel.com,search.yahoo.com,amazon.fr,buzzfeed.com,allaboutcookies.org,britannica.com,nikkei.com,fastcompany.com,bp3.blogger.com,yahoo.co.jp,viglink.com,metro.co.uk,npr.org,kickstarter.com,google.co.in,columbia.edu,cornell.edu,gofundme.com,bp2.blogger.com,cpanel.com,google.nl,my.yahoo.com,ria.ru,stuff.co.nz,guardian.co.uk,abc.es,gooyaabitemplates.com,urbandictionary.com,shutterstock.com,howstuffworks.com,finance.yahoo.com,umich.edu,elmundo.es,goo.ne.jp,nature.com,nginx.org,search.google.com,mozilla.com,cnbc.com,godaddy.com,instagram.com,rottentomatoes.com,princeton.edu,fandom.com,bp0.blogger.com,twitter.com,sendspace.com,mashable.com,weibo.com,ovh.com,mysql.com,nokia.com,ru.wikipedia.org,theverge.com,tripadvisor.com,gizmodo.com,pixabay.com,quora.com,addthis.com,www.over-blog.com,latimes.com,yadi.sk,yandex.ru,netvibes.com,parallels.com,dw.com,office.com,who.int,googleblog.com,espn.go.com,economist.com,addtoany.com,time.com,newsweek.com,ask.fm,ibm.com,google.ca,box.com,biblegateway.com,boston.com,sports.yahoo.com,adweek.com,behance.net,nginx.com,example.com,offset.com,steamcommunity.com,ca.gov,greenpeace.org,digg.com,csmonitor.com,house.gov,ehow.com,siemens.com,indiegogo.com,icann.org,state.gov,dribbble.com,wiley.com,zendesk.com,nifty.com,wiktionary.org,narod.ru,utexas.edu,thefreedictionary.com,www.livejournal.com,stores.jp,sina.com.cn,nba.com,newyorker.com,eonline.com,cbslocal.com,mercurynews.com,google.com.au,feedproxy.google.com,axs.com,sputniknews.com,people.com,mayoclinic.org,thestar.com,ebay.co.uk,discovery.com,standard.co.uk,www.baidu.com,thedailybeast.com,slate.com,interia.pl,xing.com,variety.com,joomla.org,marriott.com,pastebin.com,m.wikipedia.org,arstechnica.com,home.pl,tabelog.com,biglobe.ne.jp,trustpilot.com,washington.edu,newscientist.com,bp1.blogger.com,theatlantic.com,seattletimes.com,inc.com,venturebeat.com,mixcloud.com,calendar.google.com,video.google.com,answers.yahoo.com,odnoklassniki.ru,scientificamerican.com,usa.gov,ftc.gov,nbcnews.com,www.nhs.uk,namecheap.com,storify.com,wattpad.com,mail.yahoo.com,symantec.com,cmu.edu,history.com,www.canalblog.com,merriam-webster.com,dictionary.com,usgs.gov,www.skyrock.com,archives.gov,imgur.com,etsy.com,ieee.org,amazon.ca,businesswire.com,teamviewer.com,plos.org,allrecipes.com,asahi.com,ustream.tv,springer.com,daum.net,uiuc.edu,fifa.com,excite.co.jp,tmz.com,prezi.com,web.fc2.com,groups.yahoo.com,vkontakte.ru,chinadaily.com.cn'
var urlArray = urlString.split(",");
for (var k = 0; k<urlArray.length; k++) {
	urlArray[k] = "https://" + urlArray[k];
}
var fs = require("fs");

let urls = urlArray;

const trials = 25;

let options_extension = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1.5-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true);

let capabilities = new Capabilities()
				  		.setAlertBehavior(UserPromptHandler.ACCEPT);
			  		

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
			console.log('error in cold extension tests when loading page ' + url + ': ' + err);
			if (driver) {
				try {
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
					console.log("error when executing cold extension script, driver no longer available: " + err);
				}
			}
		} finally {
			loadTimes.push(data);
			if (driver) {
				end4 = new Date();
				await driver.quit();
				end5 = new Date();
				//console.log("Time to start driver: " + (end1-start1));
				//console.log("Time to await page get: " + (end2-end1));
				//console.log("Time to await script execute: " + (end3-end2));
				//console.log("Time to close driver: " + (end5-end4));

			}
		}
		
	}
	console.log("latest load time for cold extension page " + url + ": " + JSON.stringify(loadTime));
	//console.log("tests took: " + (end5-start1));
	return loadTimes;
}

async function run_tests_warm_extension(url) {
	let i;
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
				console.log("error when retrieving warm extension page: " + url + ': ' + err);
				if (driver) {
					try {
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
						console.log("error when executing warm extension script, driver no longer available: " + err);
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
		console.log('error in warm extension tests when building driver: ' + err);
	}
	if (driver) {
		end4 = new Date();
		try {
			await driver.quit();	
		} catch (err) {
			//couldn't quit driver, session was already disconnected, so carry on
			console.log("error when quitting warm extension driver, session was already disconnected: " + err);
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
	let i;
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
			console.log('error in cold no extension tests when loading page ' + url + ': ' + err);
			if (driver) {
				try {
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
					console.log("error when executing cold no extension script, driver no longer available: " + err);
				}
			}
		} finally {
			loadTimes.push(data);
			if (driver) {
				end4 = new Date();
				await driver.quit();
				end5 = new Date();
				/*console.log("Time to start driver: " + (end1-start1));
				console.log("Time to await page get: " + (end2-end1));
				console.log("Time to await script execute: " + (end3-end2));
				console.log("Time to close driver: " + (end5-end4));*/

			}
		}
		
	}
	console.log("latest load time for cold no extension page " + url + ": " + JSON.stringify(loadTime));
	return loadTimes;
}

async function run_tests_warm_no_extension(url) {
	let i;
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
				console.log("error when retrieving  warm no extension page: " + url + ': ' + err);
				if (driver) {
					try {
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
						console.log("error when executing warm no extension script, driver no longer available: " + err);
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
		console.log('error in warm no extension tests when building driver: ' + err);
	}
	if (driver) {
		end4 = new Date();
		try {
			await driver.quit();	
		} catch (err) {
			//couldn't quit driver, session was already disconnected, so carry on
			console.log("error when quitting warm no extension driver, session was already disconnected: " + err);
		}
		end5 = new Date();
		//console.log("Time to start driver: " + (end1-start1));
		//console.log("Time to await page get: " + (end2-end1));
		//console.log("Time to await script execute: " + (end3-end2));
		//console.log("Time to close driver: " + (end5-end4));
	}
	console.log("latest load time for warm no extension page " + url + ": " + JSON.stringify(loadTime));
	return loadTimes;
}


async function initTests(start, end) { 

	let loadTimes;
	let stream;
	let i;
	
	for (i=start; i<end; i++) {

		let url = urls[i];
		loadTimes = await run_tests_cold_extension(url);
		
		stream = fs.createWriteStream("extension_cold_top_results_identity.txt", {flags:'a'});
		stream.write(JSON.stringify(loadTimes));
		stream.write(",");
		stream.end();


		loadTimes = await run_tests_cold_no_extension(url);

		stream = fs.createWriteStream("no_extension_cold_top_results_identity.txt", {flags:'a'});
		stream.write(JSON.stringify(loadTimes));
		stream.write(",");
		stream.end();


		loadTimes = await run_tests_warm_extension(url);

		stream = fs.createWriteStream("extension_warm_top_results_identity.txt", {flags:'a'});
		stream.write(JSON.stringify(loadTimes));
		stream.write(",");
		stream.end();


		loadTimes = await run_tests_warm_no_extension(url);

		stream = fs.createWriteStream("no_extension_warm_top_results_identity.txt", {flags:'a'});
		stream.write(JSON.stringify(loadTimes));
		stream.write(",");
		stream.end();
	}

	return true;
}


const threads = 4;
let promises = [];
k = 0;
for (k=0; k < threads; k++) {
	if (k === (threads-1)) {
		promises.push(new Promise(function (resolve,reject) {
			resolve(initTests(k*110, 441));
			//resolve(initTests(k*1, 4));
		}));
	} else {
		promises.push(new Promise(function (resolve,reject) {
			resolve(initTests(k*110, (k+1)*110));
			//resolve(initTests(k*1, (k+1)*1));
		}));
	}
}



//initExtensionTests(0, urls.length);
//initExtensionTests(228, urls.length);
Promise.all(promises).then(function() {
	console.log("Tests successfully completed");
}).catch (function (err) {
	console.log("error when writing tests: " + err);
});

/*run_tests_extension(0, urls.length).then(function (loadTimes) {
	fs.writeFile("extension_warm_cache_results_" + end + ".txt", loadTimes, (err) => {
		if (err) console.log(err);
		console.log("Successfully written to file.");
	});
}).catch (function (err) {
	console.log("initextensiontests err : " + err);
});*/

