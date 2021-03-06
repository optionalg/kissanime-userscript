//Matthew de Marillac
//Kissanime AutoPlayer
var Url; //global variables
var skipFrom;
var itr = false;
var active = true;

var params = window.location.pathname.split('/').slice(1);
var animeName = params[1];
var videoPlaceholder = document.getElementById('divContentVideo');  //get current video parent
var video = videoPlaceholder.getElementsByTagName('video')[0];

createOverlay();


$("#skipFromSubmit").on('click', function (event) {       //when video is ready to play add poster - prevents overlaping with default initial loading icon
	setStorage();
});

$("#removeSkip").on('click', function (event) {       //when video is ready to play add poster - prevents overlaping with default initial loading icon
	removeStorage();
});

$("#skip-ol").on('click', function (event) {       //when video is ready to play add poster - prevents overlaping with default initial loading icon
	var overlay= document.getElementById('overlay');
	overlay.style.visibility= 'visible';
	event.stopPropagation();
});

$('html').on('click', function(event){
	if(event.target.id === "overlay"||
	   event.target.parentElement.id === "overlay"|| $(event.target).is(':input') ||
	   $(event.target).is('.lever') || event.target.id === "skip-ol"){}else
	   {
		   hideMessage();
	   }
});

$('.active').on('click', function(){
if (active === true)
	active = false;
else
	active = true;
});

$(video).on("playing", function(){
	itr = false;
	resume();
});


$(video).on('ended',function()
{     //once video ended
	if(itr === false && active === true){
		getNextInQue();
	}else{
		itr = false;
	}
});

function getNextInQue(){
	var element = document.getElementById('btnNext').parentNode;
	if(Url === "" || Url === null)
	{   //if this is the first url in que get the first video link and src
		getNextUrl("init");
	}
	else
	{   //otherwise we move foward with previous ajax requested page
		getNextUrl(Url);
	}
}

//When the user clicks on the next button, goes to the next video from the current selected index
$(document.getElementById('btnNext').parentNode).on('click', function(event) {
	event.preventDefault();
	PrevOrNext("next");
});

//When the user clicks on the previous button, goes to the previous video from the current selected index
$(document.getElementById('btnPrevious').parentNode).on('click', function(event) {
	event.preventDefault();
	PrevOrNext("prev");
});

function nextVideo(url){
	// request video URL
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		success: function (response)
		{
			var select = $(response).find('#selectQuality option')[0];      //get next video in encoded form from quality dropdown value
		if (OnKissCartoon()) {
			video.src = $kissenc.decrypt($(select).val());     //decodes using kisscartoon's decoder
		}else{
			video.src = window.atob($(select).val());       //base 64 decode extracted url and play src
		}
	video.play();
		document.getElementById("selectEpisode").selectedIndex++;       //increment current episode selection in episode select dropdown
		},
		error: function (xhr, status, error) {
			// error in ajax
			console.log(error);
		}
		});
}

function getNextUrl(currentUrl)
{   //get the next videos url from an ajax request by reading href of next link on that page
	if(currentUrl == "init")
	{//this is the first video in the que - get the next page from current page link
			var element = document.getElementById('btnNext').parentNode;    //get url of next video from button href
			if(element===null)
			{
			console.log("No more videos in series");
			return;
			}

			history.pushState({}, '', element.href);    //add page to history so users can keep track of what anime they have seen
			Url = element.href;     //asign video to current video global variable
			nextVideo(element.href);
	}
	else
	{   //make ajax request to the next page in que to get video href from the last page we ajax requested
		var nextUrl;
		 $.ajax({
			type: "GET",
			url: currentUrl,
			cache: false,
			success: function (response)
			{
				var select = $(response).find('img#btnNext').parent();
				nextUrl = $(select).attr("href");       //get url of next video from button href from within ajax request
				history.pushState({}, '', $(select).attr("href"));  //add page to history so users can keep track of what anime they have seen
				Url = nextUrl;      //asign video to current video global variable
				nextVideo(nextUrl);
			},
			error: function (xhr, status, error) {
				// error in ajax
				console.log(error);
			}
		 });
	}
}


function OnKissCartoon()
{	//check if on kisscarton
	if(window.location.href.indexOf("kisscartoon") > -1) {
		return true;
	}else{
		return false;
	}
}


