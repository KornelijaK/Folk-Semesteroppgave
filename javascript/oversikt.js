
function displayData(liste,id,text){
  var ele = document.getElementById(id);
  var div = document.createElement("div");
  var ul = document.createElement("ul");
  var header = document.createElement("h2");
  header.setAttribute("class","header");
  var headerText = document.createTextNode(text);
  header.appendChild(headerText);
  div.appendChild(header);
  for(var i = 0;i<liste.length;i++){
    var text = document.createTextNode(liste[i]);
    var lisItem = document.createElement("li");
    lisItem.appendChild(text);
    ul.appendChild(lisItem);
  }
  div.appendChild(ul);
  ele.appendChild(div);
}


function alleTotalBef(obj) {
    alleTotaler = [];
    var ids = obj.getIDs();    // Lagrer listen til variabler for å spare tid, slik at den ikke må lage lister omigjen.
    for(var i=0;i<ids.length;i++){
      var kommuneInfo = obj.getInfo(ids[i]);
      total = totalBefolkning(kommuneInfo);
      alleTotaler.push(total);
  }
  return alleTotaler;
}
