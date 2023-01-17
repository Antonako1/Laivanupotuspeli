var laivanupotus = {};
var omatLaivat = [];
var vihollisenLaivat = [];

laivanupotus.table = function(){
    //Pelaajan laivat
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

    //Vihollisen laivat
    var tAreaEnemy = document.getElementById("tableAreaEnemy");
    var tekstiEnemy;
    var tEnemy = "";
    for(h=0; h<10; h++) {
        tEnemy += "<tr>";
        for(g=0; g<10; g++) {
            tekstiEnemy = '<td> <button onclick="laivanupotus.painallus('+h+','+g+')"';
            tekstiEnemy += "id="+h +"."+g+" class="+"button1"+"> "+h+","+g+" </button> </td>"; 
            teksti += tekstiEnemy;
        }
        teksti += "</tr>";
    }
    tArea.innerHTML = t;

    laivanupotus.vihollisenLaivat();
}

laivanupotus.painallus = function (x, y) {
    var idNimi = String(x) + "." + String(y);
    var nappiSijainti = document.getElementById(idNimi);
    if(omatLaivat.length<=2){
        nappiSijainti.classList.add("painettu");
        omatLaivat.push(Number(idNimi));
        console.log(omatLaivat);
        if(omatLaivat.length==3){
            document.getElementById("pelivaihe").innerHTML = "Pelivaihe: Upota vihollisen laivat."  
        }
    }else{
        // upotusvaihe
        if(laivanupotus.findShipFromTable(idNimi)){
            document.getElementById("osumaTilasto").innerHTML = "Osuit"
            nappiSijainti.classList.add("osuma");

        }else{
            document.getElementById("osumaTilasto").innerHTML = "Et osunut"
            nappiSijainti.classList.add("ohi");
        }
    
    }
    laivanupotus.countships();
}   
laivanupotus.countships = function () {
    document.getElementById("shipcount").innerHTML = "Sinulla laivoja: " + omatLaivat.length + ". Vihollisella laivoja: "+ vihollisenLaivat.length+"."
}
laivanupotus.findShipFromTable = function (idNimi){
    for(i=0;i<vihollisenLaivat.length;i++){
        if(idNimi == vihollisenLaivat[i]){
            vihollisenLaivat.splice([i],1);
            console.log(vihollisenLaivat)
            return true;
        }
    }
    return false
}

laivanupotus.vihollisenLaivat = function() {
    var vihollisenKordinaatit = Number();
    for(i=0;i<3;i++){
        var randomX = Number(Math.floor(Math.random() * 9));
        var randomY = Number(Math.floor(Math.random() * 9));
        vihollisenKordinaatit = String(randomX) + "." + String(randomY)
        vihollisenLaivat.push(vihollisenKordinaatit)
        console.log(vihollisenLaivat);
    }
}