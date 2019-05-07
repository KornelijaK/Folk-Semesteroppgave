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
      if(!(obj.onload === null)){
        obj.onload()
      }
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
//
// function getNames() {
//   return  Object.keys(this.data["elementer"]);
// }

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


function getInfo(input){
  for(var k = 0;k<this.idsList.length;k++){
    if(this.idsList[k] === input){
      var valgtKommune = this.kommuneList[k];
      this.informasjon = this.data["elementer"][valgtKommune];
      this.informasjon.navn = valgtKommune;
      break




    }
  }
  return this.informasjon
}

// obj.onload(){
//
// }

// function dataKlar(obj){
//
//   var loadMelding = document.getElementById('loadingID');
//   obj.onload = true
//   console.log("NONO");
// }
//
//
// function lastData() {
//
//
// }
//
// function.onload

//dersom onlaid ikke er null - kjør.



// ----------------------------------------------




function Konstruktør(url) {
  this.data = undefined;
  this.kommuneList = undefined;
  this.idsList = undefined;
  this.informasjon = undefined;
  this.onload = null;
  this.load = function() {return getData(url,this)};
  this.getNames = function() {return getNames(this)}
  this.getIDs = function() {return getIDs(this)}
  this.getInfo =  getInfo;
  }
