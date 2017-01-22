class Alarm{
  constructor(name, descr, mon, tues, wed, thurs, fri, sat, sun, how_long){
    this.name = name;
    this.descr = descr;
    this.mon = mon;
    this.tues = tues;
    this.wed = wed;
    this.thurs = thurs;
    this.fri = fri;
    this.sat = sat;
    this.sun = sun;
    
    this.how_long = how_long;
    this.currentTime = 0;
  }
}


function initDB(){
  Cookies.set("Alarms", []);
}

function addAlarm(alr){//alarm type
  console.log(JSON.parse(JSON.stringify(alr)));
  Cookies.set("Alarms", getAlarms().concat([alr]));
}

function removeAlarm(index){
  var k = getAlarms();
  k.splice(index, 1);
  Cookies.set("Alarms", k);
}

function getAlarms(){
  return JSON.parse(Cookies.get("Alarms"));
}

function addTime(index, time){
  var gA = getAlarms();
  if(gA[index].currentTime < gA[index].how_long){
    gA[index].currentTime += time;
    Cookies.set("Alarms", gA);
  }
}