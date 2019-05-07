

function sysselSettingBegge(obj){
  var kategori = ["År","Kvinner","Vekst","Menn","Vekst"]
  var kommune1 = document.getElementById("i1").value;
  var kommune2 = document.getElementById("i2").value;
  input = kommune1;
  obj.getInfo(input)
  var navn = getName(obj,input);



  var år = Object.keys(obj.getInfo(input)["Menn"])
  // var år = Object.keys(obj.informasjon["Menn"])
  var sysselMenn = Object.values(obj.informasjon["Menn"])
  var sysselKvinner = Object.values(obj.informasjon["Kvinner"])
  var vekstMenn = prosentPoeng(sysselMenn);
  var vekstKvinner = prosentPoeng(sysselKvinner);
  input = kommune2;
  syss.getInfo()
  var navn2 = getName(obj,input);
  var sysselMenn2 = Object.values(obj.informasjon["Menn"])
  var sysselKvinner2 = Object.values(obj.informasjon["Kvinner"])
  var vekstMenn2 = prosentPoeng(sysselMenn2);
  var vekstKvinner2 = prosentPoeng(sysselKvinner2);

  makeHeader("kom1",navn)
  makeFlexbox("tab1",år,"År")
  makeFlexbox("tab1",sysselKvinner,"Kvinner")
  makeFlexboxProsent("tab1",vekstKvinner,vekstKvinner2,"Vekst")
  makeFlexbox("tab1",sysselMenn,"Menn")
  makeFlexboxProsent("tab1",vekstMenn,vekstMenn2,"Vekst")

  makeHeader("kom2",navn2)
  makeFlexbox("tab2",år,"År")
  makeFlexbox("tab2",sysselKvinner2,"Kvinner")
  makeFlexboxProsent("tab2",vekstKvinner2,vekstKvinner,"Vekst")
  makeFlexbox("tab2",sysselMenn2,"Menn")
  makeFlexboxProsent("tab2",vekstMenn2,vekstMenn,"Vekst")

}

  function makeFlexboxProsent(id1,liste1,liste2,titel){
    var utdann = document.getElementById(id1);
    var row = document.createElement("ul");
    row.setAttribute("class","row");
    var cell = document.createElement("li");
    cell.setAttribute("class","kategori");
    var t = document.createTextNode(titel)
    cell.appendChild(t);
    row.appendChild(cell);
      for (var j = 0; j < liste1.length; j++) {
        var t = document.createTextNode(liste1[j])
        var cell = document.createElement("li");
        cell.appendChild(t);
      if(liste1[j]<0 && liste2[j]<0 ){
          if(liste1[j]>liste2[j]){
            cell.setAttribute("class","cellHøgestP")
          }
          else {
            cell.setAttribute("class","cell");
          }
        }
        else if(liste1[j]>liste2[j]){
          cell.setAttribute("class","cellHøgestP")
        }
        else {
          cell.setAttribute("class","cell");
        }

        row.appendChild(cell);
        }
        utdann.appendChild(row)
      }


function prosentPoeng(liste){
  var prosentPoeng = []
  var sistPoeng = 0;
  var økning = 0;
  for(var i =0;i<liste.length;i++){
    var nyPoeng = liste[i];
    if(sistPoeng === 0){
      prosentPoeng.push(økning);
    }
    else {
      økning = nyPoeng-sistPoeng;
      økning = Math.round(økning*10)/10;
      prosentPoeng.push(økning)
    }
    sistPoeng = nyPoeng
  }
  return prosentPoeng;
}
