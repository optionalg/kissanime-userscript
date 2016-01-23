chrome.tabs.onUpdated.addListener(function(id, info, tab){
     if (tab.url && tab.url.indexOf('https://kissanime.to/') === 0 || tab.url && tab.url.indexOf('https://kisscartoon.me/') === 0 || tab.url && tab.url.indexOf('https://kissasian.com/') === 0 ) {
        chrome.pageAction.show(tab.id);
        chrome.tabs.executeScript(null, {"file": "AutoPlay.js"});
     }
});



