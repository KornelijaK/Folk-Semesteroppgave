// ------------------Make constructon-----------------
let konst;
let syss;
let utdan;
let input;

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



function velgSynlighet(id,c){
  console.log(id);
  var ele = document.getElementById("int");
  var ele2 = document.getElementById("detal");
  var ele3 = document.getElementById("over");
  var ele4 = document.getElementById("sammen");
  var ele5 = document.getElementById(id);
  ele.className = "hidden";
  ele2.className = "hidden";
  ele3.className = "hidden";
  ele4.className = "hidden";
  ele5.className = c;
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
      konst.getInfo()
      var befolkningMenn = Object.values(konst.informasjon["Menn"]);
      var befolkningKvinner = Object.values(konst.informasjon["Kvinner"]);
      var sisteMålingM = befolkningMenn.pop();
      var sisteMålingK = befolkningKvinner.pop();
      var total = sisteMålingM + sisteMålingK;
      totalBefolknign.push(total)
  }
  return totalBefolknign;
}


// ----------------main---------------------
function oversikt(){
  konst.getNames();
  konst.getIDs();
  velgSynlighet("over","oversikt")
  displayData(konst.komunelist,"oversikt","Kommune")
  displayData(konst.idsList,"oversikt","Nummer")
  var befolkningTotalList = totalBefolkninger(konst)
  displayData(befolkningTotalList,"oversikt","Befolkning")
  }




//-------------------------------Detaljer-------------------------------------




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
  console.log(totalUtdanningProsent);
  console.log("siste Måling Menn kort "+sisteMåling);
  console.log("siste Måling Kvinner kort "+sisteMålingK);
  console.log("siste Måling Menn lang: "+sisteMålingL);
  console.log("siste Måling Kvinner lang "+sisteMålingKL);
  return totalUtdanningProsent
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
    getSisteSyssel(syss);
    utdan.getInfo();
    getHøyereUtdannning(utdan)


    var kommuneNavn = document.createTextNode(valgtKommune)
    var idNummer = document.createTextNode(idNr)
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
