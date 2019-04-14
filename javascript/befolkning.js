
var url = "http://wildboy.uib.no/~tpe056/folk/104857.json"
var input = "0101"

// ------------------------------HjelpeFunksjoner------------------------

function getData(url,obj) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200 ) {
      var jtext = JSON.parse(xhr.responseText);
      obj.data = jtext;
    }
  }
  xhr.send(null);
}

function getMostResentTotal(liste){
  total = 0;
  for(var i=0;i<liste.length;i++){
    var tall = liste[i][1];

    total = tall;

  }

  return total;

}

function getDetails(kommune,data) {
  // Gør dette på din Getinfo
  var dataMenn = Object.entries(data[1][kommune]["Menn"]);
  console.log(dataMenn);
  var dataKvinner = Object.entries(data[1][kommune]["Kvinner"]);
  var totalMenn =getMostResentTotal(dataMenn);
  var totalKvinner = getMostResentTotal(dataKvinner);
  var totalBefolkning = totalKvinner+totalMenn;
  return totalBefolkning;
}


// ------------------------------ Main ----------------------

function Befolkning(url) {
  this.data = undefined;
  this.load = function() {getData(url,this)};
  this.getNames = function(){
     all = Object.values(this.data);
     // kankje ikke br adet der, å lage den globalt
    var komuner = Object.keys(all[1]);
    return komuner
  }
  this.getIDs = function() {
    var idList = []
    for(var i =0;i<all.length;i++){
      var kom = all[i]
      var test = Object.values(kom)
      for(var j =0;j<test.length;j++){
        var info = test[j];
        var close = Object.values(info);
        var id = close[0];
        idList.push(id);
      }
    }
    idList.shift()
    idList.shift()
    return idList;
  }

  this.getInfo = function(idlist,komunelist,input){
    var totalMenn = []
    for(var k = 0;k<idlist.length;k++){
      if(idlist[k] === input){
        var valgtKommune = komunelist[k];
        // totalMenn.push(getDetails(valgtKommune,all));
        return getDetails(valgtKommune,all);
    }
  }
  }
  // console.log(totalMenn);
}


// ------------------------------Starter-----------------------------------

// let konst;
// window.onload = function() {
//   console.log("lager befokning");
//   konst = new Befolkning(url,input)
//   konst.load()
// }
