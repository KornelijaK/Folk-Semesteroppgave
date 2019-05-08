// // ------------------Globale Variabler----------------
// let bef;
// let syss;
// let utdan;
var urlBef = "http://wildboy.uib.no/~tpe056/folk/104857.json"
var urlSyss = "http://wildboy.uib.no/~tpe056/folk/100145.json"
var urlUtdann = "http://wildboy.uib.no/~tpe056/folk/85432.json"
let input;
let datasetReady = []
// let runTracker;
// let dataLaster = [];

// --------------------------------- ved load --------------

window.onload = lagerKonstruktør;
window.setTimeout(function(){
  console.log("Genererer siden");     //Timer fordi datasettene må lastes inn først
  oversikt();                      // Laster inn her ,fordi det er en tidkrevnde prosess å generere oversikt.
},2000);


function lagerKonstruktør(){
  bef = new Konstruktør(urlBef);
  syss = new Konstruktør(urlSyss);
  utdan = new Konstruktør(urlUtdann);

  utdan.onload = function() {console.log(" utdan Data lastet inn");}  // En egendefinert onload, men denne kan overskrives dersom en bruker vil ha en annen onlaod funksjon.
  syss.onload = function() {console.log(" syss Data lastet inn");}
  bef.onload = function() {console.log(" Bef Data lastet inn");}

  utdan.load();
  syss.load();
  bef.load();
}

setInterval(alertFunc, 3000)


function sjekkOmKlar() {
  if(datasetReady.length === 3)
  datasetReady = "Yes";
  console.log("Alle datsett nedlastet");
  
}

// --------------------------------------Felles hjelpefunksjoner------------------------------

function getValgtKommune(obj,input){
  for(var i=0; i<obj.getIDs().length;i++){
    if(input === obj.getIDs()[i]){
      var kommuneNavn = obj.getNames()[i]
    }
  }
  return kommuneNavn;
}


function velgSynlighet(id,classN){
  var ele = document.getElementById("int");
  var ele2 = document.getElementById("detal");
  var ele3 = document.getElementById("over");
  var ele4 = document.getElementById("sammen");
  var ele5 = document.getElementById(id);
  ele.className = "hidden";
  ele2.className = "hidden";
  ele3.className = "hidden";
  ele4.className = "hidden";
  ele5.className = classN;
}


function lastSide() {
  var lastText = document.getElementById('lastInn');
  var wrapper = document.getElementById('wrapper')
  lastText.className = "hidden";
  wrapper.className = "wrapper";
}


function checkInput(id) {
  var  ele = document.getElementById(id);
  var input = ele.value;

  try {
    if(input ==="") throw " er tom"
    if(input.length != 4) throw " har feil nummer lengde";
    if(isNaN(input)) throw " er ikke et tall";
    var x = undefined;

    for (var i = 0; i < bef.getIDs().length; i++) {
      if(bef.getIDs()[i] === input){
        x = true
        break
      }
    }
      if(x === undefined) {
        throw " er ikke et gyldig komunenummer"
    }
  }

  catch(err) {
    alert(input + err +"\n\n I Oversikt kan du finne kommune id");
    return null
  }
}



function makeFlexbox(id1,dataListe,titel){
  var utdann = document.getElementById(id1);
  var rad = document.createElement("ul");
  rad.setAttribute("class","rad");
  var cell = document.createElement("li");
  cell.setAttribute("class","kategori");
  var t = document.createTextNode(titel)
  cell.appendChild(t);
  rad.appendChild(cell);
  for (var j = 0; j < dataListe.length; j++) {
    var t = document.createTextNode(dataListe[j])
    var cell = document.createElement("li");
    cell.appendChild(t);
    cell.setAttribute("class","cell");
    rad.appendChild(cell);
  }
  utdann.appendChild(rad)
}


// -----------------------------------Avvik Sjekk av Datsett--------------

function dataSjekker(liste,liste2) {
  for (var i = 0; i < liste.length; i++) {
     var n = liste2.includes(liste[i])
    if( n === false ){
      console.log("Funnet avvik "+liste[i]);
    }
  }
}


function runSjekk() {
  var b = bef.getNames()
  var s = syss.getNames()
  var u = utdan.getNames()

  console.log("1 Er i Befokning men ikke i Syssel datasett");
  console.log(dataSjekker(b,s));

  console.log("2 Er i Syssel men ikke i Befolkning datasett");
  console.log(dataSjekker(s,b));

  console.log("3 Er i Befokning men ikke i utdanning datasett");
  console.log(dataSjekker(b,u));

  console.log("4 Er i  Syssel  men ikke i utdanning  datasett");
  console.log(dataSjekker(s,u));

  console.log("5 Er i utdanning  men ikke i Befokning og  datasett");
  console.log(dataSjekker(u,b));

  console.log("6 Er i utdanning men ikke i Syssel datasett");
  console.log(dataSjekker(u,s));
}

// ----------------Oversikt main---------------------

function oversikt(){
    displayData(bef.getNames(),"over","Kommune")
    displayData(bef.getIDs(),"over","Nummer")
    var befolkningTotalList = totalBefolkninger(bef)
    displayData(befolkningTotalList,"over","Befolkning")
    console.log("ferdig");
    lastSide()
  }

// ------------------------------------ Detaljer main --------------

function displayDetaljer() {
  var overskrift = document.getElementById("tabellover").style.display = "block";
  if(checkInput("kommuneNr") === null){
    return null
  }
  var getKommune = document.getElementById("getKommune")
  var kommuneNr = document.getElementById("kommuneNr").value;
  input = kommuneNr
  syss.getInfo();
  getSisteSyssel(syss);
  utdan.getInfo();
  getHøyereUtdannning(utdan);
  bef.getInfo()
  infoDetaljer(input)
  makeHeader("overskriftID",getValgtKommune(syss,input))
  makeall(utdan,titler,skoleNavn)
  detaljeTabll(syss,"detalSyss","tabsyss","Sysselsatte (%)")
  detaljeTabll(bef,"detalBef","tabBef","Befokning")
}

//-------------------------------Sammenligning main-------------------------------------

function sammenLigning() {
  if(checkInput("i1") === null || checkInput("i2") === null ){
    return null
  }
  sysselSettingBegge(syss);
}
