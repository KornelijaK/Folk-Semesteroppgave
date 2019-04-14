
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

function getNames(data) {
  console.log(data)
  var komuneListe = Object.keys(data["elementer"]);
  console.log(komuneListe)

}

// ------------------------------Main------------------------

function Utdanning() {
  this.data = undefined;
  this.load = function() {getData(url,this)}
  this.getNames = function() {getNames(this.data)}
}

// ------------------------------runner------------------------

function runner() {
  utdan.getNames(utdan.data);
}
