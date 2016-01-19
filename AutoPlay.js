// ==UserScript==
// @name        KissAnime Auto Play Next Episode
// @namespace   matthewmarillac.com
// @include     *://kissanime.com/*
// @include     *://kisscartoon.me/*
// @include     *://kissanime.to/*
// @include     *://kissasian.com/*
// @updateURL   http://matthewmarillac.com/api/meta.js
// @version     2
// @grant       none
// ==/UserScript==
var videoPlaceholder = document.getElementById('divContentVideo');
var video = videoPlaceholder.getElementsByTagName('video')[0];
 
video.addEventListener('ended', myHandler, false);
function myHandler(e) {
  var element = document.getElementById('btnNext').parentNode;
  window.location = element.href;
}