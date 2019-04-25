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
  utdan.load()
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
    var totalBefolknign = []
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
    displayData(konst.komunelist,"oversikt","Kommune")
    displayData(konst.idsList,"oversikt","Nummer")
    var befolkningTotalList = totalBefolkninger(konst)
    displayData(befolkningTotalList,"oversikt","Befolkning")
    runTracker = true;
    }
  }




//-------------------------------Detaljer-------------------------------------




function getHøyereUtdannning(data,kommune) {
  var kortUtdaningMenn = Object.values(data["elementer"][kommune]["03a"]["Menn"])
  var kortUtdaningKvinner = Object.values(data["elementer"][kommune]["03a"]["Kvinner"])
  var langUtdaningMenn = Object.values(data["elementer"][kommune]["04a"]["Menn"])
  var langUtdaningKvinner = Object.values(data["elementer"][kommune]["04a"]["Kvinner"])
  var sisteMåling = kortUtdaningMenn.pop();
  var sisteMålingK = kortUtdaningKvinner.pop();
  var sisteMålingL = langUtdaningMenn.pop();
  var sisteMålingKL = langUtdaningKvinner.pop();
  console.log("siste Måling Menn kort "+sisteMåling);
  console.log("siste Måling Kvinner kort "+sisteMålingK);
  console.log("siste Måling Menn lang: "+sisteMålingL);
  console.log("siste Måling Kvinner lang "+sisteMålingKL);
}

function getSisteSyssel(obj,valgtKommune) {
  var sysselMenn = Object.values(obj.data["elementer"][valgtKommune]["Menn"])
  var sysselKvinner = Object.values(obj.data["elementer"][valgtKommune]["Kvinner"])
  var sysselBeggeKjønn = Object.values(obj.data["elementer"][valgtKommune]["Begge kjønn"])
  var sisteSysselMenn = sysselMenn.pop();
  var sisteSysselKvinner = sysselKvinner.pop();
  sisteSysselBeggeKjønn = sysselBeggeKjønn.pop();

  return sisteSysselBeggeKjønn


}


// ------------------------------------main --------------
function detaljer() {
  runMethods()
  var div = document.createElement("div")
  var ele = document.getElementsByClassName("detaljer")[0];
  var list = document.createElement("ul")
  ele.style.display = "block";
  var getKommune = document.getElementById("getKommune")
  var kommuneNr = document.getElementById("kommuneNr").value;
  getKommune.onclick = function() {
    input = kommuneNr
    syss.getInfo();
    var kommuneNavn = document.createTextNode(valgtKommune)
    var idNummer = document.createTextNode(idNr)
    var sysselProsent = document.createTextNode(sisteSysselBeggeKjønn)
    var kNavnList = document.createElement("li");
    var idNavnList = document.createElement("li")
    var sysselList = document.createElement("li")

    sysselList.innerHTML = "Siste sysselmåling for begge kjønn: "
    kNavnList.innerHTML = "Kommunenavn: "
    idNavnList.innerHTML = "KommuneId: "
    kNavnList.appendChild(kommuneNavn);
    idNavnList.appendChild(idNummer)
    sysselList.appendChild(sysselProsent)
    list.appendChild(kNavnList);
    list.appendChild(idNavnList);
    list.appendChild(sysselList);

  }
  div.appendChild(list)
  ele.appendChild(div)
}


//-------------------------------Sammenligning-------------------------------------


function sysselSettingBegge(obj,id){
  syss.getInfo()
  console.log(obj.informasjon);
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
