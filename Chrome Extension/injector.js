var videoPlaceholder = document.getElementById('divContentVideo');  //get current video parent
var video = videoPlaceholder.getElementsByTagName('video')[0];

var a = document.createElement('script');

a.src = chrome.extension.getURL('AutoPlay.js');
(document.head || document.documentElement).appendChild(a);

    //when video is ready to play add poster - prevents overlaping with default initial loading icon
if(typeof video !== 'undefined' && video !== 'null'){
	$(video).attr('poster', chrome.extension.getURL('loading.gif'));  //add loading icon for pause between videos
	$('.vjs-control-bar').append("<div id='skip-ol' style='float:right;' class='vjs-control'><img style='height: 100%;' src='"+chrome.extension.getURL('bar_icon.png')+"'/></div>");
}

var link = document.createElement("link");
	link.href = chrome.extension.getURL('materialize.css');
	link.type = "text/css";
	link.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);