function PrevOrNext(pon)
{ 	//Goes to the next or previous page based off the currently selected episode
	var url;
	var element;
	var to;
	if (pon === "next"){
		url = window.location.href;
		element = document.getElementById("selectEpisode");
		element.selectedIndex++;
		to = url.lastIndexOf('/');
		to = to == -1 ? url.length : to + 1;
		Url = url.substring(0, to)  + element.options[element.selectedIndex].value;
		window.location.href = Url;
	}
	if (pon === "prev") {
		url = window.location.href;
		element = document.getElementById("selectEpisode");
		element.selectedIndex--;
		to = url.lastIndexOf('/');
		to = to == -1 ? url.length : to + 1;
		Url = url.substring(0, to)  + element.options[element.selectedIndex].value;
		window.location.href = Url;
	}
	if (pon != "prev" && pon != "next") {
		console.log("Varible taken in PrevOrNext is invalid");
	}
}

//->Recursive loop
function resume()
{
	$(video).on('ended', function (event) {
		return;
	});
	$(video).on('paused', function (event) {
		return;
	});
	//if skipping hasn't been set exit this function
	if(skipFrom === "undefined" || skipFrom === "" || skipFrom === null || active === false)
	{
	return;
	}
	//if current video time matches stored skipping time trigger video ended event handler
	if(getTime(video.currentTime) === skipFrom && itr === false){
		itr = true;
		getNextInQue();
	}else{
	//recurse loop every second video playes
	setTimeout(resume, 1000);
	}

}
//->End loop

//->DB
function getStorage(){
	try{	//get the stored skip time from local storage if set
		if(typeof(Storage) !== "undefined") {
			skipFrom = localStorage.getItem(animeName+"_skipFrom");
			$("#skipFrom").val(skipFrom);
		}
	}catch(e)
	{
		Console.log("Local storage not found");
	}
}


function setStorage()
{	//user has clicked on button save credit skip time in local storage
	try{
		if(typeof(Storage) !== "undefined") {
			skipFrom = $("#skipFrom").val();
			//check for valid input
			if(skipFrom.match('^[0-5][0-9]:[0-5][0-9]$') || skipFrom.match('^[0-9]:[0-5][0-9]:[0-5][0-9]$')){
			//store entered time in local storage
			localStorage.setItem(animeName+"_skipFrom", skipFrom);
			}
		}
	}catch(e)
	{
		Console.log(e);
	}
}

function removeStorage()
{
	try{
		localStorage.removeItem(animeName+"_skipFrom");
		skipFrom = null;
		getStorage();
	}catch(e)
	{
		Console.log("Local storage not found");
	}
}
//->END DB


function getTime(totalSec)
{	//convert video play time(float) to timestamp
	var minutes = parseInt( totalSec / 60 ) % 60;
	var seconds = (totalSec % 60).toFixed(0);
	return((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds));
}

function createOverlay()
{
	$(videoPlaceholder).prepend("<div class='overlay' id='overlay'></div>");

	$("body").append("<style>#overlay {position: absolute; right:0; bottom: 35px; color: #FFF; text-align: center; font-size: 20px; background-color: rgba(7, 20, 30, 0.7); width: 640px; padding: 10px 0; z-index: 2147483647; border: 2px solid rgba(128, 128, 128, 0.35);}</style>");
	editMessage("<div class='card-content white-text'><p>Thanks for using <a class='teal-text' href='matthewmarillac.com/api/anime.php' target='_BLANK'>Kissanime Autoplayer</a>. Be sure to leave a rating if you enjoy using it!</p>"+
	'<!-- Switch --> <div class="switch"> <label> Off <input type="checkbox"> <span class="lever"></span> On </label> </div>' +
	"<p>Select a time to skip credits from:</p> <input class='white-text' id='skipFrom' placeholder='30:20'/>" +
						"<button class='waves-effect waves-light btn' id='skipFromSubmit'>Submit</button>  <button class='waves-effect waves-light btn' id='removeSkip'>Remove</button></div>");
	hideMessage();
	getStorage();
}

function editMessage(message)
{
	var overlay= document.getElementById('overlay');
	overlay.style.visibility= 'visible';
	overlay.innerHTML = message;
}

function hideMessage()
{
	var overlay= document.getElementById('overlay');
	overlay.style.visibility='hidden';
}

