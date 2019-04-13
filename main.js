
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


idInput = "5047"
function Sysselsatte(url) {
  this.load = function (){
    getData(url,this)
  },
  this.data = undefined;
  this.getNames = function(){
    var names = Object.values(this.data);
    var kommuner = Object.keys(names[0])
    console.log(kommuner);
    //detaljer(kommuner);
  },
  this.getIDs = function() {
    idList = [];
    var names = Object.values(this.data);
    for(var x in names[0]) {
      for(var y in names[0][x]){
        var kommunenummer = names[0][x]["kommunenummer"];
        idList.push(kommunenummer)
      }
    }
    return idList
  },
  this.getInfo = function(idInput){
    for(x in idList){
      console.log(idList[x]);
      if(idList[x] === idInput) {
        console.log("Finnes i listen");
      }
    }
    //sjekk om kommunenummer er riktig i idlisten
    //om riktig -- hent ut index på der den ligger og bruk den på den andre idlisten
    //kommunenavnet brukes som key for å hente ut all informasjon om den spesifikke kommunen
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
  konst.getInfo(idInput)
}


/*
function detaljer(kommuner){
  var eleDetaljer = document.getElementsByClassName("detaljer")
  eleDetaljer[0].style.display = "block";
  var kommuneNr = document.getElementById("kommuneNr").value
  informasjon.onclick = function() {}
}

/*
for(x in this.data.elementer){
  IDs.push({
    key: x,   //kommunenavn
    value: this.data.elementer[x]["kommunenummer"] //kommunenummer
  })

*/
