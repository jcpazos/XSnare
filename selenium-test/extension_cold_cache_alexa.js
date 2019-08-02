const {Builder, By, Key, logging, until} = require('selenium-webdriver');
const {Capabilities, UserPromptHandler} = require('selenium-webdriver/lib/capabilities');
const {NoSuchWindowError} =  require('selenium-webdriver/lib/error')
var firefox = require('selenium-webdriver/firefox');
const urlString = 'www.microsoft.com,www.google.com,apple.com,www.blogger.com,support.google.com,play.google.com,youtube.com,plus.google.com,en.wikipedia.org,mozilla.org,docs.google.com,accounts.google.com,adobe.com,wordpress.org,sites.google.com,drive.google.com,youtu.be,github.com,creativecommons.org,maps.google.com,linkedin.com,vimeo.com,uol.com.br,cloudflare.com,amazon.com,bbc.co.uk,europa.eu,live.com,istockphoto.com,dailymotion.com,vk.com,nih.gov,theguardian.com,slideshare.net,google.es,cnet.com,usatoday.com,scribd.com,cnn.com,developers.google.com,w3.org,bbc.com,gstatic.com,imdb.com,line.me,photos.google.com,mail.google.com,hugedomains.com,mail.ru,nytimes.com,es.wikipedia.org,msn.com,medium.com,google.co.uk,whatsapp.com,forbes.com,www.yahoo.com,opera.com,news.google.com,fr.wikipedia.org,reuters.com,myspace.com,networkadvertising.org,pt.wikipedia.org,dropbox.com,paypal.com,google.com.br,amazon.co.jp,facebook.com,google.de,news.yahoo.com,feedburner.com,wikimedia.org,mediafire.com,google.co.jp,ebay.com,techcrunch.com,files.wordpress.com,get.google.com,cpanel.net,yelp.com,samsung.com,groups.google.com,www.gov.uk,hp.com,goodreads.com,washingtonpost.com,apache.org,about.com,archive.org,youronlinechoices.com,bit.ly,steampowered.com,oracle.com,google.fr,change.org,abcnews.go.com,wsj.com,terra.com.br,goo.gl,un.org,playstation.com,elpais.com,booking.com,bing.com,picasaweb.google.com,aol.com,policies.google.com,harvard.edu,nypost.com,engadget.com,ipv4.google.com,marketingplatform.google.com,translate.google.com,fb.com,wikia.com,t.me,bloomberg.com,id.wikipedia.org,ok.ru,wired.com,www.wix.com,ted.com,amazon.de,cbsnews.com,code.google.com,myaccount.google.com,gnu.org,android.com,surveymonkey.com,nasa.gov,hatena.ne.jp,books.google.com,disqus.com,aliexpress.com,pinterest.com,telegraph.co.uk,buydomains.com,tools.google.com,ft.com,rakuten.co.jp,dailymail.co.uk,de.wikipedia.org,draft.blogger.com,rt.com,google.ru,foxnews.com,stanford.edu,abril.com.br,cdc.gov,lefigaro.fr,huffingtonpost.com,amazon.co.uk,telegram.me,businessinsider.com,google.it,issuu.com,aboutads.info,tinyurl.com,ox.ac.uk,ucoz.ru,alibaba.com,ig.com.br,mega.nz,gmail.com,doubleclick.net,pl.wikipedia.org,4shared.com,usnews.com,skype.com,naver.com,welt.de,thetimes.co.uk,disney.com,eventbrite.com,wikihow.com,espn.com,rambler.ru,picasa.google.com,twitch.tv,shopify.com,themeforest.net,netflix.com,e-recht24.de,academia.edu,php.net,loc.gov,foursquare.com,news.com.au,channel4.com,repubblica.it,asus.com,thesun.co.uk,zdnet.com,blackberry.com,plesk.com,t.co,mit.edu,www.wikipedia.org,hollywoodreporter.com,google.pl,soundcloud.com,sciencemag.org,lemonde.fr,pbs.org,clickbank.net,sciencedirect.com,fortune.com,mirror.co.uk,abc.net.au,ign.com,bitly.com,target.com,walmart.com,imageshack.us,wa.me,indiatimes.com,iubenda.com,ndtv.com,cbc.ca,spotify.com,huffpost.com,about.me,yale.edu,gravatar.com,bandcamp.com,adssettings.google.com,xbox.com,dell.com,smh.com.au,depositfiles.com,sedo.com,a8.net,independent.co.uk,wp.com,sciencedaily.com,bt.com,ovh.co.uk,it.wikipedia.org,entrepreneur.com,unesco.org,webmd.com,berkeley.edu,express.co.uk,ja.wikipedia.org,nationalgeographic.com,undeveloped.com,www.weebly.com,stackoverflow.com,wpfr.net,amazon.es,worldbank.org,ietf.org,bund.de,xinhuanet.com,vice.com,secureserver.net,photos1.blogger.com,sky.com,000webhost.com,ameblo.jp,photobucket.com,cisco.com,akamaihd.net,psychologytoday.com,sapo.pt,lycos.com,whitehouse.gov,qq.com,ikea.com,ea.com,naver.jp,spiegel.de,intel.com,search.yahoo.com,amazon.fr,nhk.or.jp,buzzfeed.com,cambridge.org,allaboutcookies.org,britannica.com,nikkei.com,fastcompany.com,bp3.blogger.com,yahoo.co.jp,marketwatch.com,viglink.com,metro.co.uk,npr.org,kickstarter.com,windowsphone.com,rapidshare.com,google.co.in,columbia.edu,cornell.edu,gofundme.com,bp2.blogger.com,cpanel.com,google.nl,my.yahoo.com,ria.ru,stuff.co.nz,ytimg.com,guardian.co.uk,abc.es,gooyaabitemplates.com,rtve.es,urbandictionary.com,shutterstock.com,howstuffworks.com,finance.yahoo.com,noaa.gov,nydailynews.com,umich.edu,elmundo.es,goo.ne.jp,nature.com,nginx.org,search.google.com,mozilla.com,cnbc.com,chicagotribune.com,godaddy.com,instagram.com,rottentomatoes.com,princeton.edu,fandom.com,bp0.blogger.com,nvidia.com,twitter.com,sendspace.com,list-manage.com,mashable.com,privacyshield.gov,ggpht.com,weibo.com,ovh.com,mysql.com,nokia.com,ru.wikipedia.org,theverge.com,tripadvisor.com,gizmodo.com,instructables.com,pixabay.com,quora.com,addthis.com,www.over-blog.com,latimes.com,yadi.sk,yandex.ru,netvibes.com,parallels.com,dw.com,office.com,who.int,googleblog.com,espn.go.com,economist.com,addtoany.com,hm.com,ovh.net,time.com,newsweek.com,ask.fm,ibm.com,google.ca,so-net.ne.jp,box.com,biblegateway.com,boston.com,sports.yahoo.com,adweek.com,behance.net,nginx.com,example.com,offset.com,steamcommunity.com,ca.gov,greenpeace.org,digg.com,csmonitor.com,house.gov,ehow.com,fda.gov,siemens.com,indiegogo.com,icann.org,state.gov,dribbble.com,wiley.com,zendesk.com,nifty.com,wiktionary.org,narod.ru,utexas.edu,thefreedictionary.com,www.livejournal.com,stores.jp,sina.com.cn,nba.com,newyorker.com,eonline.com,cbslocal.com,mercurynews.com,google.com.au,corriere.it,feedproxy.google.com,axs.com,sputniknews.com,people.com,mayoclinic.org,thestar.com,sfgate.com,ebay.co.uk,discovery.com,standard.co.uk,foodnetwork.com,cocolog-nifty.com,www.baidu.com,thedailybeast.com,geocities.jp,slate.com,interia.pl,xing.com,variety.com,joomla.org,marriott.com,pastebin.com,m.wikipedia.org,arstechnica.com,home.pl,sakura.ne.jp,dreniq.com,tabelog.com,biglobe.ne.jp,trustpilot.com,washington.edu,newscientist.com,bp1.blogger.com,scholastic.com,theatlantic.com,seattletimes.com,inc.com,venturebeat.com,mixcloud.com,calendar.google.com,video.google.com,answers.yahoo.com,odnoklassniki.ru,scientificamerican.com,usa.gov,ftc.gov,nbcnews.com,www.nhs.uk,people.com.cn,namecheap.com,pcmag.com,storify.com,wattpad.com,mail.yahoo.com,megaupload.com,symantec.com,cmu.edu,history.com,www.canalblog.com,merriam-webster.com,dictionary.com,usgs.gov,www.skyrock.com,archives.gov,imgur.com,disney.go.com,etsy.com,ieee.org,amazon.ca,businesswire.com,oup.com,teamviewer.com,plos.org,allrecipes.com,asahi.com,ustream.tv,springer.com,daum.net,uiuc.edu,fifa.com,excite.co.jp,livescience.com,dropboxusercontent.com,tmz.com,prezi.com,web.fc2.com,groups.yahoo.com,vkontakte.ru,chinadaily.com.cn'
var urlArray = urlString.split(",");
for (var i = 0; i<urlArray.length; i++) {
	urlArray[i] = "https://" + urlArray[i];
}
var fs = require("fs");


