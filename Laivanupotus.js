var laivanupotus = {}; //laivanUpotus oliojuttu
var omatLaivat = []; //Pelaajan omat laivat listalla
var vihollisenLaivat = []; //Vihollisen laivat listalla
var vihollisenValitsematAlueet = []; //Vihollisen valitsemat alueet
var omatLaivatNonArray = 0; // Pitää omien laivojen määrän tallessa
var vihollisenVuoro = false; // Pitää muistissa kenen vuoro pelikentällä on

//Luo pelialueen, ja napeille omat koordinaatit
laivanupotus.table = function(){
    // Tekee aloitus napista näkymättömän
    document.getElementById("startButton").classList.add("invisible")
    // Tekee pelikentän
    var tArea = document.getElementById("tableArea");
    var teksti;
    var t = "";
    for(i=0; i<10; i++) { //Luo Table row alotuksen ja päätteen
        t += "<tr>";
        for(j=0; j<10; j++) { //Luo Table Datan rowien sisälle.
            // Datasolun sisällä on nappi, jonka painallus lähettää painallus() funktiolle napin sijainnin i ja j avulla.
            teksti = '<td> <button onclick="laivanupotus.painallus('+i+','+j+')"'; 
            // Samaa taktiikkaa käytetään luodessa uniikki id ja nimi
            teksti += "id="+i +"."+j+" class="+"button1"+"> "+i+","+j+" </button> </td>"; 
            // t muuttujalle annetaan arvo: t + teksti, jotta taulukko voidaan kirjata
            t += teksti;
        }
        t += "</tr>";
    }
    // HTML:ään kirjataan t, eli koko taulukko
    tArea.innerHTML = t;

    // Jonka jälkeen kutsutaan vihollisen pelialustan tekemää funktiota
    laivanupotus.vihollisenLaivat();
}

///Oman napin painalluksella tuleva funktio
/// entisen funktion arvot i ja j otetaan vastaan kordinaattina x ja y
laivanupotus.painallus = function (x, y) {
    /// X:stä ja Y:stä yhdistetään muuttujat String muotoon
    var idNimi = String(x) + "." + String(y);
    ///Alustetaan muuttuja text, ja nappienSijainti otetaan valmiiksi
    var text = "";
    var nappiSijainti = document.getElementById(idNimi);
    
    /// Ekat 3 laivaa erilliselle listalle ja värit siniseksi
    /// Jos vihollisen vuoro on false, niinkuin se defaulttina on, laita if-lause kiertämään
    if(vihollisenVuoro == false){
        // Ottaa ensimmäiset 3 napinklikkausta omaksi laivaksi
        if(omatLaivat.length<=2){
            // Jos jo klikattu ruutu on rekisteröitynä omana laivana...
            if(laivanupotus.findYorShipFromArray(idNimi) == true){
                // ...alerttaa että se on jo valittu
                alert("Olet jo valinnut tämän laivan!")
            // Jos ei ole rekisteröitynä
            }else{
                // Muuttaa napinvärin
                nappiSijainti.classList.add("painettu");
                // Lisää muisti variableen että yksi laiva lisätty
                omatLaivatNonArray++;
                // Työnnä omatLaivat listaan idNimen mukana tulevat x,y kordinaatit
                omatLaivat.push(Number(idNimi));

                // Seuraavat 5 päivittää pelitilanteen heti reaaliaikaan
                if(omatLaivat.length==3){   
                    document.getElementById("pelivaihe").innerHTML = "Pelivaihe: Upota vihollisen laivat."  
                }
                document.getElementById("osumaTilasto").innerHTML = "Osuit / Et osunut"
                text = "Sijoita laivat (Yht. 3kpl)";
            }

            //Jos yli kolme laivaa if-lause siirtyy elseen ja alkaa upotusvaihe
        }else{
            /// Osuma
            /// Jos annetut x ja y kordinaatit matchaa johonkin vihollisen laiva kordinaatteihin:
            if(laivanupotus.findShipFromTable(idNimi)){
                document.getElementById("osumaTilasto").innerHTML = "Osuit" // Pelitilanteen päivitys
                nappiSijainti.classList.add("osuma"); // Muuttaa värin 
                text = "Vihollisen vuoro"; // Pelitilanteen päivitys

            /// Jos ei osunut / ohi
            }else{
                document.getElementById("osumaTilasto").innerHTML = "Et osunut" // Pelitilanteen päivitys
                nappiSijainti.classList.add("ohi"); // Väripäivitys
                text = "Vihollisen vuoro"; // Pelitilanteen päivitys
                }
                laivanupotus.peliloppu(); // varmistaa loppuiko peli
                
                vihollisenVuoro = true; /// Vihollisen vuorosta tulee true, nykyinen funktio tulee>
                setTimeout(() => {      /// käyttökelvottomaksi 750 millisekunniksi
                    laivanupotus.vihollinenPelaa();
                }, 750);
        }
        laivanupotus.countships(); // Pelitilanteen päivitys x2
        document.getElementById("vuoro").innerHTML = text;
    }
}   

