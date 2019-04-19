// ------------------Make constructon-----------------

let konst;
let syss;
let utdan;

function lagerKonstruktør(){
  syss = new Sysselsatte(urlSysselsatte);
  syss.load();
  konst = new Befolkning(url)
  konst.load()
  utdan = new Utdanning(urlUtdanning,)
  utdan.load()
}

window.onload = lagerKonstruktør;



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

function makeHeader(text) {

}

// ----------------main---------------------
function oversikt(){
    var totalBefolknign = []
    konst.getNames()
    displayData(konst.komunelist,"oversikt","Komuner")
    konst.getIDs()
    var idliste = konst.getIDs()
    displayData(konst.idsList,"oversikt","Komunernummer")
    var totalBefolknign = []
    for(var i=0;i<konst.idsList.length;i++){
      input = konst.idsList[i]
      konst.getInfo()
      totalBefolknign.push(konst.detaljer);
    }
    displayData(totalBefolknign,"oversikt","Befolknign");
}


// ------------------------------------fra Korneija --------------

function start(){
  syss.getNames();
  syss.getIDs();
}

function detaljer() {
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
