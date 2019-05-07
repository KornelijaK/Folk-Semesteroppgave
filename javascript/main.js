// ------------------Make constructon-----------------
let bef;
let syss;
let utdan;
let input;
let runTracker;

function lagerKonstruktør(){
  syss = new Konstruktør(urlSyss)
  syss.load();
  bef = new Konstruktør(urlBef)
  bef.load();
  utdan = new Konstruktør(urlUtdann)
  utdan.load();
}

window.onload = lagerKonstruktør;

var befolkning = new Konstruktør(urlBef);
befolkning.onload = function() {
  console.log("NY SKREVET ONLOAD");
};
befolkning.load();


// --------------------------------------Felles funksjoner------------------------------

function currentKommune(obj,input){
  for(var i=0; i<obj.idsList.length;i++){
    if(input === obj.idsList[i]){
      var kommuneNavn = getNames()[i]

    }
  }
  return kommuneNavn;
}

function totalBefolkning(obj) {
  var befolkningMenn = Object.values(obj.getInfo(input)["Menn"]);
  // var befolkningMenn = Object.values(obj.informasjon["Menn"]);
  var befolkningKvinner = Object.values(obj.informasjon["Kvinner"]);
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

function runMethods(){
  var l = bef.getNames();
  console.log("HER");
  console.log(l);
  bef.getIDs();
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

    // if(!(input in bef.idsList)) throw " er ikke et gyldig komunenummer";

    // if(!(input in bef.idsList))}
    for (var i = 0; i < bef.idsList.length; i++) {
      if(bef.idsList[i] === input){
        x = true
        break

        console.log("fant");
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
  runMethods();
  console.log(syss);
  console.log(utdan);
  console.log(bef);
  velgSynlighet("over","oversikt");
  if(runTracker === undefined) {
    displayData(bef.kommuneList,"oversikt","Kommune")
    displayData(bef.idsList,"oversikt","Nummer")
    var befolkningTotalList = totalBefolkninger(bef)
    displayData(befolkningTotalList,"oversikt","Befolkning")
    runTracker = true;
    }
  }




//-------------------------------Detaljer-------------------------------------





// ------------------------------------main --------------



function detaljer(){
  velgSynlighet("detal","detaljer");
  runMethods()



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




// ----------------------main------------------------

function sammenLigning() {
  console.log(1);
  runMethods()
  console.log(2);
  if(checkInput("i1") === null || checkInput("i2") === null ){
    return null
  }
  console.log(3);
  sysselSettingBegge(syss);
}
