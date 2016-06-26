var nani = require('nani').init('mattmarillac-cfvnh', '');

window.getAnime = function(url){

nani.get('anime/'+url)
  .then(data => {
    return data;
  })
  .catch(error => {
    console.log(error);
  });

}

window.searchAnime = function(url){

nani.get('anime/search/'+url)
  .then(data => {
    return data;
  })
  .catch(error => {
    console.log(error);
  });

}