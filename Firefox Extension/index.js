var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var reg1 = new RegExp(".*kissanime.to.*id=.*");
var reg2 = new RegExp(".*kisscartoon.me.*id=.*");
var reg3 = new RegExp(".*kissasian.com.*id=.*");

pageMod.PageMod({
    include: [reg1,reg2,reg3],
    contentScriptWhen: "ready",
  	contentScriptFile: [data.url("./injector.js")],
  	onAttach: function(worker) {
    	worker.port.emit("init", data.url("./AutoPlay.js"), data.url("./materialize.css"));
  }
});


