function getJsonUsers() {
return [
{"id":"user","password":"","email":"toel@toel.se","gender": "-1", "admin":false},
{"id":"admin","password":"","email":"toel@toel.se","gender": "-1", "admin":true}
];
};

function getJsonText() {
return [
{"id":"test","en":"Test","sv":"Test"},
{"id":"welcome","en":"Hello!","sv":"<h1>Hej och v&auml;lkomna till mensa &aring;rstr&auml;ff 2016</h1>"},
{"id":"members_welcome","en":"Hello!","sv":"Information till våra medlemmar"},
{"id":"notImplementedYet","en":"This page is not implemented yet!","sv":"Den här sida finns inte ännu. Vill du hjälpa till med den sidan? Hör gärna av dig till Toël."}
];
};

function getJsonRooms() {
return [
  {"id":"ekonomi plus", "count":10, "description":"Enkelrum med en 140 cm säng", "Ps":2, "1P+": 275, "1N1P": 650, "1N2P": 750, "3N2P": 2426},
  {"id":"standard", "count":35, "description":"Dubbelrum med två sängar", "Ps":2, "1P+": 200, "1N1P": 800, "1N2P": 900, "3N2P": 2651},
  {"id":"family", "count":50, "description":"Trebäddsrum", "Ps":3, "1P+": 200, "1N1P": 800, "1N2P": 900, "1N3P": 1100, "3N3P": 2651},
  {"id":"superior", "count":5, "description":"Superior rum med 2x90 cm sängar samt en 140 cm bäddsoffa", "Ps":4, "1P+": 450, "1N1P": 1350, "1N2P": 1450, "1N3P": 1650, "1N4P": 1850, "3N4P": 2951}
];
};

function getJsonHotelEvents() {
return [
  {"id":"N0504", "date":"2016-05-04", "type":"room", "label":"Natt onsdag-tordag"},
  {"id":"B0504", "date":"2016-05-04", "type":"food", "label":"Frukost"},
  {"id":"S0504", "date":"2016-05-04", "type":"food", "label":"Middag"},
  {"id":"N0505", "date":"2016-05-05", "type":"room", "label":"Natt tordag-fredag"},
  {"id":"B0505", "date":"2016-05-05", "type":"food", "label":"Frukost"},
  {"id":"L0505", "date":"2016-05-05", "type":"food", "label":"Lunch"},
  {"id":"S0505", "date":"2016-05-05", "type":"food", "label":"Middag"},
  {"id":"N0506", "date":"2016-05-06", "type":"room", "label":"Natt fredag-lördag"},
  {"id":"B0506", "date":"2016-05-06", "type":"food", "label":"Frukost"},
  {"id":"L0505", "date":"2016-05-06", "type":"food", "label":"Lunch"},
  {"id":"S0506", "date":"2016-05-06", "type":"food", "label":"Galamiddag"},
  {"id":"N0507", "date":"2016-05-07", "type":"room", "label":"Natt lördag-söndag"},
  {"id":"B0507", "date":"2016-05-07", "type":"food", "label":"Frukost"},
  {"id":"L0507", "date":"2016-05-07", "type":"food", "label":"Take away påse"}
];
};


/**

http://www.scandichotels.se/Hotels/Sverige/Goteborg/Scandic-Opalen/?hotelpage=rooms&roomid=16669

  Paketpris: Boende med matpaket och gala middag:
  -----------------------------------------------
  10 st enkelrum med en 140 cm säng Paketpris 2426 SEK/person (om man är två personer på rummet) Enkelrumstillägg 275 SEK/natt Extranatt från onsdag-torsdag 650 SEK för en person Extranatt från onsdag-torsdag 750 SEK för två personer

  35 standard dubbelrum och 50 standard trebäddsrum Paketpris 2651 SEK/person (om man är två-tre personer på rummet) Enkelrumstillägg 200 SEK/natt Extranatt från onsdag-torsdag 800 SEK för en person Extranatt från onsdag-torsdag 900 SEK för två personer Extranatt från onsdag-torsdag 1100 SEK för tre personer

  5 superior rum med 2x90 cm sängar samt en 140 cm bäddsoffa, 1-4 personer. Paketpris 2951 SEK/person (om man är två-fyra personer på rummet) Enkelrumstillägg 450 SEK/natt Extranatt från onsdag-torsdag 1350 SEK för en person Extranatt från onsdag-torsdag 1450 SEK för två personer Extranatt från onsdag-torsdag 1650 SEK för tre personer Extranatt från onsdag-torsdag 1850 SEK för fyra personer


  I ovan paketpris ingår 3 nätter torsdag-söndag Frukost 2 luncher (fredag och lördag) 2 middagar (torsdag och fredag) Galamiddag inkl isvatten och kaffe (lördag) Kaffe/te under helgen Take away påse (söndag)
*/
