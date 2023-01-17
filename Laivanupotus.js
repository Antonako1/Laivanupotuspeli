var laivanupotus = {};

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
    console.log(x,y)
}
// moikka