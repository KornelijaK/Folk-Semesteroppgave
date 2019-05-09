
function displayData(liste,id,text){
  var ele = document.getElementById(id)
  var div = document.createElement("div");
  var lis = document.createElement("ul");
  var header = document.createElement("h2");
  var headerText = document.createTextNode(text);
  header.appendChild(headerText);
  div.appendChild(header);
  for(var i = 0;i<liste.length;i++){
    var text = document.createTextNode(liste[i]);
    var lisItem = document.createElement("li");
    lisItem.appendChild(text);
    lis.appendChild(lisItem)
  }
  div.appendChild(lis)
  ele.appendChild(div);
}


function totalBefolkninger(obj) {
    totalBefolknign = []
    var ids = obj.getIDs();    // Lagrer listen til variabler for å spare tid, slik at den ikke må lage lister omigjen.
    for(var i=0;i<ids.length;i++){
      var komuneINfo = obj.getInfo(ids[i])
      total = totalBefolkning2(komuneINfo)
      totalBefolknign.push(total)
  }
  return totalBefolknign;
}


function totalBefolkning2(obj) {
  var befolkningMenn = Object.values(obj["Menn"]);
  var befolkningKvinner = Object.values(obj["Kvinner"]);
  var sisteMålingM = befolkningMenn.pop();
  var sisteMålingK = befolkningKvinner.pop();
  var total = sisteMålingM + sisteMålingK;
  return total;
}
