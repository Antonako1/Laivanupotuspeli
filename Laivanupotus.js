var laivanupotus = {};
var omatLaivat = [];
var vihollisenLaivat = [];
var vihollisenValitsematAlueet = [];

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
    laivanupotus.vihollisenLaivat();
}

laivanupotus.painallus = function (x, y) {
    var tausta = document.getElementById("tausta");
    var idNimi = String(x) + "." + String(y);
    var text = "";
    var nappiSijainti = document.getElementById(idNimi);
    if(omatLaivat.length<=2){
        nappiSijainti.classList.add("painettu");
        omatLaivat.push(Number(idNimi));
        if(omatLaivat.length==3){
            document.getElementById("pelivaihe").innerHTML = "Pelivaihe: Upota vihollisen laivat."  
        }
        document.getElementById("osumaTilasto").innerHTML = "Osuit / Et osunut"
        text = "Sinun vuoro";
    }else{
        // upotusvaihe
        if(laivanupotus.findShipFromTable(idNimi)){
            document.getElementById("osumaTilasto").innerHTML = "Osuit"
            nappiSijainti.classList.add("osuma");
            text = "Vihollisen vuoro";
            tausta.classList.add("tausta2");
            setTimeout(laivanupotus.vihollinenPelaa(), 3000);
        }else{
            document.getElementById("osumaTilasto").innerHTML = "Et osunut"
            nappiSijainti.classList.add("ohi");
            text = "Vihollisen vuoro";
            tausta.classList.add("tausta2");
            setTimeout(laivanupotus.vihollinenPelaa(), 3000);
            }
    }
    document.getElementById("vuoro").innerHTML = text
    laivanupotus.countships();laivanupotus.peliloppu();
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
    //Vihollisen laivat
    var tAreaEnemy = document.getElementById("tableAreaEnemy");
    var tekstiEnemy;
    var tEnemy = "";
    for(h=0; h<10; h++) {
        tEnemy += "<tr>";
        for(g=0; g<10; g++) {
            tekstiEnemy = '<td> <button ';
            tekstiEnemy += "id="+h +"."+g+"00"+" class="+"button1"+"> "+h+","+g+" </button> </td>"; 
            tEnemy += tekstiEnemy;
        }
        tekstiEnemy += "</tr>";
    }

    tAreaEnemy.innerHTML = tEnemy;
    var vihollisenKordinaatit = Number();
    for(i=0;i<3;i++){
        var randomX = Number(Math.floor(Math.random() * 10));
        var randomY = Number(Math.floor(Math.random() * 10));
        vihollisenKordinaatit = String(randomX) + "." + String(randomY)
        if(vihollisenLaivat[i]!==vihollisenKordinaatit){
        vihollisenLaivat.push(vihollisenKordinaatit)
        console.log(vihollisenLaivat);
        }
    }
}

// laivanupotus.randomXY = function() {
//     var randomXT = Number(Math.floor(Math.random() * 9));
//     var randomYT = Number(Math.floor(Math.random() * 9));
//     vihollisenKordinaatitT = String(randomXT) + "." + String(randomYT) +"99";
//     return vihollisenKordinaatitT;
// }

laivanupotus.vihollinenPelaa = function () {
    var vihollisenKordinaatitT = Number();
    var randomXT = Number(Math.floor(Math.random() * 10));
    var randomYT = Number(Math.floor(Math.random() * 10));
    vihollisenKordinaatitT = String(randomXT) + "." + String(randomYT) +"00";
    console.log(vihollisenKordinaatitT)

    

    // var loopMeLikeHullu = true
    // while (laivanupotus.doesEnemyPickExist(laivanupotus.randomXY())) {
    //     console.log("loytyy jo")
    // }
    if(laivanupotus.doesEnemyPickExist(vihollisenKordinaatitT)){
        laivanupotus.vihollinenPelaa()
    }else{
    var idSijainti = document.getElementById(vihollisenKordinaatitT);
    idSijainti.classList.add("ohi");
    vihollisenValitsematAlueet.push(Number(vihollisenKordinaatitT));
    console.log(vihollisenValitsematAlueet)
    
    }
    // tausta1.classList.remove("tausta2");
    laivanupotus.countships();laivanupotus.peliloppu();
}

laivanupotus.peliloppu = function (){
    if(omatLaivat==0){
        alert("Hävisit, sinun laivat 0, Vihollisen laivat: " + vihollisenLaivat.length)
    }else if(vihollisenLaivat==0){
        alert("Voitit! Sinun laivat: " + omatLaivat.length + ", Vihollisen laivat 0")
    }
}
laivanupotus.findShipYourFromTable = function (idNimi){
    for(i=0;i<vihollisenLaivat.length;i++){
        if(idNimi == vihollisenLaivat[i]){
            vihollisenLaivat.splice([i],1);
            console.log(vihollisenLaivat)
            return true;
        }
    }
    return false
}

laivanupotus.doesEnemyPickExist = function (vihollisenKordinaatitT){
    for(i=0;i<vihollisenValitsematAlueet.length;i++){
        if(vihollisenKordinaatitT == vihollisenValitsematAlueet[i]){
            return true;
        }
    }
    return false
}