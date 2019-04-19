
var urlUtdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json"

// ------------------------------HjelpeFunksjoner------------------------

function getData3(url,obj) {
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

function getNames3(obj) {
  var komuneListe = Object.keys(obj.data["elementer"]);
  obj.komunelist = komuneListe;
}

function getIDs3(obj){
  var idList = []
  var list = Object.values(obj.data["elementer"])
  for(var i = 0;i<list.length;i++){
    var id = list[i]["kommunenummer"];
    idList.push(id)
  }
obj.idsList = idList;
}

function getInfo3(obj,input){
  for(var i=0;i<obj.idsList.length;i++){
    if(obj.idsList[i]===input){
      var valgtKommune = obj.komunelist[i]
    }
    obj.informasjon = obj.data["elementer"][valgtKommune];

  }
}
// function getInfo3(obj,input){
//   var høyereUt;
//   var utdanningProsent;
//   for(var i=0;i<obj.idsList.length;i++){
//     if(obj.idsList[i]===input){
//       var valgtKommune = obj.komunelist[i]
//     }
//   }
//
//   høyereUt = getHøyereUtdannning(obj.data,valgtKommune);
//   obj.informasjon = høyereUt;
// }



      // var detaljer = getDetails(valgtKommune,obj.data);

// ------------------------------Main------------------------

function Utdanning() {
  this.data = undefined;
  this.komunelist = undefined;
  this.idsList = undefined;
  this.informasjon = undefined;
  this.load = function() {getData3(urlUtdanning,this)}
  this.getNames = function() {getNames3(this)}
  this.getIDs = function() {getIDs3(this)}
  this.getInfo = function() {getInfo3(this,input)}
}

// ------------------------------runner------------------------

function runner() {
  console.log(utdan.data);
  utdan.getNames();
  console.log(utdan.komunelist)
  utdan.getIDs()
  console.log(utdan.idsList);
  input = "0101";
  utdan.getInfo()
  console.log(utdan.informasjon);
}
