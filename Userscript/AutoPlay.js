// ==UserScript==
// @name        KissAnime Auto Play Next Episode
// @description Automatically plays the next video in the list without ever leaving fullscreen mode! Works on Kissanime/kisscartoon/kissasian
// @icon        https://github.com/mattd360/kissanime-userscript/blob/master/Chrome%20Extension/icons/128.png?raw=true
// @locale      en
// @namespace   matthewmarillac.com
// @author      Matthew James de Marillac
// @include     *://kissanime.com/*
// @include     *://kisscartoon.me/*
// @include     *://kissanime.to/*
// @include     *://kissasian.com/*
// @updateURL   https://github.com/mattmarillac/kissanime-userscript/raw/master/Userscript/meta.js
// @version     1.3
// @grant       none
// ==/UserScript==
//Copyright 2016 Matthew de Marillac
//Kissanime AutoPlayer
var Url; //global variables
var skipFrom;

var videoPlaceholder = document.getElementById('divContentVideo');  //get current video parent
var video = videoPlaceholder.getElementsByTagName('video')[0];  //get element video from previous elements child

var params = window.location.pathname.split('/').slice(1);
var animeName = params[1];

$(document).ready(function(){
    createButton();
    getStorage();
});

$("#skipFromSubmit").on('click', function (event) {       //when video is ready to play add poster - prevents overlaping with default initial loading icon
    setStorage();
});

$("#removeSkip").on('click', function (event) {       //when video is ready to play add poster - prevents overlaping with default initial loading icon
    removeStorage();
});


$(video).on("playing", function(){
    resume();
});

$(video).on('canplay', function (event) {       //when video is ready to play add poster - prevents overlaping with default initial loading icon
    $(video).attr('poster', 'http://www.matthewmarillac.com/api/loading.gif'); //add loading icon for pause between videos
});

$(video).on('ended',function()
{     //once video ended
    console.log("Kiss Anime Auto Play");
    var element = document.getElementById('btnNext').parentNode;
    if(Url == "" || Url == null)
    {   //if this is the first url in que get the first video link and src
        getNextUrl("init");
    }
    else
    {   //otherwise we move foward with previous ajax requested page
        getNextUrl(Url); 
    }
});

$("body").keydown(function(event) {     //when user clicks left or right key navigate back and foward
  var element;
  if (event.which == 39) {      //user presses right arrow button
      element = document.getElementById('btnNext').parentNode;
      window.location = element;        //reload page to next page
  }
  if (event.which == 37) {  //user presses left arrow button
      element = document.getElementById('btnPrevious').parentNode; 
      window.location = element;    //reload page to previous page
  }
});

function nextVideo(url){
    // request video URL
    console.log("Searching for video at: " + url);
    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        success: function (response) 
        {
            var select = $(response).find('#selectQuality option')[0];      //get next video in encoded form from quality dropdown value
            console.log("Next Video Src: " + window.atob($(select).val()));
            video.src = window.atob($(select).val());       //base 64 decode extracted url and play src
            document.getElementById("selectEpisode").selectedIndex++;       //increment current episode selection in episode select dropdown
        },
        error: function (xhr, status, error) {
            // error in ajax
            console.log(error);
        }
}); // ready
}

function getNextUrl(currentUrl)
{   //get the next videos url from an ajax request by reading href of next link on that page
    if(currentUrl == "init")
    {//this is the first video in the que - get the next page from current page link
            var element = document.getElementById('btnNext').parentNode;    //get url of next video from button href
            console.log("Next Url: " + element.href);
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
                console.log("Next Url: " + nextUrl);
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

//->Recursive loop
function resume()
{
	//if skipping hasn't been set exit this function
    if(skipFrom == "undefined" || skipFrom == "" || skipfrom == null)
    {
    return;
    }
    //if current video time matches stored skipping time trigger video ended event handler
    if(getTime(video.currentTime) == skipFrom){
        $(video).trigger("ended");
        return;
    }
    //kill recursive loop
    $(video).on("pause", function(){
    return;
	});
    //recurse loop every second video playes
    setTimeout(continueExecution, 1000);
}

function continueExecution()
{
    //reiterate loop
    resume();
}
//->End loop

//get the stored skip time from local storage if set
function getStorage(){    
    if(typeof(Storage) !== "undefined") {
		skipFrom = localStorage.getItem(animeName+"_skipFrom");
		$("#skipFrom").val(skipFrom);
	}
}

//user has clicked on button save credit skip time in local storage
function setStorage()
{
    skipFrom = $("#skipFrom").val(); 
    localStorage.setItem(animeName+"_skipFrom", skipFrom);
}

function removeStorage()
{
localStorage.removeItem(animeName+"_skipFrom");
skipFrom = null;
getStorage();
}

//create a form for user to submit skip time
function createButton()
{
    if(typeof(Storage) !== "undefined") {
        $(".clsTempMSg").append("<div><hr/>Skip Credits From: <input id='skipFrom' placeholder='30:20'/>" +
                        "<button id='skipFromSubmit'>Submit</button><button id='removeSkip'>Remove</button><hr/></div>");
    }
}

//convert video play time(float) to timestamp
function getTime(totalSec)
{
    var minutes = parseInt( totalSec / 60 ) % 60;
    var seconds = (totalSec % 60).toFixed(0);
    return((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds));
}


