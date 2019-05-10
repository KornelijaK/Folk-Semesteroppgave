


function lagliste(parentID,innholdLis){
  console.log(innholdLis);
  var ele = document.getElementById(parentID);
  console.log(ele);
  var list = document.createElement("ul");
  for (var i = 0; i < innholdLis.length; i++){
    var li = document.createElement("li");
    var text = document.createTextNode(innholdLis[i]);
    li.appendChild(text);
    list.appendChild(li);
  }
  ele.appendChild(list);
}


//Lager informasjons listen
function infoDetaljer(input){
  lagKonteiner("info","infoInhold","vis");
  var befInfoObj = bef.getInfo(input);
  var kommuneNavn = "Kommunenavn: "+getValgtKommune(syss,input);
  var idNummer = "KommuneId: "+input;
  var syssMåling = "Siste sysselmåling: "+getSisteSyssel(syss);
  var utdanMåling = "Siste målte høyere utdanning: "+(getHøyereUtdannning(utdan));
  var befolkningMåling ="Siste befolkningmåling: "+totalBefolkning(befInfoObj);
  var innhold = [kommuneNavn,idNummer,syssMåling,utdanMåling,befolkningMåling]
  lagliste("infoInhold",innhold);
}


function tabellDetaljer(obj,id,idnavn,headernavn) {
  var kategori = ["År","Kvinner","Menn","Begge Kjønn"];
  var ele = document.getElementById(id);
  lagKonteiner(id,idnavn,"tabell");
  var kommune1 = document.getElementById("kommuneNr").value;
  input = kommune1;
  var år = Object.keys(obj.getInfo(input)["Menn"]);
  var dataMenn = Object.values(obj.getInfo(input)["Menn"]);
  var dataKvinner = Object.values(obj.getInfo(input)["Kvinner"]);
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


function getHøyereUtdannning(obj){
  var kortUtdaningMenn = Object.values(obj.getInfo(input)["03a"]["Menn"]);
  var kortUtdaningKvinner = Object.values(obj.getInfo(input)["03a"]["Kvinner"]);
  var langUtdaningMenn = Object.values(obj.getInfo(input)["04a"]["Menn"]);
  var langUtdaningKvinner = Object.values(obj.getInfo(input)["04a"]["Kvinner"]);
  var sisteMåling = kortUtdaningMenn.pop();
  var sisteMålingK = kortUtdaningKvinner.pop();
  var sisteMålingL = langUtdaningMenn.pop();
  var sisteMålingKL = langUtdaningKvinner.pop();
  var totalUtdanningProsent = Number(sisteMåling + sisteMålingK + sisteMålingL + sisteMålingKL);
  //runder opp med en desimal
  totalUtdanningProsent =Math.round(totalUtdanningProsent*10)/10;
  return totalUtdanningProsent+"%";
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


function tabellUtdan(obj){
  var titler = ["År","Kvinner","Menn"];
  var skoleNavn = ["Grunnskolenivå (%)","Vidergående skole-nivå (%)","Fagskole nivå (%)","Universitets- og høgskolenivå kort (%)",
  "Universitets- og høgskolenivå lang (%)","Uoppgitt eller ingen fullført utdanning (%)"
  ];
  var skoleID = ["01","02a","11","03a","04a","09a"];
  var ele = document.getElementById('utdan');
  for (var i = 0; i < skoleID.length; i++) {
    var utdanData = getUtdanEnhet(obj,skoleID[i]);
    var skoleInndeling = document.createElement("div");
    skoleInndeling.setAttribute("id","skole"+i);
    skoleInndeling.setAttribute("class","sammenhh");
    var container = document.createElement("div");
    container.setAttribute("class","tabell");
    container.setAttribute("id","contain"+i);
    skoleInndeling.appendChild(container);
    ele.appendChild(skoleInndeling);
    var lister = Object.values(utdanData);
    makeHeader("skole"+i,skoleNavn[i]);
    for(var j = 0; j < titler.length; j++){
      makeFlexbox("contain"+i,lister[j],titler[j]);
    }
  }
}


function getUtdanEnhet(obj,skoleid){
  var kommuneNr = document.getElementById("kommuneNr").value;
  var element = document.getElementById("tableUtdanning");
  input = kommuneNr;
  var år = Object.keys(obj.getInfo(input)[skoleid]["Menn"]);
  var utdannNivåM = Object.values(obj.getInfo(input)[skoleid]["Menn"]);
  var utdannNivåK = Object.values(obj.getInfo(input)[skoleid]["Kvinner"]);
  var lister = {år,utdannNivåK,utdannNivåM,};
  return lister;
}
