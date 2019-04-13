
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

function getDetails(kommune,data) {
  var dataMenn = Object.entries(data[1][kommune]["Menn"]);
  var dataKvinner = Object.entries(data[1][kommune]["Kvinner"]);
  console.log(dataMenn)
  console.log(dataKvinner)
}


function displayData(liste){
  var ele = document.getElementsByClassName('oversikt')
  var lis = document.createElement("ul");
  for(var i = 0;i<liste.length;i++){
    var text = document.createTextNode(liste[i]);
    var lisItem = document.createElement("li");
    lisItem.appendChild(text);
    lis.appendChild(lisItem)

  }
  ele[0].appendChild(lis);
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
    for(var k = 0;k<idlist.length;k++){
      if(idlist[k] === input){
        var valgtKommune = komunelist[k];
        getDetails(valgtKommune,all)
    }}
  }
}


befolkning.onload = function() {
  // enableNavigationButtons();
  // removeLoadingMessage()
};

// ------------------------------Starter-----------------------------------

let konst;
window.onload = function() {
  konst = new Befolkning(url,input)
  konst.load()
}
function noe() {
  var komuneliste = konst.getNames()
  var idliste = konst.getIDs()
  konst.getInfo(idliste,komuneliste,input)
}
