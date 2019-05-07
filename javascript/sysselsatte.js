
var urlSysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json"

function getData(url, obj) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var jtext = JSON.parse(xhr.responseText);
      obj.data = jtext;
    }
  }
  xhr.send(null);
}



// function Sysselsatte(url) {
//   this.load = function (){
//     getData(url,this)
//   },
//   this.data = undefined;
//   this.getNames = function(){
//     kommuneList = []
//     var names = Object.values(this.data);
//     var kommuner = Object.keys(names[0])
//     for(var k=0; k < kommuner.length;k++) {
//       kommuneList.push(kommuner[k])
//     }
//
//     return kommuneList
//   },
//   this.getIDs = function() {
//     idList = [];
//     var names = Object.values(this.data);
//     var kommuner = Object.values(names[0])
//     console.log(kommuner);
//     for(var k =0; k<kommuner.length;k++){
//       var id = kommuner[k]["kommunenummer"];
//       idList.push(id);
//     }
//     console.log(idList);
//     return idList
//   },
//   this.getInfo = function(idList,kommuneList,kommuneNr){
//     for(var k = 0; k < idList.length;k++){
//       if(idList[k] === kommuneNr) {
//         var valgtKommune = kommuneList[k];
//         console.log(valgtKommune);
//         console.log(idList[k]);
//         var valgtKommuneData = this.data["elementer"][valgtKommune];
//         console.log(valgtKommuneData); //KommuneData for kommune input fra brukeren
//       }
//     }
//   }
// };

function getNames2(data,obj) {
  var kommuneList = []
  var names = Object.values(data);
  var kommuner = Object.keys(names[0])
  for(var k=0; k < kommuner.length;k++) {
    kommuneList.push(kommuner[k])
  }
  obj.kommuneList = kommuneList;
  console.log(obj.kommuneList);
}

function Sysselsatte(urlSysselsatte){
  this.data = undefined;
  this.kommuneList = undefined;
  this.idList = undefined;
  this.detaljer = undefined;
  this.load = function() {
    getData(urlSysselsatte,this);
  },
  this.getNames = function(){
    getNames2(this.data,this);
  },
  this.getIDs = function(){
    getIDs(this.data,this)
  },
  this.getInfo = function(){
    getInfo(this.kommuneList,this.idList,input,this);
  }
}


// let syss;
// window.onload = function() {
//   console.log("lager syss");
//   syss = new Sysselsatte(urlSysselsatte);
//   syss.load();
// }
