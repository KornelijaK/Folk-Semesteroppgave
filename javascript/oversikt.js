

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
    for(var i=0;i<obj.idsList.length;i++){
      input = obj.idsList[i]
      obj.getInfo()
      total = totalBefolkning(obj)
      totalBefolknign.push(total)
  }
  return totalBefolknign;
}
