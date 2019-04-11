
var url = "http://wildboy.uib.no/~tpe056/folk/104857.json"

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

  this.getinfo = function() {

  }
  }


function Befolkning(url) {
  this.data = undefined;
  this.load = function() {getData(url,this)};
  var komuner = Object.keys(all[1]);
  this.getNames = function(){
    var all = Object.values(this.data);
    for(var i =0;i<all.length;i++)
    var kom = all[i]
    var kommuneNavn =

    // var present= ""
    console.log(kom);

    komuner.sort()
    // displayData(komuner);

  }
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

function assign(obj) {
  console.log(obj.getNames)
}

let konst;

window.onload = function() {
  konst = new Befolkning(url)
  konst.load()

}
