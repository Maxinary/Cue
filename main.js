function arcSeg(x, y, innerRad, outerRad, theta0, theta1, ctx){
  ctx.moveTo(x + Math.cos(theta0)*innerRad, y + Math.sin(theta0)*innerRad);
  ctx.beginPath();
  ctx.arc(x, y, innerRad, theta0, theta1);
  ctx.lineTo(x + Math.cos(theta1)*outerRad, y + Math.sin(theta1)*outerRad);
  ctx.arc(x, y, outerRad, theta1, theta0, true);
  ctx.lineTo(x + Math.cos(theta0)*innerRad, y + Math.sin(theta0)*innerRad);
  ctx.closePath();
  ctx.fill();
}

function map(arr, fn){
  var retArr = new Array(arr.length);
  for(var i=0; i<arr.length; i++){
    retArr[i] = fn(arr[i]);
  }
  return retArr;
}

function resize(){
//  $("#big_circle").css({"top" : 2*($("body").width() - $("#big_circle").width())});
  $("#big_circle").height($("#big_circle").width());
}

var WorldStates = {"MainPage":0, "Add":1};
function setWorldState(state){
  switch(state){
    case WorldStates.MainPage://draw
      $("#add").animate({"top":"-100%"}, 1000, "swing", null);
      break;
    case WorldStates.Add:
      $("#add").animate({"top":"0"}, 1000, "swing", null);
      break;
  }
}

window.onload = function() {
  resize();
  
  var percents = [0.6,0.3,1.0];
  var colors = ["#E91E63", "#2196F3", "#76FF03"];
  {
    var bigCirc = document.getElementById("big_circle");
    bigCirc.width = $("#big_circle").width();
    bigCirc.height = $("#big_circle").height();
    var bigCtx = bigCirc.getContext("2d");
  
    
    var cAngle = 0;
    for(var i in percents){
      bigCtx.fillStyle = colors[i];
      arcSeg(bigCirc.width/2, bigCirc.height/2, bigCirc.width/2, bigCirc.height/3, cAngle + 0.03, cAngle + Math.PI*2/percents.length * percents[i], bigCtx);
      cAngle += Math.PI*2/percents.length * percents[i]
    }
    
    var smallCanvases = document.querySelectorAll("#list-of-tasks > li > canvas");
    var smallContexts = map(smallCanvases, function(a){return a.getContext("2d");});
    console.log(smallContexts);
    for(var i in smallContexts){
      smallCanvases[i].width = 100;
      smallCanvases[i].height = 100;
      smallContexts[i].fillStyle = colors[i];
      arcSeg(smallCanvases[i].width/2, smallCanvases[i].height/2, 
             smallCanvases[i].width/4, smallCanvases[i].width/2, 
             0, 2*Math.PI * percents[i], 
             smallContexts[i]);
    }
  }
  /*  chrome.storage.sync.set(
    {
      "0":{
        "name": "Kanye",  
        "info": "DM kanye he wanted to say hi",
        "first_time": Date(2017, 4, 9),
        "delta_time": Date(0, 0, 7)
      }
    },
    function() {
      console.log("Saved");
    }
  );
  
  chrome.storage.sync.get("0", function(obj){
    console.log('Task 0', JSON.stringify(obj));
  });
  
  chrome.storage.sync.set(
    {
      "1":{
        "name": "Walk Dog",  
        "info": "You have a dog. You need to walk it.",
        "first_time": Date(2016, 8, 2),
        "delta_time": Date(0, 1, 0)
      }
    },
    function() {
      console.log("Saved");
    }
  );
  
  chrome.storage.sync.get("1", function(obj){
    console.log('Task 1', JSON.stringify(obj));
  });
  
    chrome.storage.sync.set(
    {
      "2":{
        "name": "Painting",  
        "info": "The paint was expensive so you should make something.",
        "first_time": Date(1999, 0, 0),
        "delta_time": Date(1, 0, 0)
      }
    },
    function() {
      console.log("Saved");
    }
  );
  
  chrome.storage.sync.get("2", function(obj){
    console.log('Task 2', JSON.stringify(obj));
  });*/
};
