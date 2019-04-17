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

function makeHeader(text){
}

// ----------------main---------------------
function oversikt(){
  konst.getNames()
  konst.getIDs()
  console.log(totalBefolkning(konst));
  displayData(konst.komunelist,"oversikt","Komuner")
  displayData(konst.idsList,"oversikt","Komunernummer")

  }



  function totalBefolkning(obj) {
    var totalBefolknign = []

    for(var i=0;i<obj.idsList.length;i++){
      kommuneNr = obj.idsList[i]
      input = kommuneNr;
      konst.getInfo()
      konst.informasjon

      // console.log(konst.informasjon);
      // getDetails(kommune,obj.data);
      // console.log(konst.informasjon);

      // totalBefolknign.push(konst.informasjon);

  }

  console.log(konst.informasjon);
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

function getDetails(kommune,data) {
  var dataMenn = Object.entries(data["elementer"][kommune]["Menn"]);
  var dataKvinner = Object.entries(data["elementer"][kommune]["Kvinner"]);
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
