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
// --------------------------------------Felles funksjoner------------------------------


function totalBefolkning(obj) {
  var befolkningMenn = Object.values(obj.informasjon["Menn"]);
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
        console.log("fant");
      }
      // else if(!(input === bef.idsList[i]  )) {
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
