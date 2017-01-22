class Alarm{
  constructor(name, descr, mon, tues, wed, thurs, fri, sat, sun, weeksUntilRep, how_long){
    this.name = name;
    this.descr = descr;
    this.mon = mon;
    this.tues = tues;
    this.wed = wed;
    this.thurs = thurs;
    this.fri = fri;
    this.sat = sat;
    this.sun = sun;
    
    this.weeksUntilRep = weeksUntilRep;
    this.how_long = how_long;
    this.currentTime = 1;
  }
}


function initDB(){
  Cookies.set("Alarms", []);
}

function addAlarm(alr){//alarm type
  console.log(JSON.parse(JSON.stringify(alr)));
  Cookies.set("Alarms", getAlarms().concat([alr]));
}

function getAlarms(){
  return JSON.parse(Cookies.get("Alarms"));
}

function addTime(index, time){
  var gA = getAlarms();
  gA[index].currentTime += time;
  Cookies.set("Alarms", gA)
}