function Texts() {
    
    var data = {
        
        "welcome": {
            "sv":"<h1>Välkommen till Göteborg den 5 - 8 maj 2016!</h1> \
<table>\
<tr><td rowspan='2'><div class='text'>\
Årsträffen hålls på Scandic Opalen mitt i Göteborg med:<br> \
&nbsp;&nbsp;&nbsp;● många möteslokaler och gott om samlingsytor<br> \
&nbsp;&nbsp;&nbsp;● stor lokal för årsmötet, stor restaurang för galamiddagen<br> \
&nbsp;&nbsp;&nbsp;● fri relaxavdelning även för de som bor på annat håll<br> \
&nbsp;&nbsp;&nbsp;● fri uppkoppling<br> \
På promenadavstånd ligger:<br> \
&nbsp;&nbsp;&nbsp;● Liseberg<br> \
&nbsp;&nbsp;&nbsp;● Universeum och Världskulturmuséet<br> \
&nbsp;&nbsp;&nbsp;● Avenyn, Götaplatsen, Konstmuséet, Konserthuset mm<br> \
<br><b>Kostnad</b><br> \
<table> \
<tr><td>Årsmötet, lördagen kl 13 - 16</td><td>ingen kostnad</td></tr> \
<tr><td>Årsträffen, inkl T-shirt och många av aktiviteterna</td><td>300 kr</td></tr> \
<tr><td>Galamiddagen (dryck tillkommer)</td><td>500 kr</td></tr> \
</table> \
<b>Allt räknas samman åt dig på anmälningssidan…<br> \
...om du först loggar in med ditt medlemsnummer!</b><div>\
</td>\
<td><img src='images/content/welcome1.png'></td></tr>\
<tr><td><img src='images/content/welcome2.png'></td></tr></table>",
            "en":"Mensa AG 2016",
            "de":"Mensa jahrestreffen 2016"
        },
        
        "about_AG": {
            "sv":"<h1>Mensa årsträff 2016</h1> \
<table> \
<tr><td><div class='text'> \
Mensa Väst, och den närsynte fiskmåsen Glenn, är glada att få hälsa alla mensaner, med eller utan sällskap, välkomna till <br>\
<br><b>Göteborg den 5 - 8 maj 2016!</b><br> \
<br>Själva årsmötet hålls lördagen den 6 maj kl 13 - 16 på Scandic Opalen.<br> \
<br> \
Hela träffen är förlagd till Scandic Opalen i centrala Göteborg och där har vi även bokat prisvärt boende som ska räcka till alla. \
Du hittar boende för alla plånböcker under fliken Boende. <br> \
<br><b>LOGGA IN med ditt medlemsnummer för hela programmet!</br>\
<div>\
</td>\
<td><img src='images/content/welcome2.png'></td></tr></table>",
            "en":"",
            "de":""
        }
        
        
        
    };
    
    // get the text
    this.get = function(id, lng) {

        var txt = undefined;
        var entry = data[id];
        if (entry!==undefined) { 
            txt = entry[lng];
            if (txt===undefined) txt = entry['sv'];
        }
        if (txt===undefined) txt = "["+id+"]["+lng+"]";
        return txt;

    };
    
    
}