var titler = ["År","Kvinner","Menn"];
var skoleNavn = ["Grunnskolenivå (%)","Vidergående skole-nivå (%)","Fagskole nivå (%)","Universitets- og høgskolenivå kort (%)",
"Universitets- og høgskolenivå lang (%)","Uoppgitt eller ingen fullført utdanning (%)"
];


function infoDetaljer(input){
  var div = document.createElement("div");
  var ele = document.getElementById('info');
  var list = document.createElement("ul");
  var kommuneNavn = document.createTextNode(getValgtKommune(syss,input));
  var idNummer = document.createTextNode(input);
  var sysMåling = document.createTextNode(getSisteSyssel(syss));
  var utdanMåling = document.createTextNode(getHøyereUtdannning(utdan));
  var befolkningMåling = document.createTextNode(totalBefolkning(bef));

  var kNavnList = document.createElement("li");
  var idNavnList = document.createElement("li");
  var sysList = document.createElement("li");
  var utdanList = document.createElement("li");
  var beflist = document.createElement("li");

  sysList.innerHTML = "Siste sysselmåling: "
  kNavnList.innerHTML = "Kommunenavn: "
  idNavnList.innerHTML = "KommuneId: "
  utdanList.innerHTML = "Siste målte høyere utdanning: "
  beflist.innerHTML = "Siste befolkningmåling: "

  sysList.appendChild(sysMåling);
  utdanList.appendChild(utdanMåling);
  kNavnList.appendChild(kommuneNavn);
  idNavnList.appendChild(idNummer);
  beflist.appendChild(befolkningMåling);

  list.appendChild(kNavnList);
  list.appendChild(idNavnList);
  list.appendChild(sysList);
  list.appendChild(utdanList);
  list.appendChild(beflist);

  div.appendChild(list);
  ele.appendChild(div);
}

function detaljeTabll(obj,id,idnavn,headernavn) {
  var kategori = ["År","Kvinner","Menn","Begge Kjønn"];
  var ele = document.getElementById(id);
<<<<<<< HEAD
  var div = document.createElement("div");
  div.setAttribute("class","tabell");
  div.setAttribute("id",idnavn);
  ele.appendChild(div);
=======
  lagKonteiner(id,idnavn,"tabell");
  // var div = document.createElement("div");
  // div.setAttribute("class","tabell")
  // div.setAttribute("id",idnavn)
  // ele.appendChild(div);
>>>>>>> Live
  var kommune1 = document.getElementById("kommuneNr").value;
  input = kommune1;
  syss.getInfo();
  var år = Object.keys(obj.getInfo(input)["Menn"]);
  var dataMenn = Object.values(obj.getInfo(input)["Menn"]);
  var dataKvinner = Object.values(obj.getInfo(input)["Kvinner"]);
  console.log(obj.getInfo(input)["Begge kjønn"]);
  if("Begge kjønn" in obj.getInfo(input)){
    var beggeKjønn = Object.values(obj.getInfo(input)["Begge kjønn"]);
    makeHeader(id,headernavn);
    makeFlexbox(idnavn,år,kategori[0]);
    makeFlexbox(idnavn,dataKvinner,kategori[1]);
    makeFlexbox(idnavn,dataMenn,kategori[2]);
    makeFlexbox(idnavn,beggeKjønn,kategori[3]);
  } else {
    makeHeader(id,headernavn);
    makeFlexbox(idnavn,år,kategori[0]);
    makeFlexbox(idnavn,dataKvinner,kategori[1]);
    makeFlexbox(idnavn,dataMenn,kategori[2]);
  }
}


function getHøyereUtdannning(obj) {
  var kortUtdaningMenn = Object.values(obj.getInfo(input)["03a"]["Menn"]);
  var kortUtdaningKvinner = Object.values(obj.getInfo(input)["03a"]["Kvinner"]);
  var langUtdaningMenn = Object.values(obj.getInfo(input)["04a"]["Menn"]);
  var langUtdaningKvinner = Object.values(obj.getInfo(input)["04a"]["Kvinner"]);
  var sisteMåling = kortUtdaningMenn.pop();
  var sisteMålingK = kortUtdaningKvinner.pop();
  var sisteMålingL = langUtdaningMenn.pop();
  var sisteMålingKL = langUtdaningKvinner.pop();
  var totalUtdanningProsent = Number(sisteMåling + sisteMålingK + sisteMålingL + sisteMålingKL)+"%";
  return totalUtdanningProsent;
}

function getSisteSyssel(obj){
  var sysselMenn = Object.values(obj.getInfo(input)["Menn"]);
  var sysselKvinner = Object.values(obj.getInfo(input)["Kvinner"]);
  var sysselBeggeKjønn = Object.values(obj.getInfo(input)["Begge kjønn"]);
  var sisteSysselMenn = sysselMenn.pop();
  var sisteSysselKvinner = sysselKvinner.pop();
  var sisteSysselBeggeKjønn = sysselBeggeKjønn.pop()+"%";
  return sisteSysselBeggeKjønn;
}


function makeall(obj,titler,skoleNavn){
  var skoleID = ["01","02a","11","03a","04a","09a"];
  var ele = document.getElementById('utdan');
  for (var i = 0; i < skoleID.length; i++) {
    var handler = getUtdanEnhet(obj,skoleID[i]);
    var skoleInndeling = document.createElement("div");
    skoleInndeling.setAttribute("id","skole"+i);
    skoleInndeling.setAttribute("class","sammenhh");
    var container = document.createElement("div");
    container.setAttribute("class","tabell");
    container.setAttribute("id","contain"+i);
    skoleInndeling.appendChild(container);
    ele.appendChild(skoleInndeling);
    var lister = Object.values(handler);
    makeHeader("skole"+i,skoleNavn[i]);
    for(var j = 0; j < titler.length; j++) {
      makeFlexbox("contain"+i,lister[j],titler[j]);
    }
  }
}


function totalBefolkning(obj){
  var befolkningMenn = Object.values(obj.getInfo(input)["Menn"]);
  var befolkningKvinner = Object.values(obj.getInfo(input)["Kvinner"]);
  var sisteMålingM = befolkningMenn.pop();
  var sisteMålingK = befolkningKvinner.pop();
  var total = sisteMålingM + sisteMålingK;
  return total;
}


function getUtdanEnhet(obj,skoleid){
  var kommuneNr = document.getElementById("kommuneNr").value;
  var element = document.getElementById("tableUtdanning");
  input = kommuneNr;
  obj.getInfo();
  var år = Object.keys(obj.getInfo(input)[skoleid]["Menn"]);
  var grunnskoleNivåM = Object.values(obj.getInfo(input)[skoleid]["Menn"]);
  var grunnskoleNivåK = Object.values(obj.getInfo(input)[skoleid]["Kvinner"]);
  var handler = {år,grunnskoleNivåK,grunnskoleNivåM,};
  return handler;
}


function makeHeader(id,text){
  var ele = document.getElementById(id);
  var div = document.createElement("Div");
  div.setAttribute("class","kommuneNavn");
  var h = document.createElement("h2");
  var t = document.createTextNode(text);
  h.appendChild(t);
  div.appendChild(h);
  ele.appendChild(div);
}
