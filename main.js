
var urlSysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json"
function getData(url, obj) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var jtext = JSON.parse(xhr.responseText);
      obj.data = jtext;
      console.log(jtext);
    }
  }
  xhr.send();
}



function Sysselsatte(url) {
  this.load = function (){
    getData(url,this)
  },
  this.data = undefined;
  this.getNames = function(){
    kommuneList = []
    var names = Object.values(this.data);
    var kommuner = Object.keys(names[0])
    for(var k=0; k < kommuner.length;k++) {
      kommuneList.push(kommuner[k])
    }

    return kommuneList
  },
  this.getIDs = function() {
    idList = [];
    var names = Object.values(this.data);
    var kommuner = Object.values(names[0])
    console.log(kommuner);
    for(var k =0; k<kommuner.length;k++){
      var id = kommuner[k]["kommunenummer"];
      idList.push(id);
    }
    console.log(idList);
    return idList
  },
  this.getInfo = function(idList,kommuneList,kommuneNr){
    for(var k = 0; k < idList.length;k++){
      if(idList[k] === kommuneNr) {
        var valgtKommune = kommuneList[k];
        console.log(valgtKommune);
        console.log(idList[k]);
      }
    }
  }
};



let konst;
window.onload = function() {
  konst = new Sysselsatte(urlSysselsatte);
  konst.load();
}


function start(){
  konst.getNames();
  konst.getIDs();
}


function detaljer(kommuner){
  var eleDetaljer = document.getElementsByClassName("detaljer")
  eleDetaljer[0].style.display = "block";
  var kommuneNr = document.getElementById("kommuneNr").value
  var getKommune = document.getElementById("getKommune")
  getKommune.onclick = function() {
    konst.getInfo(idList,kommuneList,kommuneNr);  //kaller på konstruktør for å hente id
  } // hvilke konstruktør skal jeg kalle på?
}
