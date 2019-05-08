// ------------------Make constructon-----------------
let bef;
let syss;
let utdan;
let input;
let runTracker;
let dataLaster = [];


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

// function test() {
//   console.log("NOE SKJER");
// }
//
// function test2() {
//   console.log("NOE SKJER 222222");
// }

window.onload = lagerKonstruktør;
window.setTimeout(function() {
  console.log("kjører");
  oversikt();}
  ,2000
)

// window.onlaod = setTimer(function(){console.log("her er vi"),3000;})
// window.setTimeout(function(){console.log("her er vi")},5000);

//// her skal du gjøre oversikt, men at det er usynlig og knappen viser elller
//sjuler

// function kjør() {{
//
// }


// document.addEventListener("load",test());
// document.addEventListener("load",lagerKonstruktør())
//

// document.addEventListener("load",test2());
//
// document.addEventListener("load",function(){syss = new Konstruktør(urlSyss)})
// document.addEventListener("load",function() {console.log(" syss!!!!! Data lastet inn");})




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

function lastSide() {
  var lastText = document.getElementById('lastInn');
  var wrapper = document.getElementById('wrapper')
  lastText.className = "hidden";
  wrapper.className = "wrapper";




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



  function makeFlexbox(id1,dataListe,titel){
    var utdann = document.getElementById(id1);
    var rad = document.createElement("ul");
    rad.setAttribute("class","rad");
    var cell = document.createElement("li");
    cell.setAttribute("class","kategori");
    var t = document.createTextNode(titel)
    cell.appendChild(t);
    rad.appendChild(cell);
      for (var j = 0; j < dataListe.length; j++) {
        var t = document.createTextNode(dataListe[j])
        var cell = document.createElement("li");
        cell.appendChild(t);
        cell.setAttribute("class","cell");
        rad.appendChild(cell);
        }
        utdann.appendChild(rad)
      }

  // function motattData() {
  //   console.log("data ferdig lastet");
  //   dataLaster.push("1");
  // }


// -----------------------------------Avvik Sjekk av Datsett--------------

  function dataSjekker(liste,liste2) {
    for (var i = 0; i < liste.length; i++) {
       var n = liste2.includes(liste[i])
      if( n === false ){
        console.log("Funnet avvik "+liste[i]);
      }
    }
  }


function runSjekk() {
  var b = bef.getNames()
  var s = syss.getNames()
  var u = utdan.getNames()

  console.log("1 Er i Befokning men ikke i Syssel datasett");
  console.log(dataSjekker(b,s));

  console.log("2 Er i Syssel men ikke i Befolkning datasett");
  console.log(dataSjekker(s,b));

  console.log("3 Er i Befokning men ikke i utdanning datasett");
  console.log(dataSjekker(b,u));

  console.log("4 Er i  Syssel  men ikke i utdanning  datasett");
  console.log(dataSjekker(s,u));

  console.log("5 Er i utdanning  men ikke i Befokning og  datasett");
  console.log(dataSjekker(u,b));

  console.log("6 Er i utdanning men ikke i Syssel datasett");
  console.log(dataSjekker(u,s));


}




// --------------------------------------Introduksjon---------------------------
function introduksjon(){
  velgSynlighet("int","introduksjon");
}







// --------------------------------------Oversikt------------------------------






// ----------------main---------------------
function oversikt(){
    displayData(bef.getNames(),"over","Kommune")
    displayData(bef.getIDs(),"over","Nummer")
    var befolkningTotalList = totalBefolkninger(bef)
    displayData(befolkningTotalList,"over","Befolkning")
    console.log("ferdig");
    lastSide()


  }




//-------------------------------Detaljer-------------------------------------


//
// function detaljer(){
//   velgSynlighet("detal","detaljer");
// }


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
  sysselSettingBegge(syss);
}
