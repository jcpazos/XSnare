const readline = require('readline');
const fs = require('fs');
const urlString = 'www.microsoft.com,www.google.com,apple.com,www.blogger.com,support.google.com,play.google.com,youtube.com,plus.google.com,en.wikipedia.org,mozilla.org,docs.google.com,accounts.google.com,adobe.com,wordpress.org,sites.google.com,drive.google.com,youtu.be,github.com,creativecommons.org,maps.google.com,linkedin.com,vimeo.com,uol.com.br,cloudflare.com,amazon.com,bbc.co.uk,europa.eu,live.com,istockphoto.com,dailymotion.com,vk.com,nih.gov,theguardian.com,slideshare.net,google.es,cnet.com,usatoday.com,scribd.com,cnn.com,developers.google.com,w3.org,bbc.com,gstatic.com,imdb.com,photos.google.com,mail.google.com,hugedomains.com,mail.ru,nytimes.com,es.wikipedia.org,msn.com,medium.com,google.co.uk,whatsapp.com,forbes.com,www.yahoo.com,opera.com,news.google.com,fr.wikipedia.org,reuters.com,networkadvertising.org,pt.wikipedia.org,dropbox.com,paypal.com,google.com.br,amazon.co.jp,facebook.com,google.de,news.yahoo.com,feedburner.com,wikimedia.org,mediafire.com,google.co.jp,ebay.com,techcrunch.com,files.wordpress.com,get.google.com,cpanel.net,yelp.com,samsung.com,groups.google.com,www.gov.uk,hp.com,goodreads.com,washingtonpost.com,apache.org,about.com,archive.org,youronlinechoices.com,bit.ly,steampowered.com,oracle.com,google.fr,change.org,abcnews.go.com,wsj.com,terra.com.br,goo.gl,un.org,playstation.com,elpais.com,booking.com,bing.com,picasaweb.google.com,aol.com,policies.google.com,harvard.edu,nypost.com,engadget.com,ipv4.google.com,marketingplatform.google.com,translate.google.com,fb.com,wikia.com,t.me,bloomberg.com,id.wikipedia.org,ok.ru,wired.com,www.wix.com,ted.com,amazon.de,cbsnews.com,code.google.com,myaccount.google.com,gnu.org,android.com,surveymonkey.com,nasa.gov,books.google.com,disqus.com,aliexpress.com,pinterest.com,telegraph.co.uk,tools.google.com,ft.com,rakuten.co.jp,de.wikipedia.org,draft.blogger.com,rt.com,google.ru,foxnews.com,stanford.edu,abril.com.br,cdc.gov,lefigaro.fr,huffingtonpost.com,amazon.co.uk,telegram.me,businessinsider.com,google.it,issuu.com,aboutads.info,tinyurl.com,ox.ac.uk,ucoz.ru,alibaba.com,mega.nz,gmail.com,doubleclick.net,pl.wikipedia.org,4shared.com,usnews.com,skype.com,naver.com,welt.de,disney.com,eventbrite.com,wikihow.com,espn.com,rambler.ru,picasa.google.com,twitch.tv,shopify.com,themeforest.net,netflix.com,e-recht24.de,academia.edu,php.net,loc.gov,foursquare.com,news.com.au,channel4.com,zdnet.com,blackberry.com,plesk.com,t.co,mit.edu,www.wikipedia.org,hollywoodreporter.com,google.pl,soundcloud.com,sciencemag.org,lemonde.fr,pbs.org,sciencedirect.com,fortune.com,mirror.co.uk,abc.net.au,ign.com,bitly.com,target.com,walmart.com,imageshack.us,wa.me,indiatimes.com,iubenda.com,cbc.ca,spotify.com,huffpost.com,about.me,yale.edu,gravatar.com,bandcamp.com,adssettings.google.com,xbox.com,dell.com,smh.com.au,depositfiles.com,sedo.com,a8.net,independent.co.uk,wp.com,sciencedaily.com,bt.com,ovh.co.uk,it.wikipedia.org,entrepreneur.com,berkeley.edu,express.co.uk,ja.wikipedia.org,nationalgeographic.com,undeveloped.com,www.weebly.com,stackoverflow.com,wpfr.net,amazon.es,ietf.org,bund.de,vice.com,photos1.blogger.com,000webhost.com,ameblo.jp,photobucket.com,cisco.com,psychologytoday.com,sapo.pt,lycos.com,whitehouse.gov,ea.com,naver.jp,spiegel.de,intel.com,search.yahoo.com,amazon.fr,buzzfeed.com,allaboutcookies.org,britannica.com,nikkei.com,fastcompany.com,bp3.blogger.com,yahoo.co.jp,viglink.com,metro.co.uk,npr.org,kickstarter.com,google.co.in,columbia.edu,cornell.edu,gofundme.com,bp2.blogger.com,cpanel.com,google.nl,my.yahoo.com,ria.ru,stuff.co.nz,guardian.co.uk,abc.es,gooyaabitemplates.com,urbandictionary.com,shutterstock.com,howstuffworks.com,finance.yahoo.com,umich.edu,elmundo.es,goo.ne.jp,nature.com,nginx.org,search.google.com,mozilla.com,cnbc.com,godaddy.com,instagram.com,rottentomatoes.com,princeton.edu,fandom.com,bp0.blogger.com,twitter.com,sendspace.com,mashable.com,weibo.com,ovh.com,mysql.com,nokia.com,ru.wikipedia.org,theverge.com,tripadvisor.com,gizmodo.com,pixabay.com,quora.com,addthis.com,www.over-blog.com,latimes.com,yadi.sk,yandex.ru,netvibes.com,parallels.com,dw.com,office.com,who.int,googleblog.com,espn.go.com,economist.com,addtoany.com,time.com,newsweek.com,ask.fm,ibm.com,google.ca,box.com,biblegateway.com,boston.com,sports.yahoo.com,adweek.com,behance.net,nginx.com,example.com,offset.com,steamcommunity.com,ca.gov,greenpeace.org,digg.com,csmonitor.com,house.gov,ehow.com,siemens.com,indiegogo.com,icann.org,state.gov,dribbble.com,wiley.com,zendesk.com,nifty.com,wiktionary.org,narod.ru,utexas.edu,thefreedictionary.com,www.livejournal.com,stores.jp,sina.com.cn,nba.com,newyorker.com,eonline.com,cbslocal.com,mercurynews.com,google.com.au,feedproxy.google.com,axs.com,sputniknews.com,people.com,mayoclinic.org,thestar.com,ebay.co.uk,discovery.com,standard.co.uk,www.baidu.com,thedailybeast.com,slate.com,interia.pl,xing.com,variety.com,joomla.org,marriott.com,pastebin.com,m.wikipedia.org,arstechnica.com,home.pl,tabelog.com,biglobe.ne.jp,trustpilot.com,washington.edu,newscientist.com,bp1.blogger.com,theatlantic.com,seattletimes.com,inc.com,venturebeat.com,mixcloud.com,calendar.google.com,video.google.com,answers.yahoo.com,odnoklassniki.ru,scientificamerican.com,usa.gov,ftc.gov,nbcnews.com,www.nhs.uk,namecheap.com,storify.com,wattpad.com,mail.yahoo.com,symantec.com,cmu.edu,history.com,www.canalblog.com,merriam-webster.com,dictionary.com,usgs.gov,www.skyrock.com,archives.gov,imgur.com,etsy.com,ieee.org,amazon.ca,businesswire.com,teamviewer.com,plos.org,allrecipes.com,asahi.com,ustream.tv,springer.com,daum.net,uiuc.edu,fifa.com,excite.co.jp,tmz.com,prezi.com,web.fc2.com,groups.yahoo.com,vkontakte.ru,chinadaily.com.cn'
var urlArray = urlString.split(",");
for (var k = 0; k<urlArray.length; k++) {
	urlArray[k] = "https://" + urlArray[k] + "/";
}
var resMap = new Map();
let urls = urlArray;

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
    input: fs.createReadStream('./httpserver_scalability_results.txt')
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

