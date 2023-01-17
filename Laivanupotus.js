var laivanupotus = {};
var omatLaivat =[];

laivanupotus.table = function(){
    var tArea = document.getElementById("tableArea");
    var teksti;
    var t = "";
    for(i=0; i<10; i++) {
        t += "<tr>";
        for(j=0; j<10; j++) {
            teksti = '<td> <button onclick="laivanupotus.painallus('+i+','+j+')"';
            teksti += "id="+i +"."+j+" class="+"button1"+"> "+i+","+j+" </button> </td>"; 
            t += teksti;
        }
        t += "</tr>";
    }
    tArea.innerHTML = t;
}

laivanupotus.painallus = function (x, y) {
    if(omatLaivat.length<=2){
        console.log(x,y);
        idNimi = String(x) + "." + String(y);
        console.log(idNimi)
        var nappiSijainti = document.getElementById(idNimi);
        nappiSijainti.classList.add("painettu");
        omatLaivat.push(Number(idNimi));
        console.log(omatLaivat);
    }else{
        document.getElementById("pelivaihe").innerHTML = "Pelivaihe: Upota vihollisen laivat."
        
    }
    
    
}   