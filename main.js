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

function loadCookies() {
  var cCookies = getAlarms();
  for(var i in cCookies){
    $("ul").append("<li>"+
    '<canvas></canvas>\n<div class="percent"></div>'+
    "<div><div>"+cCookies[i].name+"</div>"+
    "<div>"+cCookies[i].descr+"</div></div>"+
    "</li>");
    percents.push(parseInt(cCookies[i].currentTime) / parseInt(cCookies[i].how_long));
  }
  
  resetDraw();
}

var WorldStates = {"MainPage":0, "Add":1};
function setWorldState(state){
  switch(state){
    case WorldStates.MainPage://draw
      $("#add").animate({"top":"-100%"}, 1000, "swing", null);
      $("#mainPage").css({"overflow":"auto"});
      break;
    case WorldStates.Add:
      $("#add").animate({"top":"0"}, 1000, "swing", null);
      $("#mainPage").css({"overflow":"hidden"});
      break;
  }
}

var draw;
  
var percents = [0.6,0.3,1.0];
var colors = ["orange", "#2196F3", "#76FF03"];

function setCookie() {
  var mon_checked = $("#mon").is(':checked');
  var tue_checked = $("#tue").is(':checked');
  var wen_checked = $("#wen").is(':checked');
  var thu_checked = $("#thu").is(':checked');
  var fri_checked = $("#fri").is(':checked');
  var sat_checked = $("#sat").is(':checked');
  var sun_checked = $("#sun").is(':checked');
  var name = $("#name").val();
  var descr = $("#description").val();
  var weeks_till = $("#weeks_till").val();
  var length = $("#how_long").val();

  
  var a = new Alarm(name, descr, mon_checked, tue_checked, wen_checked, thu_checked, fri_checked, sat_checked, sun_checked, weeks_till, length);

  addAlarm(a);
  setWorldState(WorldStates.MainPage);
}

var bigCirc;

function resetDraw(){
  draw = (function(){  
    bigCirc.width = $("#big_circle").width();
    bigCirc.height = $("#big_circle").height();
    var bigCtx = bigCirc.getContext("2d");
  
    var smallCanvases = document.querySelectorAll("#list-of-tasks > li > canvas");
    var smallPercents = document.querySelectorAll(".percent");
    var smallContexts = map(smallCanvases, function(a){return a.getContext("2d");});
  
    function setSelected(index){
      return function(){
        currentTiming = index;
      };
    }
  
    function draw(index, theta){
      bigCtx.clearRect(0, 0, bigCirc.width, bigCirc.height);
      var cAngle = 0;
      for(var i in percents){
        bigCtx.fillStyle = colors[i%colors.length];
        arcSeg(bigCirc.width/2, bigCirc.height/2, bigCirc.width/2, bigCirc.height/3, cAngle + 0.03, cAngle + 0.03 + Math.PI*2/percents.length * percents[i], bigCtx);
        cAngle += Math.PI*2/percents.length * percents[i];
      }
      
      document.getElementById("big_circle").onclick = setSelected(-1);
      
      for(var i in smallContexts){
        smallCanvases[i].width = 100;
        smallCanvases[i].height = 100;
        smallCanvases[i].parentElement.onclick = setSelected(i);
        
        smallContexts[i].fillStyle = colors[i];
        smallPercents[i].innerHTML = Math.floor(100*percents[i]);
        
        var deltaTheta = 0;
        if(i == index){
          deltaTheta = theta;
        }
        arcSeg(smallCanvases[i].width/2, smallCanvases[i].height/2, 
               smallCanvases[i].width/4, smallCanvases[i].width/2, 
               deltaTheta, deltaTheta + 2*Math.PI * percents[i], 
               smallContexts[i]);
      }
    }
    return draw;
  })();
}

var currentTiming = -1;
window.onload = function() {
  resize();
  
  if(Cookies.get("Alarms") === undefined){
    initDB();
  }
  
  if(getAlarms().length == 0){
    setWorldState(WorldStates.Add);
  }
    
  bigCirc = document.getElementById("big_circle");
  resetDraw();
  
//  draw(0);

  var deltaTime = 30;
  var theta = 0;
  function animate(){
    if(currentTiming >= 0 && currentTiming < $("#list-of-tasks").children().length){//do animations
      theta += Math.PI*2 * 0.001 * deltaTime;
      draw(currentTiming, theta);
    }else{
      draw();
    }
  }
  
  setInterval(animate, deltaTime);

};