// Laskee laivojen määrän HTML:ään
laivanupotus.countships = function () {
    document.getElementById("shipcount").innerHTML = "Sinulla laivoja: " + omatLaivatNonArray +" / "+ omatLaivat + ". Vihollisella laivoja: "+ vihollisenLaivat.length+"."
}
// Katsoo osuitko vihollisen laivaan
laivanupotus.findShipFromTable = function (idNimi){
    for(i=0;i<vihollisenLaivat.length;i++){
        if(idNimi == vihollisenLaivat[i]){ // Jos idNimen mukana tulleet omat x,y kordinaatit sopii johonkin vihollisen
            vihollisenLaivat.splice([i],1);// kordinaattiin se splicetaan ja palautetaan true
            return true;
        }
    }
    laivanupotus.countships(); // Päivitys
    return false
}

// Katsoo onko laiva jo klikattu sinulle
laivanupotus.findYorShipFromArray = function (idNimi){
    for(i=0;i<omatLaivat.length;i++){
        if(idNimi == omatLaivat[i]){ // Katsoo jos aluetta on jo painettu
            return true;
        }
    }
    return false;
}

// Vihollisen valitsemat 3 laivaa pelin alkuun, ja vihollisen peliruutu
laivanupotus.vihollisenLaivat = function() {

    //Vihollisen laivat. Sama periaate kuin omissa laivoissa >
    var tAreaEnemy = document.getElementById("tableAreaEnemy");
    var tekstiEnemy;
    var tEnemy = "";
    for(h=0; h<10; h++) {
        tEnemy += "<tr>";
        for(g=0; g<10; g++) {
            tekstiEnemy = '<td> <button '; // <Ilman onclick eventtiä, koska sitä ei tarvita
            tekstiEnemy += "id="+h +"."+g+"00"+" class="+"button1"+"> "+h+","+g+" </button> </td>"; 
            tEnemy += tekstiEnemy;
        }
        tekstiEnemy += "</tr>";
    }
    tAreaEnemy.innerHTML = tEnemy;

    // Alustetaan vihollisenKordinaatit
    var vihollisenKordinaatit;
    for(i=0;i<3;i++){ // Looppaa 3.
        var randomX = Number(Math.floor(Math.random() * 10)); // Jokaisella kerralla luo satunnaisen >
        var randomY = Number(Math.floor(Math.random() * 10)); // < X ja Y kordinaatin >
        vihollisenKordinaatit = String(randomX) + "." + String(randomY) // < Jotka yhdistetään Stringinä vihollisenKordinaatit;
        if(vihollisenLaivat[i]!==vihollisenKordinaatit){ // Jos laivaa ei ole valittu entuudestaan, se pushataan
        vihollisenLaivat.push(vihollisenKordinaatit)
        }
    }
}