let urls = urlArray;

const trials = 5;

let options = new firefox.Options()
				        .headless()
				  		.addExtensions('../dom_firewall_firefox/web-ext-artifacts/dom_firewall-0.1-an+fx.xpi')
				  		.setPreference('extensions.dom_firewall.showChromeErrors', true);
let capabilities = new Capabilities()
				  		.setAlertBehavior(UserPromptHandler.ACCEPT);

let builder = new Builder()
					.withCapabilities(
				  		capabilities)
				  	.setFirefoxOptions(
				        options)
				  	.forBrowser('firefox');
 
async function run_tests_extension(start, end) {
  	let loadTimes = [[], [], [], []];
  	let loadTime = 0;
	let i;
	for (i=start; i<10; i++) {
		let j;
		for (j=0; j<trials; j++) {
			loadTime = 0;
			let driver;
			try {
			 	driver = await builder.build();
				await driver.get(urls[i]);
				loadTime = await driver.executeScript('return performance.getEntriesByType("navigation")[0]');
				console.log(loadTime);
				loadTimes[0].push(loadTime);
				/*loadTimes[1].push();
				loadTimes[2].push();
				loadTimes[3].push();*/	
			} catch (err) {
				console.log('error in extension tests when loading page ' + urls[i] + ': ' + err);
			} finally {
				await driver.quit();
			}
			
		}
		console.log("latest load time for page " + urls[i] + ": " + loadTime);
	} 
	return loadTimes;
}



function initExtensionTests(start, end) {
	run_tests_extension(start, end).then(function (loadTimes) {
	if (extensionLoadTimes.length !== urls.length) {
		initExtensionTests(extensionLoadTimes.length, urls.length);
	}
	console.log("Load times without extension running: " + extensionLoadTimes);
	}).catch (function (err) {
		console.log("initextensiontests err : " + err);
		initExtensionTests(extensionLoadTimes.length, urls.length);
	});
}


//initExtensionTests(0, urls.length);

run_tests_extension(0, urls.length).then(function (loadTimes) {
	fs.writeFile("extension_cold_cache_results.txt", loadTimes, (err) => {
		if (err) console.log(err);
		console.log("Successfully written to file.");
	});
}).catch (function (err) {
	console.log("initextensiontests err : " + err);
});

