var urlBef = "http://wildboy.uib.no/~tpe056/folk/104857.json"
var urlSyss = "http://wildboy.uib.no/~tpe056/folk/100145.json"
var urlUtdann = "http://wildboy.uib.no/~tpe056/folk/85432.json"

// ------------------------ HjelpeFunksjoner-----------------

function getData(url,obj) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200 ) {
      var jtext = JSON.parse(xhr.responseText);
      obj.data = jtext;
      return obj.data

    }
  }
  xhr.send(null);
}

function getNames(obj) {
  var komuneListe = Object.keys(obj.data["elementer"]);
  obj.kommuneList = komuneListe;
  return obj.kommuneList
}

function getIDs(obj){
  var idList = []
  var list = Object.values(obj.data["elementer"])
  for(var i = 0;i<list.length;i++){
    var id = list[i]["kommunenummer"];
    idList.push(id)
  }
  obj.idsList = idList;
  return obj.idsList
}


function getInfo(obj,input){
  for(var k = 0;k<obj.idsList.length;k++){
    if(obj.idsList[k] === input){
      var valgtKommune = obj.kommuneList[k];
      obj.informasjon = obj.data["elementer"][valgtKommune];
      obj.informasjon.navn = valgtKommune;


    }
  }
  return obj.informasjon
}


function Konstruktør(url) {
  this.data = undefined;
  this.kommuneList = undefined;
  this.idsList = undefined;
  this.informasjon = undefined;
  this.onload = null;
  this.load = function() {return getData(url,this)};
  this.getNames = function() {return getNames(this)}
  this.getIDs = function() {return getIDs(this)}
  this.getInfo = function() {return getInfo(this,input)}
  }
