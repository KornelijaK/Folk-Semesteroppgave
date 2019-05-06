
var url = "http://wildboy.uib.no/~tpe056/folk/104857.json"


// ------------------------------HjelpeFunksjoner------------------------

function getData(url,obj) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200 ) {
      var jtext = JSON.parse(xhr.responseText);
      obj.data = jtext;

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
}

function getInfo(obj,input){
  for(var k = 0;k<obj.idsList.length;k++){
    if(obj.idsList[k] === input){
      var valgtKommune = obj.kommuneList[k];
      obj.informasjon = obj.data["elementer"][valgtKommune];
      obj.informasjon.navn = valgtKommune;
    }
  }
}

// function sjekkNedlastet(obj) {
//   if(obj)
//
// }

//checker at load er fullført. listeninger ..når befo
//


// ------------------------------ Main ----------------------


function Befolkning(url) {
  this.data = undefined;
  this.kommuneList = undefined;
  this.idsList = undefined;
  this.informasjon = undefined;
  this.onload = null;
  this.load = function() {getData(url,this)};
  this.getNames = function() {return getNames(this)}
  this.getIDs = function() {getIDs(this)}
  this.getInfo = function() {getInfo(this,input)}
  }




// ---------------------------backup------------------------------


// this.getNames = function(){
//    all = Object.values(this.data);
//    // kankje ikke br adet der, å lage den globalt
//   var komuner = Object.keys(all[1]);
//   return komuner

// this.getIDs = function() {getIDs(this.data,this)
  // var idList = []
  // for(var i =0;i<all.length;i++){
  //   var kom = all[i]
  //   var test = Object.values(kom)
  //   for(var j =0;j<test.length;j++){
  //     var info = test[j];
  //     var close = Object.values(info);
  //     var id = close[0];
  //     idList.push(id);
  //   }
  // }
  // idList.shift()
  // idList.shift()
  // return idList;


// this.getNames = function(){
//    all = Object.values(this.data);
//    // kankje ikke br adet der, å lage den globalt
//   var komuner = Object.keys(all[1]);
//   return komuner
