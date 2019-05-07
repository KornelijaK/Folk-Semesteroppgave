


function infoDetaljer(input){
  var div = document.createElement("div")
  var ele = document.getElementById('info');
  var list = document.createElement("ul")

  var kommuneNavn = document.createTextNode(getValgtKommune(syss,input))
  var idNummer = document.createTextNode(input)
  var sysMåling = document.createTextNode(getSisteSyssel(syss))
  var utdanMåling = document.createTextNode(getHøyereUtdannning(utdan))

  var befolkningMåling = document.createTextNode(totalBefolkning(bef))


  var kNavnList = document.createElement("li");
  var idNavnList = document.createElement("li")
  var sysList = document.createElement("li");
  var utdanList = document.createElement("li")
  var beflist = document.createElement("li")

  sysList.innerHTML = "Siste sysselmåling: "
  kNavnList.innerHTML = "Kommunenavn: "
  idNavnList.innerHTML = "KommuneId: "
  utdanList.innerHTML = "Siste målte høyere utdanning: "
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

div.appendChild(list)
ele.appendChild(div)
}





function displayDetaljer() {
  var getKommune = document.getElementById("getKommune")
  var kommuneNr = document.getElementById("kommuneNr").value;

  input = kommuneNr
  syss.getInfo();
  getSisteSyssel(syss);
  utdan.getInfo();
  getHøyereUtdannning(utdan);
  bef.getInfo()
  infoDetaljer(input)

  makeHeader("overskriftID",getName(syss,input))
  makeall(utdan,titler,skoleNavn)
  detaljeTabll(syss,"detalSyss","tabsyss","Sysselsette")
  detaljeTabll(bef,"detalBef","tabBef","Befokning")
}



function getHøyereUtdannning(obj) {

  var kortUtdaningMenn = Object.values(obj.getInfo(input)["03a"]["Menn"])
  var kortUtdaningKvinner = Object.values(obj.getInfo(input)["03a"]["Kvinner"])
  var langUtdaningMenn = Object.values(obj.getInfo(input)["04a"]["Menn"])
  var langUtdaningKvinner = Object.values(obj.getInfo(input)["04a"]["Kvinner"])
  var sisteMåling = kortUtdaningMenn.pop();
  var sisteMålingK = kortUtdaningKvinner.pop();
  var sisteMålingL = langUtdaningMenn.pop();
  var sisteMålingKL = langUtdaningKvinner.pop();

  var totalUtdanningProsent = Number(sisteMåling + sisteMålingK + sisteMålingL + sisteMålingKL)+"%";

  return totalUtdanningProsent

}

function getSisteSyssel(obj) {
  console.log(obj);
  var sysselMenn = Object.values(obj.getInfo(input)["Menn"])
  var sysselKvinner = Object.values(obj.getInfo(input)["Kvinner"])
  var sysselBeggeKjønn = Object.values(obj.getInfo(input)["Begge kjønn"])
  var sisteSysselMenn = sysselMenn.pop();
  var sisteSysselKvinner = sysselKvinner.pop();
  var sisteSysselBeggeKjønn = sysselBeggeKjønn.pop()+"%";

  return sisteSysselBeggeKjønn

}

// function getDetails(obj){
//   var total = []
//   var kommuneNr = document.getElementById("kommuneNr").value;
//   input = kommuneNr
//   obj.getInfo()
//   var listeMenn = Object.entries(obj.informasjon["Menn"]);
//   var listeKvinner = Object.entries(obj.informasjon["Kvinner"])
//   for(var x = 0; x < listeMenn.length; x++){
//     var mennÅrstall = listeMenn[x][0]
//     for(var k = 0; k < listeKvinner.length;k++){
//       if(mennÅrstall === listeKvinner[k][0]){
//
//         var tot = listeMenn[x][1] + listeKvinner[k][1]
//         var kvinner = listeKvinner[k][1]
//         var menn = listeMenn[x][1]
//         var samlet = [mennÅrstall,menn,kvinner,tot]
//         total.push(samlet)
//       }
//     }
//   }
//   return total
// }





function makeall(obj,titler,skoleNavn) {
  var skoleID = ["01","02a","11","03a","04a","09a"]
  var ele = document.getElementById('utdan')
  for (var i = 0; i < skoleID.length; i++) {
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
