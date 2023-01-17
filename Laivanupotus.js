var laivanupotus = {}; //LaivanUpotus muuttuja
var omatLaivat = []; //Pelaajan omat laivat listalla
var vihollisenLaivat = []; //Vihollisen laivat listalla
var vihollisenValitsematAlueet = []; //Vihollisen valitsemat alueet

//Luo pelialueen, ja napeille omat koordinaatit
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

//Painalluksella tapahtuva funktio
laivanupotus.painallus = function (x, y) {
    var tausta = document.getElementById("tausta");
    var idNimi = String(x) + "." + String(y);
    var text = "";
    var nappiSijainti = document.getElementById(idNimi);
    //Ekat 3 laivaa erilliselle listalle ja värit siniseksi
    if(omatLaivat.length<=2){
        nappiSijainti.classList.add("painettu");
        omatLaivat.push(Number(idNimi));
        if(omatLaivat.length==3){
            document.getElementById("pelivaihe").innerHTML = "Pelivaihe: Upota vihollisen laivat."  
        }
        document.getElementById("osumaTilasto").innerHTML = "Osuit / Et osunut"
        text = "Sinun vuoro";
        //Jos yli kolme laivaa if-lause siirtyy elseen ja alkaa upotusvaihe
    }else{

        // Osuma
        if(laivanupotus.findShipFromTable(idNimi)){
            document.getElementById("osumaTilasto").innerHTML = "Osuit"
            nappiSijainti.classList.add("osuma");
            text = "Vihollisen vuoro";
            tausta.classList.add("tausta2");
            //Ohi
        }else{
            document.getElementById("osumaTilasto").innerHTML = "Et osunut"
            nappiSijainti.classList.add("ohi");
            text = "Vihollisen vuoro";
            tausta.classList.add("tausta2");
            }
            laivanupotus.peliloppu();
    }
    laivanupotus.countships();
    document.getElementById("vuoro").innerHTML = text
}   

//Laskee laivojen määrän HTML:ään
laivanupotus.countships = function () {
    document.getElementById("shipcount").innerHTML = "Sinulla laivoja: " + omatLaivat.length +" / "+ omatLaivat + ". Vihollisella laivoja: "+ vihollisenLaivat.length+"."
}

//Katsoo osuitko vihollisen laivaan
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

//Vihollisen valitsemat 3 laivaa pelin alkuun, ja vihollisen peliruutu
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

//Vihollisen pelivuoro, ottaa random koordinaatin
laivanupotus.vihollinenPelaa = function () {
    var tausta = document.getElementById("tausta");
    var vihollisenKordinaatitT = Number();
    var randomXT = Number(Math.floor(Math.random() * 10));
    var randomYT = Number(Math.floor(Math.random() * 10));
    vihollisenKordinaatitT = String(randomXT) + "." + String(randomYT) +"00";
    if (laivanupotus.doesEnemyPickExist(vihollisenKordinaatitT)){
        laivanupotus.vihollinenPelaa()
    }else{
        var idSijainti = document.getElementById(vihollisenKordinaatitT);   

        vihollisenValitsematAlueet.push(Number(vihollisenKordinaatitT));
    -   idSijainti.classList.add("ohi");
    -   console.log(vihollisenValitsematAlueet)
        //     if(laivanupotus.findShipYourFromTable(vihollisenKordinaatitT)){
        //         document.getElementById("osumaTilasto").innerHTML = "Osuit"
        //         idSijainti.classList.add("osuma");
        //         text = "Sinun vuoro";
        //         tausta.classList.remove("tausta2");
        //         //Ohi
        //     }else{
        //         document.getElementById("osumaTilasto").innerHTML = "Et osunut"
        //         idSijainti.classList.add("ohi");
        //         text = "Sinun vuoro";
        //         tausta.classList.remove("tausta2");
        //         }
        //     document.getElementById("vuoro").innerHTML = text
    }
    // tausta1.classList.remove("tausta2");
    laivanupotus.countships();laivanupotus.peliloppu();
}

// katsoo loppuiko peli
laivanupotus.peliloppu = function (){
    if(omatLaivat==0){
        alert("Hävisit, sinun laivat 0, Vihollisen laivat: " + vihollisenLaivat.length)
    }else if(vihollisenLaivat==0){
        alert("Voitit! Sinun laivat: " + omatLaivat.length + ", Vihollisen laivat 0")
    }
}

//Katsoo osuiko vihollinen laivaasi, jos osui palauttaa truen, jos ei palauttaa falsen
laivanupotus.findShipYourFromTable = function (vihollisenKordinaatitT){
    for(i=0;i<omatLaivat.length;i++){
        var vihollisenKordinaatitTJaettu = vihollisenKordinaatitT 
        if(vihollisenKordinaatitTJaettu == omatLaivat[i]){
            omatLaivat.splice([i],1);
            console.log(omatLaivat)
            return true;
        }
    }
    return false
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

//Katsoo onko vihollinen ennen valinnut jo saman ruudun
laivanupotus.doesEnemyPickExist = function (vihollisenKordinaatitT){
    for(i=0;i<vihollisenValitsematAlueet.length;i++){
        if(vihollisenKordinaatitT == vihollisenValitsematAlueet[i]){
            return true;
        }
    }
    return false
}