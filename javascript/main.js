// ------------------Make constructon-----------------
let bef;
let syss;
let utdan;
let input = "0101"
let runTracker;

function lagerKonstruktør(){
  syss = new Konstruktør(urlSyss)
  syss.load();
  bef = new Konstruktør(urlBef)
  bef.load();
  utdan = new Konstruktør(urlUtdann)
  utdan.load()
}

window.onload = lagerKonstruktør;

// var befolkning = new Konstruktør(urlBef);
// befolkning.onload = function() {
//   console.log("NY SKREVET ONLOAD");
// };
// befolkning.load();


// --------------------------------------Felles funksjoner------------------------------

function getValgtKommune(obj,input){
  for(var i=0; i<obj.getIDs().length;i++){
    if(input === obj.getIDs()[i]){
      var kommuneNavn = obj.getNames()[i]

    }
  }
  return kommuneNavn;
}

function totalBefolkning(obj) {
  var befolkningMenn = Object.values(obj.getInfo(input)["Menn"]);
  var befolkningKvinner = Object.values(obj.getInfo(input)["Kvinner"]);
  var sisteMålingM = befolkningMenn.pop();
  var sisteMålingK = befolkningKvinner.pop();
  var total = sisteMålingM + sisteMålingK;
  return total;
}

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

// function runMethods(){
//   var l = bef.getNames();
//   console.log("HER");
//   console.log(l);
//   bef.getIDs();
//   utdan.getNames();
//   utdan.getIDs();
//   syss.getNames();
//   syss.getIDs();
// }

function checkInput(id) {
  var  ele = document.getElementById(id);
  var input = ele.value;

  try {
    if(input ==="") throw " er tom"
    if(input.length != 4) throw " har feil nummer lengde";
    if(isNaN(input)) throw " er ikke et tall";
    var x = undefined;

    // if(!(input in bef.idsList)) throw " er ikke et gyldig komunenummer";

    // if(!(input in bef.idsList))}
    for (var i = 0; i < bef.idsList.length; i++) {
      if(bef.idsList[i] === input){
        x = true
        break

      }
      // else if(!(input === bef.idsList[i]  )) {
      //   x = false;
      //
      // }

      }
      if(x === undefined) {
        throw " er ikke et gyldig komunenummer"

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






// ----------------main---------------------
function oversikt(){
  // runMethods();
  velgSynlighet("over","oversikt");
  if(runTracker === undefined) {

    displayData(bef.getNames(),"oversikt","Kommune")

    displayData(bef.getIDs(),"oversikt","Nummer")

    var befolkningTotalList = totalBefolkninger(bef)

    displayData(befolkningTotalList,"oversikt","Befolkning")
    runTracker = true;
    }
  }




//-------------------------------Detaljer-------------------------------------



function detaljer(){
  velgSynlighet("detal","detaljer");
}


// ------------------------------------main --------------

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






//-------------------------------Sammenligning-------------------------------------




// ----------------------main------------------------




// runMethods()
// var handler = getUtdanEnhet(utdan);
// makeDisplay(handler,titler)
// makeFlexbox("utdan",handler["år"],"År");
// tableDetaljer(befolkning)
// tableDetaljer(syssel)
// getUtdanning(utdan)
// tableDetaljerUtdanning(utdanning)
// function sammenLigning() {
//   runMethods()
//   if(checkInput("i1") === null || checkInput("i2") === null ){
//     return null
//   }
//   sysselSettingBegge(syss);
// }
