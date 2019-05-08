

function displayData(liste,clas,text){
  var ele = document.getElementsByClassName(clas)[0]
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
    var idslist = obj.getIDs()
    // Lager denne i en variabel for å spare tid ,og ikke trenger lage ny liste hver gang.
    for(var i =0;i<idslist.length;i++){
      input = obj.getIDs()[i]
      totalBefolknign.push(totalBefolkning(obj))
  }
  return totalBefolknign;
}
