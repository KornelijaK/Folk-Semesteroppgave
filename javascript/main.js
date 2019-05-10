// // ------------------Globale Variabler----------------
var urlBef = "http://wildboy.uib.no/~tpe056/folk/104857.json"
var urlSyss = "http://wildboy.uib.no/~tpe056/folk/100145.json"
var urlUtdann = "http://wildboy.uib.no/~tpe056/folk/85432.json"
let input;
let datasetReady = []
let intervallID;

// --------------------------------- Ved oppstart --------------

window.onload = oppstart;
window.setTimeout(function(){
  console.log("Genererer siden");     //Timer fordi datasettene må lastes inn først
  oversikt();                      // Laster inn her ,fordi det er en tidkrevnde prosess å generere oversikt.
},2000);


function oppstart(){
  intervallID = setInterval(function(){    //Her sjekker den i intervaller om alle datsett er hentet inn.
      sjekkOmKlar()
      },1000);
  bef = new Konstruktør(urlBef);
  syss = new Konstruktør(urlSyss);
  utdan = new Konstruktør(urlUtdann);
  utdan.onload = function() {console.log(" Utdanning data lastet inn");}  // En egendefinert onload, men denne kan overskrives dersom en bruker vil ha en annen onlaod funksjon.
  syss.onload = function() {console.log(" Sysselsetting data lastet inn");}
  bef.onload = function() {console.log(" Befolkning data lastet inn");}
  utdan.load();
  syss.load();
  bef.load();
}


function sjekkOmKlar(){
  if(datasetReady.length === 3){
    datasetReady = "Ja";
    console.log("Alle datasett nedlastet");
  }
}

function stopIntervall(){
  if(datasetReady ==="Ja"){
    console.log("Stopper intervall");
    clearInterval(intervallID);
  }
}

// --------------------------------------Felles hjelpefunksjoner------------------------------

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

function lagKonteiner(idParent,idChild,klasse){
  var ele = document.getElementById(idParent);
  var div = document.createElement("div");
  div.setAttribute("id",idChild);
  div.setAttribute("class",klasse);
  ele.appendChild(div);
}


function makeHeader(id,text){
  var ele = document.getElementById(id);
  var div = document.createElement("Div");
  div.setAttribute("class","kommuneNavn")
  var h = document.createElement("h2");
  var t = document.createTextNode(text);
  h.appendChild(t);
  div.appendChild(h)
  ele.appendChild(div);
}


function makeFlexbox(id,dataListe,kategori){
  var utdann = document.getElementById(id);
  var rad = document.createElement("ul");
  rad.setAttribute("class","rad");
  var cell = document.createElement("li");
  cell.setAttribute("class","kategori");
  var t = document.createTextNode(kategori);
  cell.appendChild(t);
  rad.appendChild(cell);
  for (var j = 0; j < dataListe.length; j++) {
    var t = document.createTextNode(dataListe[j]);
    var cell = document.createElement("li");
    cell.appendChild(t);
    cell.setAttribute("class","cell");
    rad.appendChild(cell);
  }
  utdann.appendChild(rad);
}


function removeEle(id){
  document.getElementById(id).innerHTML = "";
}


function getValgtKommune(obj,input){
  for(var i=0; i<obj.getIDs().length;i++){
    if(input === obj.getIDs()[i]){
      var kommuneNavn = obj.getNames()[i];
    }
  }
  return kommuneNavn;
}


function lastSide(){
  var lastText = document.getElementById('lastInn');
  var wrapper = document.getElementById('wrapper');
  lastText.className = "hidden";
  wrapper.className = "wrapper";
}


function checkInput(id){
  var  ele = document.getElementById(id);
  var input = ele.value;

  try {
    if(input ==="") throw "Input er tom";
    if(input.length != 4) throw " har feil nummer lengde";
    if(isNaN(input)) throw " er ikke et tall";
    var x = undefined;

    for (var i = 0; i < bef.getIDs().length; i++) {
      if(bef.getIDs()[i] === input){
        x = true;
        break
      }
    }
      if(x === undefined) {
        throw " er ikke et gyldig komunenummer";
    }
  }
  catch(err) {
    alert(input + err +"\n\n Se oversikt for gyldig kommuneid");
    return null;
  }
}

// -----------------------------------Avvik Sjekk av Datsett--------------

function dataSjekker(liste,liste2) {
  for (var i = 0; i < liste.length; i++) {
     var n = liste2.includes(liste[i]);
    if(n === false){
      console.log("Funnet avvik "+liste[i]);
    }
  }
}


function runSjekk() {
  var b = bef.getNames();
  var s = syss.getNames();
  var u = utdan.getNames();

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
    stopIntervall();
    displayData(bef.getNames(),"over","Kommune");
    displayData(bef.getIDs(),"over","ID");
    var befolkningTotalList = alleTotalBef(bef);
    displayData(befolkningTotalList,"over","Befolkning");
    console.log("ferdig");
    lastSide();
  }

  function totalBefolkning(obj) {
    var befolkningMenn = Object.values(obj["Menn"]);
    var befolkningKvinner = Object.values(obj["Kvinner"]);
    var sisteMålingM = befolkningMenn.pop();
    var sisteMålingK = befolkningKvinner.pop();
    var total = sisteMålingM + sisteMålingK;
    return total;
  }

// ------------------------------------ Detaljer main --------------

function displayDetaljer() {
  if(checkInput("kommuneNr") === null){
    return null;
  }
  if (!(document.getElementById("kom1").innerHTML === "")){
    removeEle("info");
    removeEle("overskriftID");
    removeEle("detalBef");
    document.getElementById("tabellover").className = "hidden";
    removeEle("detalSyss");
    removeEle("utdan");
  }
  document.getElementById("tabellover").className = "vis";
  var getKommune = document.getElementById("getKommune");
  var kommuneNr = document.getElementById("kommuneNr").value;
  input = kommuneNr;
  getSisteSyssel(syss);
  getHøyereUtdannning(utdan);
  infoDetaljer(input);
  makeHeader("overskriftID",getValgtKommune(syss,input));
  tabellUtdan(utdan,titler,skoleNavn);
  tabellDetaljer(syss,"detalSyss","tabsyss","Sysselsatte (%)");
  tabellDetaljer(bef,"detalBef","tabBef","Befokning");
}

//-------------------------------Sammenligning main-------------------------------------

function sammenLigning() {
  if(checkInput("i1") === null || checkInput("i2") === null ){
    return null;
  }
  // Dette er for å hindre duplisering av tabeller på siden, slik at man kan samenligne på ny.
  document.getElementById("tabellover2").className = "vis";
  if (!(document.getElementById("kom1").innerHTML === "")){
    document.getElementById("tabellover").className = "hidden";
    removeEle("kom1");
    removeEle("kom2");
  }
  sysselSettingBegge(syss);
}
