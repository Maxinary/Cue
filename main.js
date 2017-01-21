window.onload = function() {
  chrome.storage.sync.set({"test":true, "meme?":"Yes!"}, null);

  chrome.storage.sync.get(null, function(object){console.log(object);});
};
