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

const trials = 10;

let extension_cold_cache = [];
let extension_warm_cache = [];
let no_extension_cold_cache = [];
let no_extension_warm_cache = [];
let profile_path = './firefox_profiles';

let options_extension_verify = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1.3-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true)
				  		.setProfile(profile_path);

let options_extension = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1.4-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true)
				  		.setProfile(profile_path);

let capabilities = new Capabilities()
				  		.setAlertBehavior(UserPromptHandler.ACCEPT);
			  		

let builder_extension = new Builder()
					.withCapabilities(
				  		capabilities)
				  	.setFirefoxOptions(
				        options_extension)
				  	.forBrowser('firefox');

let builder_extension_verify = new Builder()
					.withCapabilities(
				  		capabilities)
				  	.setFirefoxOptions(
				        options_extension_verify)
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
 
async function run_tests_cold_extension(url) {
  	let loadTimes = [];
  	let loadTime = 0;
	let j;
	var start1 = new Date();
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
		 	driver = await builder_extension.build();
		 	await driver.manage().setTimeouts({pageLoad: 25000});
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
			loadTimes = data;
			if (driver) {
				await driver.quit();
			}
		}
		
	
	return loadTimes;
}

async function run_tests_warm_extension(url, driver) {
	let j;
	let loadTimes = [];
  	let loadTime = 0;
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
	} finally {
		loadTimes = data;
	}	
	return loadTimes;
}

async function run_tests_cold_no_extension(url) {
  	let loadTimes = [];
  	let loadTime = 0;
	let j;

		loadTime = 0;
		let driver;
		let data = [];
		try {
		 	driver = await builder_no_extension.build();
		 	await driver.manage().setTimeouts({pageLoad: 25000});
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
			loadTimes = data;
			if (driver) {
				await driver.quit();
			}
		}
		
	
	return loadTimes;
}

async function run_tests_warm_no_extension(url,driver) {
	let loadTimes = [];
  	let loadTime = 0;
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
	} finally {
		loadTimes = data;
	}
	
	return loadTimes;
}


async function initTests(proc_start,proc_end) { 

	let loadTimes;
	let stream;
	let i;



	for (i=proc_start;i<proc_end;i++) {
		let loadTimesColdExtension = [];
		let loadTimesColdNoExtension = [];
		let loadTimesWarmExtension = [];
		let loadTimesWarmNoExtension = [];

		let url = urls[i];
		let j;
		let warm_extension_driver;
		let warm_no_extension_driver;
		try {
		 	warm_extension_driver = await builder_extension.build();
		 	await warm_extension_driver.manage().setTimeouts({pageLoad: 25000});
		 	await warm_extension_driver.get("https://www.example.com");

		 	warm_no_extension_driver = await builder_no_extension.build();
		 	await warm_no_extension_driver.manage().setTimeouts({pageLoad: 25000});
		 	await warm_no_extension_driver.get("https://www.example.com");
		} catch (err) {
			console.log('error in tests when when building warm drivers: ' + err);
		}

		for (j=0; j<trials;j++) {
			loadTime = await run_tests_cold_extension(url);
			loadTimesColdExtension.push(loadTime);

			loadTime = await run_tests_cold_no_extension(url);
			loadTimesColdNoExtension.push(loadTime);


			loadTime = await run_tests_warm_extension(url,warm_extension_driver);
			loadTimesWarmExtension.push(loadTime);


			loadTime = await run_tests_warm_no_extension(url,warm_no_extension_driver);
			loadTimesWarmNoExtension.push(loadTime);
		
		}

		if (warm_extension_driver) {
			try {
				await warm_extension_driver.quit();	
			} catch (err) {
				//couldn't quit driver, session was already disconnected, so carry on
				console.log("error when quitting warm extension driver, session was already disconnected: " + err);
			}
		}

		if (warm_no_extension_driver) {
			try {
				await warm_no_extension_driver.quit();	
			} catch (err) {
				//couldn't quit driver, session was already disconnected, so carry on
				console.log("error when quitting warm no extension driver, session was already disconnected: " + err);
			}
		}

		console.log("latest load time for cold extension page " + url + ": " + JSON.stringify(loadTimesColdExtension.slice(-1)[0]));
		console.log("latest load time for warm extension page " + url + ": " + JSON.stringify(loadTimesWarmExtension.slice(-1)[0]));
		console.log("latest load time for warm no extension page " + url + ": " + JSON.stringify(loadTimesWarmNoExtension.slice(-1)[0]));
		console.log("latest load time for cold no extension page " + url + ": " + JSON.stringify(loadTimesColdNoExtension.slice(-1)[0]));

		extension_cold_cache.push(loadTimesColdExtension);
		no_extension_cold_cache.push(loadTimesColdNoExtension);
		extension_warm_cache.push(loadTimesWarmExtension);
		no_extension_warm_cache.push(loadTimesWarmNoExtension);

		stream = fs.createWriteStream("./results_interleaved/extension_cold_top_results.txt", {flags:'a'});
		stream.write(JSON.stringify(loadTimesColdExtension));
		stream.write(",");
		stream.end();

		stream = fs.createWriteStream("./results_interleaved/no_extension_cold_top_results.txt", {flags:'a'});
		stream.write(JSON.stringify(loadTimesColdNoExtension));
		stream.write(",");
		stream.end();

		stream = fs.createWriteStream("./results_interleaved/extension_warm_top_results.txt", {flags:'a'});
		stream.write(JSON.stringify(loadTimesWarmExtension));
		stream.write(",");
		stream.end();

		stream = fs.createWriteStream("./results_interleaved/no_extension_warm_top_results.txt", {flags:'a'});
		stream.write(JSON.stringify(loadTimesWarmNoExtension));
		stream.write(",");
		stream.end();
	}

	return true;
}


