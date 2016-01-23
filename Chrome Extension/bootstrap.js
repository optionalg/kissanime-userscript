chrome.tabs.onUpdated.addListener(function(id, info, tab){
     if (tab.url && tab.url.indexOf('https://kissanime.to/') === 0) {
        chrome.pageAction.show(tab.id);
        chrome.tabs.executeScript(null, {"file": "AutoPlay.js"});
     }
});




