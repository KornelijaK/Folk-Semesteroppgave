// ------------------Make constructon-----------------
let konst;
let syss;
let utdan;
let input;

function lagerKonstruktør(){
  syss = new Sysselsatte(urlSysselsatte);
  syss.load();
  konst = new Befolkning(url)
  konst.load()
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

// function makeHeader(text){
// }

// ----------------main---------------------
function oversikt(){
  velgSynlighet("over","oversikt")
  konst.getNames()
  konst.getIDs()
  displayData(konst.komunelist,"oversikt","Kommune")
  displayData(konst.idsList,"oversikt","Nummer")
  var befolkningTotalList = totalBefolkning(konst)
  displayData(befolkningTotalList,"oversikt","Befolkning")

  }

function totalBefolkning(obj) {
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

 function getMostResentTotal(liste){
  total = 0;
  for(var i =0;i<liste.length;i++){
    var tall = liste[i][1];
    total = tall;
  }
  return total;

}

function getDetails(obj) {
  var dataMenn = Object.entries(obj["Menn"]);
  var dataKvinner = Object.entries(dobj["Kvinner"]);
  var totalMenn =getMostResentTotal(dataMenn);
  var totalKvinner = getMostResentTotal(dataKvinner);
  var totalBefolkning = totalKvinner+totalMenn;
  return totalBefolkning;
}

    // var totalBefolknign = []
    // konst.getNames()
    // displayData(konst.komunelist,"oversikt","Komuner")
    // konst.getIDs()
    // var idliste = konst.getIDs()
    // displayData(konst.idsList,"oversikt","Komunernummer")
    // var totalBefolknign = []
    // for(var i=0;i<konst.idsList.length;i++){
    //   input = konst.idsList[i]
    //   konst.getInfo()
    //   totalBefolknign.push(konst.detaljer);
    // }
    // displayData(totalBefolknign,"oversikt","Befolknign");




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






// ------------------------------------fra Korneija --------------

function start(){
  syss.getNames();
  syss.getIDs();
}


function detaljer(kommuner){
  var eleDetaljer = document.getElementsByClassName("detaljer")
  eleDetaljer[0].style.display = "block";
  var kommuneNr = document.getElementById("kommuneNr").value
  var getKommune = document.getElementById("getKommune")
  getKommune.onclick = function() {
    syss.getInfo(idList,kommuneList,kommuneNr);  //kaller på konstruktør for å hente id
  } // hvilke konstruktør skal jeg kalle på?
}
