
var urlSysselsatte = "http://wildboy.uib.no/~tpe056/folk/104857.json"
function getData(url, obj) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var jtext = JSON.parse(xhr.responseText);
      obj.data = jtext;
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
    var names = Object.values(this.data);
    var kommuner = Object.keys(names[1])
    detaljer(kommuner);
  }
};



let konst;
window.onload = function() {
  konst = new Sysselsatte(urlSysselsatte);
  konst.load();
}

function detaljer(kommuner){
  var eleDetaljer = document.getElementsByClassName("detaljer")
  eleDetaljer[0].style.display = "block";
  console.log(kommuner);
  var kommuneNr = document.getElementById("kommuneNr").value
  var informasjon = document.getElementById("getKommune");
  informasjon.onclick = function() {
    konst.getNames(kommuner);
    if(konst.getNames(kommuner).hasOwnProperty(kommuneNr)){
      console.log("Kommune finnes");
    }
  }
}
