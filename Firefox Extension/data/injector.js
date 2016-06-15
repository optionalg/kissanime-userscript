self.port.on("init", function( scriptURL, cssUrl ) {
  var script = document.createElement( "script" );
  script.type = "text/javascript";
  script.src = scriptURL;
  window.document.body.appendChild( script );

var link = document.createElement("link");
	link.href = cssUrl;
	link.type = "text/css";
	link.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
});

