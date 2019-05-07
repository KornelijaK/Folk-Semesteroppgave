// ------------------Make constructon-----------------
let bef;
let syss;
let utdan;
let input = "0101"
let runTracker;

function lagerKonstruktør(){
  syss = new Konstruktør(urlSyss)


  utdan = new Konstruktør(urlUtdann)
  bef = new Konstruktør(urlBef)

  utdan.onload = function() {console.log(" utdan Data lastet inn");}
  syss.onload = function() {console.log(" syss Data lastet inn");}
  bef.onload = function() {console.log(" Bef Data lastet inn");}



  syss.load();

  utdan.load()
  bef.load();

}

window.onload = lagerKonstruktør;



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


function checkInput(id) {
  var  ele = document.getElementById(id);
  var input = ele.value;

  try {
    if(input ==="") throw " er tom"
    if(input.length != 4) throw " har feil nummer lengde";
    if(isNaN(input)) throw " er ikke et tall";
    var x = undefined;

    for (var i = 0; i < bef.getIDs().length; i++) {
      if(bef.getIDs()[i] === input){
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

function displayDetaljer() {
  if(checkInput("kommuneNr") === null){
    return null
  }
  var getKommune = document.getElementById("getKommune")
  var kommuneNr = document.getElementById("kommuneNr").value;

  input = kommuneNr
  syss.getInfo();
  getSisteSyssel(syss);
  utdan.getInfo();
  getHøyereUtdannning(utdan);
  bef.getInfo()
  infoDetaljer(input)

  makeHeader("overskriftID",getValgtKommune(syss,input))
  makeall(utdan,titler,skoleNavn)
  detaljeTabll(syss,"detalSyss","tabsyss","Sysselsette")
  detaljeTabll(bef,"detalBef","tabBef","Befokning")
}









//-------------------------------Sammenligning-------------------------------------



function sammenLigning() {
  if(checkInput("i1") === null || checkInput("i2") === null ){
    return null
  }
  console.log(3);
  sysselSettingBegge(syss);
}


// runMethods()
// var handler = getUtdanEnhet(utdan);
// makeDisplay(handler,titler)
// makeFlexbox("utdan",handler["år"],"År");
// tableDetaljer(befolkning)
// tableDetaljer(syssel)
// getUtdanning(utdan)
// tableDetaljerUtdanning(utdanning)
