var uber = '<div data-bttnio-id="btn-0a669f8405580be1" data-bttnio-context=\'{ "user_location": { "latitude": 40.6827, "longitude": -73.9754 }, "subject_location": { "latitude": 40.7382869, "longitude": -73.9823721 } }\'></div>';
var dining = '<div data-bttnio-id="btn-4aa13ae2ee635b99" data-bttnio-context=\'{ "user_location": { "latitude": 25.782324, "longitude": -80.2310801 } }\'></div>';

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

function sum(arr){
  var s = 0;
  for(var i in arr){
    s += arr[i];
  }
  return s;
}

function resize(){
//  $("#big_circle").css({"top" : 2*($("body").width() - $("#big_circle").width())});
  $("#big_circle").height($("#big_circle").width());
}

var curModel;
function loadCookies() {
  var cCookies = getAlarms();
  curModel = cCookies;
  percents = [];
  $("ul").html("");
  for(var i in cCookies){
    if(cCookies[i].days[(new Date()).getDay()]){
      var specialString = "";
      
      if(cCookies[i].descr.toLowerCase().indexOf("driv") !== -1 || cCookies[i].name.toLowerCase().indexOf("driv") !== -1){
        specialString = uber;
      }
      
      if(cCookies[i].descr.toLowerCase().indexOf("lunch") != -1 || cCookies[i].descr.toLowerCase().indexOf("dinner") != -1 || cCookies[i].descr.toLowerCase().indexOf("eat") != -1 ||
         cCookies[i].name.toLowerCase().indexOf("lunch")  != -1 || cCookies[i].name.toLowerCase().indexOf("dinner")  != -1 || cCookies[i].name.toLowerCase().indexOf("eat")  != -1){
          
          specialString = dining; 
      }
      
      $("ul").append("<li>"+
      '<canvas></canvas>\n<div class="percent"></div>'+
      "<div><div>"+cCookies[i].name+"</div>"+
      "<div>"+cCookies[i].descr+"</div></div>"+
      specialString+
      "</li>");
      percents.push(parseFloat(cCookies[i].currentTime) / parseFloat(cCookies[i].how_long));
    }
  }
  
  resetDraw();
  
    (function(u,s,e,b,t,n){
    u['__bttnio']=b;u[b]=u[b]||function(){(u[b].q=u[b].q||[]).push(arguments)};t=s.createElement(e);n=s.getElementsByTagName(e)[0];t.async=1;t.src='https://web.btncdn.com/v1/button.js';n.parentNode.insertBefore(t,n)
  })(window, document, 'script', 'bttnio');

  window.ButtonWebConfig = {
    applicationId: 'app-1db3f0bedc962e4e'
  };
  (function(u,s,e,b,t,n){
    u['__bttnio']=b;u[b]=u[b]||function(){(u[b].q=u[b].q||[]).push(arguments)};t=s.createElement(e);n=s.getElementsByTagName(e)[0];t.async=1;t.src='https://web.btncdn.com/v1/button.js';n.parentNode.insertBefore(t,n)
  })(window, document, 'script', 'bttnio');
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
  
var percents = [];
var colors = ["#FF1744", "#2196F3", "#FF9100", "#76FF03", "#FFFF00", "#651FFF"];

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
  var length = parseFloat($("#how_long").val())*3600000;

  
  var a = new Alarm(name, descr, mon_checked, tue_checked, wen_checked, thu_checked, fri_checked, sat_checked, sun_checked, length);

  addAlarm(a);
  setWorldState(WorldStates.MainPage);
  loadCookies();
  
  $("#mon").attr('checked',false);
  $("#tue").attr('checked',false);
  $("#wen").attr('checked',false);
  $("#thu").attr('checked',false);
  $("#fri").attr('checked',false);
  $("#sat").attr('checked',false);
  $("#sun").attr('checked',false);
  $("#name").val("");
  $("#description").val("");
  $("#how_long").val("");
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
        if(currentTiming != index){
          currentTiming = index;
        }else{
          currentTiming = -1;
        }
      };
    }
  
    function draw(index, theta){
      bigCtx.clearRect(0, 0, bigCirc.width, bigCirc.height);
      var cAngle = 0;
      for(var i in percents){
        bigCtx.fillStyle = colors[i%colors.length];
        arcSeg(bigCirc.width/2, bigCirc.height/2, bigCirc.width/2 - 20, bigCirc.height/3, cAngle + 0.01, cAngle + (Math.PI*2/percents.length - 0.01) * percents[i], bigCtx);
        cAngle += Math.PI*2/percents.length * percents[i];
      }
      $("#numNum").html(Math.floor(100*sum(percents)/percents.length)+"%");
      
      document.getElementById("big_circle").onclick = setSelected(-1);
      
      for(var i in smallContexts){
        smallCanvases[i].width = 100;
        smallCanvases[i].height = 100;
        smallCanvases[i].parentElement.onclick = setSelected(i);
        
        smallContexts[i].fillStyle = colors[i];
        smallPercents[i].width = 50;
        if(Math.floor(100*percents[i]) < 100){
          smallPercents[i].innerHTML = Math.floor(100*percents[i]);
        }else{
          smallPercents[i].innerHTML = "&#x2713;";
        }
        
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
  loadCookies();
  
  var deltaTime = 30;
  var theta = 0;
  function animate(){
    if(currentTiming >= 0 && currentTiming < $("#list-of-tasks").children().length){//do animations
      theta += Math.PI*2 * 0.001 * deltaTime;
      draw(currentTiming, theta);
      addTime(currentTiming, deltaTime);
      if(curModel[currentTiming].currentTime < curModel[currentTiming].how_long){
        curModel[currentTiming].currentTime += deltaTime;
        percents[currentTiming] = parseFloat(curModel[currentTiming].currentTime) / parseFloat(curModel[currentTiming].how_long);
      }
    }else{
      draw();
    }
  }
  
  setInterval(animate, deltaTime);
  
  window.ButtonWebConfig = {
    applicationId: 'app-1db3f0bedc962e4e'
  };
  
  
  (function(u,s,e,b,t,n){
    u['__bttnio']=b;u[b]=u[b]||function(){(u[b].q=u[b].q||[]).push(arguments)};t=s.createElement(e);n=s.getElementsByTagName(e)[0];t.async=1;t.src='https://web.btncdn.com/v1/button.js';n.parentNode.insertBefore(t,n)
  })(window, document, 'script', 'bttnio');

  window.ButtonWebConfig = {
    applicationId: 'app-1db3f0bedc962e4e'
  };
  (function(u,s,e,b,t,n){
    u['__bttnio']=b;u[b]=u[b]||function(){(u[b].q=u[b].q||[]).push(arguments)};t=s.createElement(e);n=s.getElementsByTagName(e)[0];t.async=1;t.src='https://web.btncdn.com/v1/button.js';n.parentNode.insertBefore(t,n)
  })(window, document, 'script', 'bttnio');
};
