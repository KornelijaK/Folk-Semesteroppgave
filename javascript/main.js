// ------------------Make constructon-----------------

let konst
let syss
function lagerKonstruktør(){
  console.log("ASJDBKABSDKAB");
  syss = new Sysselsatte(urlSysselsatte);
  syss.load();
  konst = new Befolkning(url,input)
  konst.load()
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
    var komuneliste = konst.getNames()
    displayData(komuneliste,"oversikt","Komuner")
    var idliste = konst.getIDs()
    displayData(idliste,"oversikt","Komunernummer")
    var totalBefolknign = []
    for(var i=0;i<idliste.length;i++){
      totalBefolknign.push(konst.getInfo(idliste,komuneliste,idliste[i]))
    }
    displayData(totalBefolknign,"oversikt","Befolknign");
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
