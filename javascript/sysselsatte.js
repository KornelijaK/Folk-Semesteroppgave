
var urlSysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json"
function getData2(url, obj) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var jtext = JSON.parse(xhr.responseText);
      obj.data = jtext;
      console.log(obj.data);
    }
  }
  xhr.send();
}

function getNames2(obj) {
  var kommuner = Object.keys(obj.data["elementer"]);
  obj.kommuneList = kommuner;
  // console.log(obj.kommuneList);
};

function getIDs2(obj) {
  var ids = [];
  var list = Object.values(obj.data["elementer"])
  for(var i = 0; i < list.length;i++){
    var id = list[i]["kommunenummer"];
    ids.push(id)
  }
  obj.idList = ids;
  // console.log(obj.idList);
}


function getInfo2(obj,input){
  var sisteSyssel;
  for(var i=0; i<obj.idList.length;i++){
    if(obj.idList[i] == input){
      valgtKommune = obj.kommuneList[i]
      idNr = obj.idList[i]
      detaljer(valgtKommune)
    }
  }
  sisteSyssel = getSisteSyssel(obj,valgtKommune)
  obj.informasjon = sisteSyssel;
}

function getSisteSyssel(obj,valgtKommune) {
  var sysselMenn = Object.values(obj.data["elementer"][valgtKommune]["Menn"])
  var sysselKvinner = Object.values(obj.data["elementer"][valgtKommune]["Kvinner"])
  var sysselBeggeKjønn = Object.values(obj.data["elementer"][valgtKommune]["Begge kjønn"])
  var sisteSysselMenn = sysselMenn.pop();
  var sisteSysselKvinner = sysselKvinner.pop();
  sisteSysselBeggeKjønn = sysselBeggeKjønn.pop();

  return sisteSysselBeggeKjønn
}

function Sysselsatte(urlSysselsatte) {
  this.data = undefined;
  this.kommuneList = undefined;
  this.idList = undefined;
  this.informasjon = undefined;
  this.load = function(){getData2(urlSysselsatte,this)};
  this.getNames = function(){getNames2(this)}
  this.getIDs = function(){getIDs2(this)}
  this.getInfo = function(){getInfo2(this,input)}
}
