// ------------------Make constructon-----------------







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
