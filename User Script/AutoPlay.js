// ==UserScript==
// @name        KissAnime Auto Play Next Episode
// @namespace   matthewmarillac.com
// @include     *://kissanime.com/*
// @include     *://kisscartoon.me/*
// @include     *://kissanime.to/*
// @include     *://kissasian.com/*
// @updateURL   http://matthewmarillac.com/api/meta.js
// @version     5
// @grant       none
// ==/UserScript==
var Url; 
   //global variables
    
var videoPlaceholder = document.getElementById('divContentVideo');  //get current video parent
var video = videoPlaceholder.getElementsByTagName('video')[0];  //get element video from previous elements child

$(video).attr('poster', 'http://www.matthewmarillac.com/api/loading.gif');

jQuery(video).on('ended',function()
{     //once video ended
    Console.Log("Kiss Anime Auto Play");
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

function nextVideo(url){
 // request video URL
    console.log("Searching for video at: " + url);
    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        success: function (response) 
        {
            var select = jQuery(response).find('#selectQuality option')[0];
            console.log("Next Video Src: " + asp.wrap(jQuery(select).val()));
            video.src = asp.wrap(jQuery(select).val());
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
        var element = document.getElementById('btnNext').parentNode;
        console.log("Next Url: " + element.href);
        history.pushState({}, '', element.href);
        Url = element.href; 
        nextVideo(element.href);
    }
    else
    {//make ajax request to the next page in que to get video href from the last page we ajax requested
        var nextUrl;
         $.ajax({
            type: "GET",
            url: currentUrl,
            cache: false,
            success: function (response)
            {
                var select = jQuery(response).find('img#btnNext').parent();
                nextUrl = jQuery(select).attr("href");
                console.log("Next Url: " + nextUrl);
                history.pushState({}, '', jQuery(select).attr("href"));
                Url = nextUrl;
                nextVideo(nextUrl);
            },
            error: function (xhr, status, error) {
                // error in ajax
            console.log(error);
            }
         });
    }
}