// Vihollisen pelivuoro, ottaa random koordinaatin
laivanupotus.vihollinenPelaa = function () {
    var vihollisenKordinaatitT = Number();
    var randomXT = Number(Math.floor(Math.random() * 10)); // Luo joka kerta satunnaisen
    var randomYT = Number(Math.floor(Math.random() * 10)); // X ja Y kordinaatin
    // Luo niistä yhtänäisen kordinaatin, ja lisää loppuun 00, erottamaan se pelaajan kordinaateista
    vihollisenKordinaatitT = String(randomXT) + "." + String(randomYT) +"00"; 

    // Varmistaa että kordinaatti valintaa ei ole ennen tehty
    if (laivanupotus.doesEnemyPickExist(vihollisenKordinaatitT)){
        laivanupotus.vihollinenPelaa() // Jos on funktio aloitetaan alusta niin kauan kunnes uusi kordinaatti on luotu
    }else{
        var idSijainti = document.getElementById(vihollisenKordinaatitT); // Alustaa vihollisen idSijainnin
        vihollisenValitsematAlueet.push(Number(vihollisenKordinaatitT)); // Työntää
            if(laivanupotus.findShipYourFromTable(vihollisenKordinaatitT)){ // Katsoo osuiko vihollisen pelaajan laivaan
                document.getElementById("osumaTilasto").innerHTML = "Osuit" // Päivite x3
                idSijainti.classList.add("osuma");
                text = "Sinun vuoro";
            }else{ // Jos ei osunut
                document.getElementById("osumaTilasto").innerHTML = "Et osunut" // Päivittää infon x3
                idSijainti.classList.add("ohi");
                text = "Sinun vuoro";
                }
            document.getElementById("vuoro").innerHTML = text;
            laivanupotus.countships(); // Laske laivat
            laivanupotus.peliloppu();  // Katso loppuiko peli

            vihollisenVuoro = false; // Lopettaa vihollisen vuoron
    }           
}

// Katsoo loppuiko peli
laivanupotus.peliloppu = function (){
    if(laivanupotus.checkStrings()){ // Katsoo onko listassa vain Stringejä, jos on:
        alert("Hävisit. Sinun laivat 0, Vihollisen laivat: " + vihollisenLaivat.length) // Häviämisilmoitus
        document.getElementById("restartButton").classList.remove("invisible") // Entuudestaan näkymätön nappi
        document.getElementById("restartButton").classList.add("visible")      // Tulee näkyväksi
    }else if(vihollisenLaivat.length<=0){ // Sama, mutta katsoo vain vihollisen laivalistan pituuden
        alert("Voitit! Sinun laivat: " + omatLaivat.length + ", Vihollisen laivat 0")
        document.getElementById("restartButton").classList.remove("invisible")
        document.getElementById("restartButton").classList.add("visible")
    }
}

// Jos lista oma lista sisältää pelkkiä stringejä, palauttaa true
laivanupotus.checkStrings = function () {
    if (typeof omatLaivat[0] == "string" && typeof omatLaivat[1] == "string" && typeof omatLaivat[2] == "string"){
        return true
    } else {
        return false
    }
}
// Katsoo osuiko vihollinen laivaasi, jos osui palauttaa truen, jos ei palauttaa falsen
laivanupotus.findShipYourFromTable = function (vihollisenKordinaatitT){ // Ottaa vastaan vihollisen luomat xy kordinaatit
    var vihollisenKordinaatitTJaettu = Number();
    vihollisenKordinaatitTJaettu = Math.round(vihollisenKordinaatitT * 10) / 10 //Pyöristää 00 numeron lopusta pois
    for(i=0;i<omatLaivat.length;i++){
        if(vihollisenKordinaatitTJaettu == omatLaivat[i]){
            omatLaivat.splice([i],1,String("upposi")); // splicaa Numero(X,Y) kordinaatin stringiksi
            omatLaivatNonArray--; // Vähentää omien laivojen määrää
            return true;          // Ja palauttaa Truen;
        }
    }
    laivanupotus.countships(); // Laskee laivat
    return false
}
//Katsoo onko vihollinen ennen valinnut jo saman ruudun
laivanupotus.doesEnemyPickExist = function (vihollisenKordinaatitT){ // Ottaa vastaan vihollisen luomat xy kordinaatit
    for(i=0;i<vihollisenValitsematAlueet.length;i++){
        if(vihollisenKordinaatitT == vihollisenValitsematAlueet[i]){ // Jos sama palauttaa truen
            return true;
        }
    }
    return false
}
laivanupotus.restartGame = function () { // Pelin restarttaus funktio
    location.reload()
}