let proc_start = Number(process.argv[2]);
let proc_end = Number(process.argv[3]);

initTests(proc_start,proc_end).then(function(results) {
	processResults();
	console.log("finished tests");
}).catch(function (err) {
	console.log("error when testing", err);
}); 	

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

	speedups_cold_responseStart.sort((a, b) => a - b);
	speedups_cold_responseEnd.sort((a, b) => a - b);
	speedups_cold_domResponse.sort((a, b) => a - b);
	speedups_warm_responseStart.sort((a, b) => a - b);
	speedups_warm_responseEnd.sort((a, b) => a - b);
	speedups_warm_domResponse.sort((a, b) => a - b);
	extension_cold_sizes.sort((a, b) => a - b);

	stream = fs.createWriteStream("./results_interleaved/speedups_cold_responseStart.txt", {flags:'a'});
	stream.write(JSON.stringify(speedups_cold_responseStart));
	stream.write(",");
	stream.end();

	stream = fs.createWriteStream("./results_interleaved/speedups_cold_responseEnd.txt", {flags:'a'});
	stream.write(JSON.stringify(speedups_cold_responseEnd));
	stream.write(",");
	stream.end();

	stream = fs.createWriteStream("./results_interleaved/speedups_cold_domResponse.txt", {flags:'a'});
	stream.write(JSON.stringify(speedups_cold_domResponse));
	stream.write(",");
	stream.end();

	stream = fs.createWriteStream("./results_interleaved/speedups_warm_responseStart.txt", {flags:'a'});
	stream.write(JSON.stringify(speedups_warm_responseStart));
	stream.write(",");
	stream.end();

	stream = fs.createWriteStream("./results_interleaved/speedups_warm_responseEnd.txt", {flags:'a'});
	stream.write(JSON.stringify(speedups_warm_responseEnd));
	stream.write(",");
	stream.end();

	stream = fs.createWriteStream("./results_interleaved/speedups_warm_domResponse.txt", {flags:'a'});
	stream.write(JSON.stringify(speedups_warm_domResponse));
	stream.write(",");
	stream.end();

	stream = fs.createWriteStream("./results_interleaved/extension_cold_sizes.txt", {flags:'a'});
	stream.write(JSON.stringify(extension_cold_sizes));
	stream.write(",");
	stream.end();


}