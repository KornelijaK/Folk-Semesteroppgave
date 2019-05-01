// ------------------Make constructon-----------------
let konst;
let syss;
let utdan;
let input;
let runTracker;

function lagerKonstruktør(){
  syss = new Sysselsatte(urlSysselsatte);
  syss.load();
  konst = new Befolkning(url)
  konst.load();
  utdan = new Utdanning(urlUtdanning)
  utdan.load();
}

window.onload = lagerKonstruktør;
// --------------------------------------Felles funksjoner------------------------------


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

function runMethods(){
  konst.getNames();
  konst.getIDs();
  utdan.getNames();
  utdan.getIDs();
  syss.getNames();
  syss.getIDs();
}





// --------------------------------------Introduksjon------------------------------
function introduksjon(){
  velgSynlighet("int","introduksjon");
}







// --------------------------------------Oversikt------------------------------


function displayData(liste,clas,text){
  var ele = document.getElementsByClassName(clas)[0]
  var div = document.createElement("div");
  var lis = document.createElement("ul");
  var header = document.createElement("h2");
  var headerText = document.createTextNode(text);
  header.appendChild(headerText);
  div.appendChild(header);
  for(var i = 0;i<liste.length;i++){
    var text = document.createTextNode(liste[i]);
    var lisItem = document.createElement("li");
    lisItem.appendChild(text);
    lis.appendChild(lisItem)
  }

  div.appendChild(lis)
  ele.appendChild(div);
}

function totalBefolkninger(obj) {
    totalBefolknign = []
    for(var i=0;i<obj.idsList.length;i++){
      kommuneNr = obj.idsList[i]
      input = kommuneNr;
      obj.getInfo()
      var befolkningMenn = Object.values(obj.informasjon["Menn"]);
      var befolkningKvinner = Object.values(obj.informasjon["Kvinner"]);
      var sisteMålingM = befolkningMenn.pop();
      var sisteMålingK = befolkningKvinner.pop();
      var total = sisteMålingM + sisteMålingK;
      totalBefolknign.push(total)
  }
  return totalBefolknign;
}



// ----------------main---------------------
function oversikt(){
  runMethods();
  velgSynlighet("over","oversikt");
  if(runTracker === undefined) {
    displayData(konst.kommuneList,"oversikt","Kommune")
    displayData(konst.idsList,"oversikt","Nummer")
    var befolkningTotalList = totalBefolkninger(konst)
    displayData(befolkningTotalList,"oversikt","Befolkning")
    runTracker = true;
    }
  }




//-------------------------------Detaljer-------------------------------------


function displayDetaljer() {
  velgSynlighet("detal","detaljer");
  runMethods()
  lst1 = [1,2,3]
  var div = document.createElement("div")
  var ele = document.getElementById('detal');
  var list = document.createElement("ul")
  var getKommune = document.getElementById("getKommune")
  var kommuneNr = document.getElementById("kommuneNr").value;
  getKommune.onclick = function() {

    input = kommuneNr
    syss.getInfo();
    getSisteSyssel(syss);
    utdan.getInfo();
    getHøyereUtdannning(utdan);
    konst.getInfo()
    var kommuneNavn = document.createTextNode(syss.informasjon.navn)
    var idNummer = document.createTextNode(input)
    var sysMåling = document.createTextNode(sisteSysselBeggeKjønn)
    var utdanMåling = document.createTextNode(totalUtdanningProsent)
    var kNavnList = document.createElement("li");
    var idNavnList = document.createElement("li")
    var sysList = document.createElement("li");
    var utdanList = document.createElement("li")

    sysList.innerHTML = "Siste sysselmåling: "
    kNavnList.innerHTML = "Kommunenavn: "
    idNavnList.innerHTML = "KommuneId: "
    utdanList.innerHTML = "Siste utdanningmåling: "
    sysList.appendChild(sysMåling)
    utdanList.appendChild(utdanMåling)
    kNavnList.appendChild(kommuneNavn);
    idNavnList.appendChild(idNummer)
    list.appendChild(kNavnList);
    list.appendChild(idNavnList);
    list.appendChild(sysList)
    list.appendChild(utdanList)
  }
  div.appendChild(list)
  ele.appendChild(div)
}


function getHøyereUtdannning(utdan) {
  var kortUtdaningMenn = Object.values(utdan.informasjon["03a"]["Menn"])
  var kortUtdaningKvinner = Object.values(utdan.informasjon["03a"]["Kvinner"])
  var langUtdaningMenn = Object.values(utdan.informasjon["04a"]["Menn"])
  var langUtdaningKvinner = Object.values(utdan.informasjon["04a"]["Kvinner"])
  var sisteMåling = kortUtdaningMenn.pop();
  var sisteMålingK = kortUtdaningKvinner.pop();
  var sisteMålingL = langUtdaningMenn.pop();
  var sisteMålingKL = langUtdaningKvinner.pop();

  totalUtdanningProsent = Number(sisteMåling + sisteMålingK + sisteMålingL + sisteMålingKL)
  return totalUtdanningProsent
}

function getSisteSyssel(obj) {
  var sysselMenn = Object.values(obj.informasjon["Menn"])
  var sysselKvinner = Object.values(obj.informasjon["Kvinner"])
  var sysselBeggeKjønn = Object.values(obj.informasjon["Begge kjønn"])
  var sisteSysselMenn = sysselMenn.pop();
  var sisteSysselKvinner = sysselKvinner.pop();
  sisteSysselBeggeKjønn = sysselBeggeKjønn.pop();

  return sisteSysselBeggeKjønn

}

