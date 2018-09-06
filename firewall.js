let handler = {
	get: function(target, name) {
  	return name in target ? target[name] : "Key does not exist";
  },
	apply: function(target, thisArg, arguments) {
		console.log(arguments[0][0]);
		if (arguments[0][0].includes("<script>")) {
			alert("possible xss intrusion")
    	} else {
    	return target.apply(document, arguments[0]);
    	}
	}
}
var myWrite = document.write;
var proxy = new Proxy(myWrite, handler);