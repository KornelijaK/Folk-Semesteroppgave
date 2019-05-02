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

function checkInput(id) {
  var  ele = document.getElementById(id);
  var input = ele.value;

  try {
    if(input ==="") throw " er tom"
    if(input.length != 4) throw " har feil nummer lengde";
    if(isNaN(input)) throw " er ikke et tall";
    // if(!(input in konst.idsList)) throw " er ikke et gyldig komunenummer";

  }
  catch(err) {
    alert(input + err +"\n\n I Oversikt kan du finne kommune id");
    return null
  }
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






function getUtdanEnhet(obj){
  var kommuneNr = document.getElementById("kommuneNr").value;
  var element = document.getElementById("tableUtdanning")
  input = kommuneNr
  obj.getInfo()
  console.log(obj.informasjon);
  var år = Object.keys(obj.informasjon["11"]["Menn"])
  var grunnskoleNivåM = Object.values(obj.informasjon["11"]["Menn"])
  var grunnskoleNivåK = Object.values(obj.informasjon["11"]["Kvinner"])
  var handler = {år,grunnskoleNivåK,grunnskoleNivåM,}
  return handler;


}

//
// function makeT(text,text2,text3,text4){
//   var element = document.getElementById("table")
//   var rad = document.createElement("TR");
//   var cell1 = document.createElement("TD");
//   var cell2 = document.createElement("TD");
//   var cell3 = document.createElement("TD");
//   var cell4 = document.createElement("TD");
//   var text = document.createTextNode(text);
//   var text2 = document.createTextNode(text2);
//   var text3 = document.createTextNode(text3);
//   var text4 = document.createTextNode(text4);
//   cell1.appendChild(text);
//   cell2.appendChild(text2);
//   cell3.appendChild(text3);
//   cell4.appendChild(text4);
//   rad.appendChild(cell1);
//   rad.appendChild(cell2);
//   rad.appendChild(cell3);
//   rad.appendChild(cell4);
//   element.appendChild(rad);
// }
//
//
//
// function tableDetaljer(befolkning) {
//   makeT("År", "Menn", "Kvinner", "Total")
//   for(var i=0; i <befolkning.length;i++){
//     var år = befolkning[i][0]
//     var menn = befolkning[i][1]
//     var kvinner = befolkning[i][2]
//     var total = befolkning[i][3]
//     makeT(år,menn, kvinner,total)
//   }
// }

/*
function makeTUtdanning(text,text2,text3){
  var table = document.getElementById("tableUtdanning")
  var radÅr = document.createElement("TR");
  var col = document.createElement("TH")
  var text = document.createTextNode("År")
  radÅr.appendChild(col)
  col.appendChild(text)
  table.appendChild(radÅr)
}



function tableDetaljerUtdanning(utdanning) {
  makeTUtdanning("År", "Menn", "Kvinner")
  for(var i=0; i <befolkning.length;i++){
    var år = befolkning[i][0]
    var menn = befolkning[i][1]
    var kvinner = befolkning[i][2]
    var total = befolkning[i][3]
    makeTUtdanning(år,menn, kvinner)
  }
}
*/

function makeHeader(id,text) {
  var ele = document.getElementById(id);
  var div = document.createElement("Div");
  var h = document.createElement("h2");
  var t = document.createTextNode(text);
  h.appendChild(t);
  div.appendChild(h)
  ele.appendChild(div);

}


var titler = ["År","Kvinner","Menn"]


function makeDisplay(obj,text) {
  var liste = Object.values(obj)
  makeHeader("utdan","Grunnskole")
  for(var i = 0; i < text.length; i++) {
    makeFlexbox("utdan",liste[i],text[i])
  }

}



function makeFlexbox(id1,dataListe,titel){
  var utdann = document.getElementById(id1);
  var row = document.createElement("DIV");
  row.setAttribute("class","row");
  var cell = document.createElement("div");
  cell.setAttribute("class","kategori");
  var t = document.createTextNode(titel)
  cell.appendChild(t);
  row.appendChild(cell);
  for (var j = 0; j < dataListe.length; j++) {
    var t = document.createTextNode(dataListe[j])
    var cell = document.createElement("div");
    cell.appendChild(t);
    cell.setAttribute("class","cell");
    row.appendChild(cell);
    }


  utdann.appendChild(row)
}




// ------------------------------------main --------------



function detaljer(){
  velgSynlighet("detal","detaljer");
  runMethods()
  displayDetaljer()
  var handler = getUtdanEnhet(utdan);
  console.log("1");
  makeDisplay(handler,titler)
  // makeFlexbox("utdan",handler["år"],"År");

  // console.log(befolkning);
  // console.log(syssel);
  // console.log(utdanning);
  // tableDetaljer(befolkning)
  // tableDetaljer(syssel)
  // getUtdanning(utdan)
  /*tableDetaljerUtdanning(utdanning)*/
}


//-------------------------------Sammenligning-------------------------------------


function sysselSettingBegge(obj,id){
  syss.getInfo()
  var sysselMenn = Object.entries(obj.informasjon["Menn"])
  var sysselKvinner = Object.entries(obj.informasjon["Kvinner"])
  var vekstMenn = prosentPoeng(sysselMenn);
  var vekstKvinner = prosentPoeng(sysselKvinner);
  makeTable(sysselMenn,sysselKvinner,vekstMenn,vekstKvinner,id)

}

function createRow(text,text2,text3,text4,text5,id) {
  var ele = document.getElementById(id);
  var row = document.createElement("TR");
  var cell1 = document.createElement("TD");
  var cell2 = document.createElement("TD");
  var cell3 = document.createElement("TD");
  var cell4 = document.createElement("TD");
  var cell5 = document.createElement("TD");
  var text = document.createTextNode(text);
  var text2 = document.createTextNode(text2);
  var text3 = document.createTextNode(text3);
  var text4 = document.createTextNode(text4);
  var text5 = document.createTextNode(text5);
  cell1.appendChild(text);
  cell2.appendChild(text2);
  cell3.appendChild(text3);
  cell4.appendChild(text4);
  cell5.appendChild(text5);
  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  row.appendChild(cell4);
  row.appendChild(cell5);
  ele.appendChild(row)
}

function makeTable(liste,liste2,liste3,liste4,id){
  createRow("År","Menn","vekst","Kvinner","vekst",id)
  for(var i=0;i<liste.length;i++){
    var år = liste[i][0]
    var dataMenn = liste[i][1]
    for(var j=0;j<liste2.length;j++){
      if(liste2[j][0] === år){
        var dataKvinner = liste2[j][1]
        var vekstM = liste3[j];
        var vekstK = liste4[j]
      }
    }
    createRow(år,dataMenn,vekstM,dataKvinner,vekstK,id)
  }
}

function visKommunenavn(obj,id) {
  var ele = document.getElementById(id)
  var kommune = obj.informasjon.navn;
  var text = document.createTextNode(kommune)
  ele.appendChild(text);

}


function prosentPoeng(liste){
  var prosentPoeng = []
  var sistPoeng = 0;
  var økning = 0;
  for(var i =0;i<liste.length;i++){
    var nyPoeng = liste[i][1];
    if(sistPoeng === 0){
      prosentPoeng.push(økning);
    }
    else {
      økning = nyPoeng-sistPoeng;
      økning = Math.round(økning*10)/10;
      prosentPoeng.push(økning)
    }
    sistPoeng = nyPoeng
  }
  return prosentPoeng;
}



function høgestUtvikling() {
  var ele2 = document.getElementById('kommune2')
  var ele = document.getElementById('kommune1')
  console.log(ele);
  for(var i=0, row; row =ele.rows[i];i++){
    row2 = ele2.rows[i]
    var prosentP1 = row.cells[2];
    var prosentP2 = row2.cells[2];

    console.log(prosentK2)
    if(prosentP1.innerHTML<0 && prosentP2.innerHTML<0){
      if(prosentP1.innerHTML>prosentP2.innerHTML){
        prosentP2.style.backgroundColor = "green";
        prosentP2.style.color = "white";
        }

      if(prosentP1.innerHTML<prosentP2.innerHTML){
          prosentP1.style.backgroundColor = "green";
          prosentP1.style.color = "white";
    }}
    else{
      if(prosentP1.innerHTML>prosentP2.innerHTML){
        prosentP1.style.backgroundColor = "green";
        prosentP1.style.color = "white";
      }
      if(prosentP1.innerHTML<prosentP2.innerHTML){
        prosentP2.style.backgroundColor = "green";
        prosentP2.style.color = "white";
      }
    }
}
}

function høgestUtvikling() {
  var ele2 = document.getElementById('kommune2')
  var ele = document.getElementById('kommune1')
  console.log(ele);
  for(var i=0, row; row =ele.rows[i];i++){
    row2 = ele2.rows[i]
    var prosentP1 = row.cells[2];
    var prosentP2 = row2.cells[2];
    if(prosentP1.innerHTML<0 && prosentP2.innerHTML<0){
      if(prosentP1.innerHTML>prosentP2.innerHTML){
        prosentP2.style.backgroundColor = "green";
        prosentP2.style.color = "white";
        }

      if(prosentP1.innerHTML<prosentP2.innerHTML){
          prosentP1.style.backgroundColor = "green";
          prosentP1.style.color = "white";
    }}
    else{
      if(prosentP1.innerHTML>prosentP2.innerHTML){
        prosentP1.style.backgroundColor = "green";
        prosentP1.style.color = "white";
      }
      if(prosentP1.innerHTML<prosentP2.innerHTML){
        prosentP2.style.backgroundColor = "green";
        prosentP2.style.color = "white";
      }
    }
}
}

function høgestUtviklingKvinner() {
  var ele2 = document.getElementById('kommune2')
  var ele = document.getElementById('kommune1')
  console.log(ele);
  for(var i=0, row; row =ele.rows[i];i++){
    row2 = ele2.rows[i]
    var prosentP1 = row.cells[4];
    var prosentP2 = row2.cells[4];
    if(prosentP1.innerHTML<0 && prosentP2.innerHTML<0){
      if(prosentP1.innerHTML>prosentP2.innerHTML){
        prosentP2.style.backgroundColor = "green";
        prosentP2.style.color = "white";
        }

      if(prosentP1.innerHTML<prosentP2.innerHTML){
          prosentP1.style.backgroundColor = "green";
          prosentP1.style.color = "white";
    }}
    else{
      if(prosentP1.innerHTML>prosentP2.innerHTML){
        prosentP1.style.backgroundColor = "green";
        prosentP1.style.color = "white";
      }
      if(prosentP1.innerHTML<prosentP2.innerHTML){
        prosentP2.style.backgroundColor = "green";
        prosentP2.style.color = "white";
      }
    }
}
}


/// skal være gyldig nummer.



// ----------------------main------------------------

// velgSynlighet("sammen","sammenligning");

function sammenLigning() {
  runMethods()
  checkInput("i1");
  checkInput("i2");

  if (checkInput("i1") === null || checkInput("i2") === null ){
    return null;
  }
  var kommune1 = document.getElementById("i1").value;
  var kommune2 = document.getElementById("i2").value;
  input = kommune1;
  sysselSettingBegge(syss,"kommune1");
  visKommunenavn(syss,"k1");
  input = kommune2
  sysselSettingBegge(syss,"kommune2");
  visKommunenavn(syss,"k2");
  høgestUtvikling()
  høgestUtviklingKvinner()
}
