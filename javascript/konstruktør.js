
// ------------------------ Egenskap Funksjoner-----------------

function getData(url,obj) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200 ) {
      var jtext = JSON.parse(xhr.responseText);
      obj.data = jtext;
      if(!(obj.onload === null)){
        obj.onload()
      }
      datasetReady.push("1");
      return obj.data;
    }
  }
  xhr.send(null);
}


function getNames() {
  return  Object.keys(this.data["elementer"]);
}


function getIDs(){
  var idList = []
  var list = Object.values(this.data["elementer"])
  for(var i = 0;i<list.length;i++){
    var id = list[i]["kommunenummer"];
    idList.push(id)
  }
   return idList;
}


function getInfo(input){
    var valgt = getValgtKommune(this,input);
    var valgtInfo = this.data["elementer"][valgt];
    return valgtInfo;
}


// ----------------------------------------------


function Konstruktør(url) {
  this.data = undefined;
  this.onload = null;
  this.load = function() {return getData(url,this)};
  this.getNames =  getNames;
  this.getIDs = getIDs;
  this.getInfo =  getInfo;
}
