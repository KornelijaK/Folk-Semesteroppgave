
var urlUtdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json"

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

function getNames3(data,obj) {
  var komuneListe = Object.keys(data["elementer"]);
  obj.komunelist = komuneListe;
}

// ------------------------------Main------------------------

function Utdanning() {
  this.data = undefined;
  this.komunelist = undefined;
  this.idsList = undefined;
  this.detaljer = undefined;
  this.load = function() {getData(urlUtdanning,this)}
  this.getNames = function() {getNames3(this.data,this)}
}

// ------------------------------runner------------------------

function runner() {
  console.log(utdan.data);
  utdan.getNames();
  console.log(utdan.komunelist)
}