function getDetails(obj){
  var total = []
  var kommuneNr = document.getElementById("kommuneNr").value;
  input = kommuneNr
  obj.getInfo()
  var listeMenn = Object.entries(obj.informasjon["Menn"]);
  var listeKvinner = Object.entries(obj.informasjon["Kvinner"])
  for(var x = 0; x < listeMenn.length; x++){
    var mennÅrstall = listeMenn[x][0]
    for(var k = 0; k < listeKvinner.length;k++){
      if(mennÅrstall === listeKvinner[k][0]){

        var tot = listeMenn[x][1] + listeKvinner[k][1]
        var kvinner = listeKvinner[k][1]
        var menn = listeMenn[x][1]
        var samlet = [mennÅrstall,menn,kvinner,tot]
        total.push(samlet)
      }
    }
  }
  return total
}

function getUtdanning(obj){
  var grunnskole = []
  var videregående = []
  var fagskole = []
  var universitetLang = []
  var universitetKort = []
  var ingen = []
  var kommuneNr = document.getElementById("kommuneNr").value;
  input = kommuneNr
  obj.getInfo()
  console.log(obj.informasjon);
  var grunnskoleNivåM = Object.entries(obj.informasjon["11"]["Menn"])
  var grunnskoleNivåK = Object.entries(obj.informasjon["11"]["Kvinner"])
  for(var x =0; x<grunnskoleNivåK.length;x++){
    var år = grunnskoleNivåK[x][0];
    var samlet = [år]
  }
}


function makeT(text,text2,text3,text4){
  var element = document.getElementById("table")
  var rad = document.createElement("TR");
  var cell1 = document.createElement("TD");
  var cell2 = document.createElement("TD");
  var cell3 = document.createElement("TD");
  var cell4 = document.createElement("TD");
  var text = document.createTextNode(text);
  var text2 = document.createTextNode(text2);
  var text3 = document.createTextNode(text3);
  var text4 = document.createTextNode(text4);
  cell1.appendChild(text);
  cell2.appendChild(text2);
  cell3.appendChild(text3);
  cell4.appendChild(text4);
  rad.appendChild(cell1);
  rad.appendChild(cell2);
  rad.appendChild(cell3);
  rad.appendChild(cell4);
  element.appendChild(rad);
}

/*
function tableSyss(obj){
  var sysselListe = []
  var kommuneNr = document.getElementById('kommuneNr')
  input = kommuneNr
  syss.getInfo();
  var listeMenn = Object.entries(obj.)

}
*/




function tableDetaljer(befolkning) {
  makeT("År", "Menn", "Kvinner", "Total")
  for(var i=0; i <befolkning.length;i++){
    var år = befolkning[i][0]
    var menn = befolkning[i][1]
    var kvinner = befolkning[i][2]
    var total = befolkning[i][3]
    makeT(år,menn, kvinner,total)
  }
}

// ------------------------------------main --------------



function detaljer(){
  displayDetaljer()

  var befolkning = getDetails(konst)
  var syssel = getDetails(syss)
  var utdanning = getUtdanning(utdan)
  tableDetaljer(befolkning)
  tableDetaljer(syssel)
  tableDetaljer(utdanning)
}


//-------------------------------Sammenligning-------------------------------------


function sysselSettingBegge(obj,id){
  syss.getInfo()
  var sysselMenn = Object.entries(obj.informasjon["Menn"])
  var sysselKvinner = Object.entries(obj.informasjon["Kvinner"])
  makeTable(sysselMenn,sysselKvinner,id)

}

function createRow(text,text2,text3,id) {
  var ele = document.getElementById(id);
  var row = document.createElement("TR");
  var cell1 = document.createElement("TD");
  var cell2 = document.createElement("TD");
  var cell3 = document.createElement("TD");
  var text = document.createTextNode(text);
  var text2 = document.createTextNode(text2);
  var text3 = document.createTextNode(text3);
  cell1.appendChild(text);
  cell2.appendChild(text2);
  cell3.appendChild(text3);
  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  ele.appendChild(row)
}

function makeTable(liste,liste2,id){
  createRow("År","Menn","Kvinner",id)
  for(var i=0;i<liste.length;i++){
    var år = liste[i][0]
    var dataMenn = liste[i][1]
    for(var j=0;j<liste2.length;j++){
      if(liste2[j][0] === år){
        var dataKvinner = liste2[j][1]
      }
    }
    createRow(år,dataMenn,dataKvinner,id)
  }
}

function visKommunenavn(obj,input,id) {
  var ele = document.getElementById(id)
  for(var i =0;i<obj.idsList.length;i++){
    if(obj.idsList[i] === input){
      var kommune = obj.kommuneList[i];
      var text = document.createTextNode(kommune)
      ele.appendChild(text);

    }
  }

}

function prosentPoeng(liste){
  var prosentPoeng = 0;
  var økning = 0;
  for(var i =0;i<liste.length;i++){


  }




}

/// skal være gyldig nummer.

// historisk
// data for utvikling av sysselsetting for kjønnskategoriene “Menn” og “Kvinner” i begge kommunene. For
// hvert år og for hver kjønnskategori, skal dere markere hvilken av kommunene som har høyest vekst i
// prosentpoeng.



// ----------------------main------------------------

// velgSynlighet("sammen","sammenligning");

function sammenLigning() {
  runMethods()
  var kommune1 = document.getElementById("i1").value;
  var kommune2 = document.getElementById("i2").value;
  input = kommune1;
  visKommunenavn(syss,input,"k1");
  sysselSettingBegge(syss,"kommune1");
  input = kommune2
  visKommunenavn(syss,input,"k2");
  sysselSettingBegge(syss,"kommune2");
}
