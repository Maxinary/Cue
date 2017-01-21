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

window.onload = function() {
  chrome.storage.sync.set({"meme":true}, null);

  chrome.storage.sync.get(null, function(object){console.log(object);});
};
