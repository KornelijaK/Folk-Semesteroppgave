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
    var x = undefined;

    // if(!(input in konst.idsList)) throw " er ikke et gyldig komunenummer";
    // if(!(input in konst.idsList))}
    for (var i = 0; i < konst.idsList.length; i++) {
      if(konst.idsList[i] === input){
        x = true
        console.log("fant");
      }
      // else if(!(input === konst.idsList[i]  )) {
      //   x = false;
      //
      // }
      if(x === undefined) {
        throw " er ikke et gyldig komunenummer"
      }
    }}


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

function totalBefolkning(obj) {
  var befolkningMenn = Object.values(obj.informasjon["Menn"]);
  var befolkningKvinner = Object.values(obj.informasjon["Kvinner"]);
  var sisteMålingM = befolkningMenn.pop();
  var sisteMålingK = befolkningKvinner.pop();
  var total = sisteMålingM + sisteMålingK;
  return total;
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
  var ele = document.getElementById('info');
  var list = document.createElement("ul")
  getKommune.onclick = function() {
    input = kommuneNr
    syss.getInfo();
    getSisteSyssel(syss);
    utdan.getInfo();
    getHøyereUtdannning(utdan);
    konst.getInfo()

    makeHeader("overskriftID",konst.informasjon.navn)
    makeall(utdan,titler,skoleNavn)
    detaljeTabll(syss,"detalSyss","tabsyss","Sysselsette")
    detaljeTabll(konst,"detalBef","tabBef","Befokning")
    var kommuneNavn = document.createTextNode(syss.informasjon.navn)
    var idNummer = document.createTextNode(input)
    var sysMåling = document.createTextNode(sisteSysselBeggeKjønn)
    var utdanMåling = document.createTextNode(totalUtdanningProsent)

    var befolkningMåling = document.createTextNode(totalBefolkning(konst))

    var kNavnList = document.createElement("li");
    var idNavnList = document.createElement("li")
    var sysList = document.createElement("li");
    var utdanList = document.createElement("li")
    var beflist = document.createElement("li")

    sysList.innerHTML = "Siste sysselmåling: "
    kNavnList.innerHTML = "Kommunenavn: "
    idNavnList.innerHTML = "KommuneId: "
    utdanList.innerHTML = "Siste utdanningmåling: "
    beflist.innerHTML = "Siste befolkningmåling: "

    sysList.appendChild(sysMåling)
    utdanList.appendChild(utdanMåling)
    kNavnList.appendChild(kommuneNavn);
    idNavnList.appendChild(idNummer)
    beflist.appendChild(befolkningMåling)

    list.appendChild(kNavnList);
    list.appendChild(idNavnList);
    list.appendChild(sysList)
    list.appendChild(utdanList)
    list.appendChild(beflist);
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





function makeall(obj,titler,skoleNavn) {
  var skoleID = ["01","02a","11","03a","04a","09a"]
  var ele = document.getElementById('utdan')


  for (var i = 0; i < skoleID.length; i++) {
    counter =+i
    console.log(counter);
    console.log(skoleID[i]);
    var handler = getUtdanEnhet(obj,skoleID[i])
    var skoleInndeling = document.createElement("div")
    skoleInndeling.setAttribute("id","skole"+i)
    skoleInndeling.setAttribute("class","sammenhh")
    var container = document.createElement("div");
    container.setAttribute("class","tabell")
    container.setAttribute("id","contain"+i)
    skoleInndeling.appendChild(container);
    ele.appendChild(skoleInndeling);
    var lister = Object.values(handler)
    makeHeader("skole"+i,skoleNavn[i])
    for(var j = 0; j < titler.length; j++) {
      makeFlexbox("contain"+i,lister[j],titler[j])
      }

  }

}




function getUtdanEnhet(obj,skoleid){
  var kommuneNr = document.getElementById("kommuneNr").value;
  var element = document.getElementById("tableUtdanning")
  input = kommuneNr
  obj.getInfo()
  var år = Object.keys(obj.informasjon[skoleid]["Menn"])
  var grunnskoleNivåM = Object.values(obj.informasjon[skoleid]["Menn"])
  var grunnskoleNivåK = Object.values(obj.informasjon[skoleid]["Kvinner"])
  var handler = {år,grunnskoleNivåK,grunnskoleNivåM,}
  return handler;


}


function makeHeader(id,text) {
  var ele = document.getElementById(id);
  console.log(ele);
  var div = document.createElement("Div");
  div.setAttribute("class","kommuneNavn")
  var h = document.createElement("h2");
  var t = document.createTextNode(text);
  h.appendChild(t);
  div.appendChild(h)
  ele.appendChild(div);

}


var titler = ["År","Kvinner","Menn"]
var skoleNavn = ["Grunnskolenivå","Vidergående skole-nivå","Fagskole nivå","Universitets- og høgskolenivå kort",
"Universitets- og høgskolenivå lang","Uoppgitt eller ingen fullført utdanning"
]



  // for (var i = 0; i < skoleNavn.length; i++) {
  //   makeHeaderader("utdan",skoleNavn[i])
  // }




function makeFlexbox(id1,dataListe,titel){
  var utdann = document.getElementById(id1);
  var row = document.createElement("ul");
  row.setAttribute("class","row");
  var cell = document.createElement("li");
  cell.setAttribute("class","kategori");
  var t = document.createTextNode(titel)
  cell.appendChild(t);
  row.appendChild(cell);
    for (var j = 0; j < dataListe.length; j++) {
      var t = document.createTextNode(dataListe[j])
      var cell = document.createElement("li");
      cell.appendChild(t);
      cell.setAttribute("class","cell");
      row.appendChild(cell);
      }
      utdann.appendChild(row)
    }


function detaljeTabll(obj,id,idnavn,headernavn) {
  var kategori = ["År","Kvinner","Menn"]
  var ele = document.getElementById(id);
  var div = document.createElement("div");
  div.setAttribute("class","tabell")
  div.setAttribute("id",idnavn)
  ele.appendChild(div);
  var kommune1 = document.getElementById("kommuneNr").value;
  input = kommune1;
  syss.getInfo()
  var år = Object.keys(obj.informasjon["Menn"])
  var dataMenn = Object.values(obj.informasjon["Menn"])
  var dataKvinner = Object.values(obj.informasjon["Kvinner"])
  makeHeader(id,headernavn);
  makeFlexbox(idnavn,år,kategori[0])
  makeFlexbox(idnavn,dataKvinner,kategori[1])
  makeFlexbox(idnavn,dataMenn,kategori[2])


}











// ------------------------------------main --------------



function detaljer(){
  velgSynlighet("detal","detaljer");
  runMethods()
  displayDetaljer()


  // var handler = getUtdanEnhet(utdan);
  // console.log("1");
  // makeDisplay(handler,titler)
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


function sysselSettingBegge(obj){
  var kategori = ["År","Kvinner","Vekst","Menn","Vekst"]
  var kommune1 = document.getElementById("i1").value;
  var kommune2 = document.getElementById("i2").value;
  input = kommune1;
  syss.getInfo()
  var navn = obj.informasjon.navn;
  var år = Object.keys(obj.informasjon["Menn"])
  var sysselMenn = Object.values(obj.informasjon["Menn"])
  var sysselKvinner = Object.values(obj.informasjon["Kvinner"])
  var vekstMenn = prosentPoeng(sysselMenn);
  var vekstKvinner = prosentPoeng(sysselKvinner);
  input = kommune2;
  syss.getInfo()
  var navn2 = obj.informasjon.navn;
  var sysselMenn2 = Object.values(obj.informasjon["Menn"])
  var sysselKvinner2 = Object.values(obj.informasjon["Kvinner"])
  var vekstMenn2 = prosentPoeng(sysselMenn2);
  var vekstKvinner2 = prosentPoeng(sysselKvinner2);

  makeHeader("kom1",navn)
  makeFlexbox("tab1",år,"År")
  makeFlexbox("tab1",sysselKvinner,"Kvinner")
  makeFlexboxProsent("tab1",vekstKvinner,vekstKvinner2,"Vekst")
  makeFlexbox("tab1",sysselMenn,"Menn")
  makeFlexboxProsent("tab1",vekstMenn,vekstMenn2,"Vekst")

  makeHeader("kom2",navn2)
  makeFlexbox("tab2",år,"År")
  makeFlexbox("tab2",sysselKvinner2,"Kvinner")
  makeFlexboxProsent("tab2",vekstKvinner2,vekstKvinner,"Vekst")
  makeFlexbox("tab2",sysselMenn2,"Menn")
  makeFlexboxProsent("tab2",vekstMenn2,vekstMenn,"Vekst")


}

  function makeFlexboxProsent(id1,liste1,liste2,titel){
    var utdann = document.getElementById(id1);
    var row = document.createElement("ul");
    row.setAttribute("class","row");
    var cell = document.createElement("li");
    cell.setAttribute("class","kategori");
    var t = document.createTextNode(titel)
    cell.appendChild(t);
    row.appendChild(cell);
      for (var j = 0; j < liste1.length; j++) {
        var t = document.createTextNode(liste1[j])
        var cell = document.createElement("li");
        cell.appendChild(t);
      if(liste1[j]<0 && liste2[j]<0 ){
          if(liste1[j]>liste2[j]){
            cell.setAttribute("class","cellHøgestP")
          }
          else {
            cell.setAttribute("class","cell");
          }
        }
        else if(liste1[j]>liste2[j]){
          cell.setAttribute("class","cellHøgestP")
        }
        else {
          cell.setAttribute("class","cell");
        }

        row.appendChild(cell);
        }
        utdann.appendChild(row)
      }


function prosentPoeng(liste){
  var prosentPoeng = []
  var sistPoeng = 0;
  var økning = 0;
  for(var i =0;i<liste.length;i++){
    var nyPoeng = liste[i];
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


// ----------------------main------------------------

function sammenLigning() {
  runMethods()
  checkInput("i1");
  checkInput("i2");

  sysselSettingBegge(syss);
}
