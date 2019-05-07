

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


// -------- her er vi..nå skal vi rette opp noe getinfo her-----

function totalBefolkninger(obj) {
    totalBefolknign = []
    for(var i=0;i<obj.getIDs().length;i++){
      console.log(obj.getIDs()[i]);

      input = obj.getIDs()[i]
      console.log(input);



      obj.getInfo()


      total = totalBefolkning(obj)
      totalBefolknign.push(total)
  }
  return totalBefolknign;
}
