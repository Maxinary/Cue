window.onload = function() {
  chrome.storage.sync.set({"meme":true}, null);

  chrome.storage.sync.get(null, function(object){console.log(object);});
};
