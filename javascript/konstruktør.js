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

// function getNames(obj) {
//   var komuneListe = Object.keys(obj.data["elementer"]);
//   obj.kommuneList = komuneListe;
//   return obj.kommuneList
// }
//
function getNames() {
  return  Object.keys(this.data["elementer"]);
}

function getIDs(){
  var idList = []
  var list = Object.values(this.data["elementer"])
  for(var i = 0;i<list.length;i++){
    var id = list[i]["kommunenummer"];
    idList.push(id)
  }
   return idList;

}

//Test kommentar her

// function nåværendeKommune(input) {
//   for(var k = 0;k<this.getIDs().length;k++){
//     if(this.getIDs()[k] === input){
//       console.log(getNames()[k]);
//       return getNames()[k]
//
//
//
//     }
//   }
// }

function getInfo(input){
    var valgt = getValgtKommune(this,input);
    var valgtInfo = this.data["elementer"][valgt];
    return valgtInfo;
  //
  // this.informasjon = this.data["elementer"][valgtKommune];
  // // for(var k = 0;k<this.idsList.length;k++){
  // //   if(this.idsList[k] === input){
  // //     var valgtKommune = this.kommuneList[k];
  // //     this.informasjon = this.data["elementer"][valgtKommune];
  //     // this.informasjon.navn = valgtKommune;
  //
  // return this.informasjon
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
  // this.kommuneList = undefined;
  // this.idsList = undefined;
  // this.informasjon = undefined;
  this.onload = null;
  this.load = function() {return getData(url,this)};
  this.getNames =  getNames;
  this.getIDs = getIDs;
  this.getInfo =  getInfo;
  }
