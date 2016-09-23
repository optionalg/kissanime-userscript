var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('AutoPlay.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);
var videoPlaceholder = document.getElementById('divContentVideo');  //get current video parent
var video = videoPlaceholder.getElementsByTagName('video')[0];
if(typeof video !== 'undefined' && video !== 'null'){
    //when video is ready to play add poster - prevents overlaping with default initial loading icon
	$(video).attr('poster', chrome.extension.getURL('icons/loading.gif'));  //add loading icon for pause between videos
	$('.vjs-control-bar').append("<div id='skip-ol' style='float:right;' class='vjs-control'><img style='height: 100%;' src='"+chrome.extension.getURL('icons/48.png')+"'/></div>");
}

var link = document.createElement("link");
	link.href = chrome.extension.getURL('materialize.css');
	link.type = "text/css";
	link.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
