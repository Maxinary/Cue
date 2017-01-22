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
  }
}


function initDB(){
  Cookies.set("Alarms", []);
}

function addAlarm(alr){//alarm type
  console.log(JSON.parse(JSON.stringify(alr)));
  Cookies.set("Alarms", JSON.parse(Cookies.get("Alarms")).concat([alr]));
}

function getAlarms(){
  return Cookies.get("Alarms");
}