function mean(values) {
	let i;
	total = 0;
	for (i=0; i < values.length; i++) {
		total+=values[i];
	}
	return total/values.length;
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


    if (!tmp && urls.includes(currUrl)) {
    	resMap.set(currUrl, []);
    }

    let isWordPress;
    isWordPress = (currProbes === "wordpress");

    tmp = resMap.get(currUrl);

    if (tmp) {
    	resMap.get(currUrl).push({'time': Number(currTime), 'length': Number(currLength), 'isWordPress': isWordPress});
    }

    	//console.log("time: " + currTime + " length: " + currLength + " url: " + currUrl);

});

// end
rl.on('close', function(line) {
	resMap.delete("Lis");
	resMap.delete("https://www.example.com/");
	resMap.delete("https://analyticsdemystified.com/wp-content/uploads/2015/06/pageload-firebug.png");

	let mediansArray = [];
	let mediansArraywp = [];

	let sites = 0;
	resMap.forEach(function(value, key) {
		let timeMedian = [];
		let maxTime = 0;

		for (var i = 0; i < 20; i++) {
			if (value[i]) {
				maxTime = Math.max(maxTime, value[i].time);
			}
		}

		for (var i = 0; i < 20; i++) {
			if (value[i]) {
				timeMedian.push(value[i].time);
			} else {
				timeMedian.push(maxTime);
			}
		}

		//console.log("times: " + JSON.stringify(timeMedian) + " lengths: " + JSON.stringify(lengthMedian));
		if (value[0].isWordPress) {
			mediansArraywp.push(median(timeMedian));
		} else {
			mediansArray.push(median(timeMedian));
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


	mediansArray.sort(function(a, b) {
  		return a - b;
	});

	console.log(JSON.stringify(mediansArray));
	console.log(JSON.stringify(mediansArraywp));

	console.log("mediansarray mean: " + mean(mediansArray));
	console.log("medianswparray mean: " + mean(mediansArraywp));

	console.log('wp sites : ' + mediansArraywp.length);
	
    console.log('Total sites : ' + sites);
});