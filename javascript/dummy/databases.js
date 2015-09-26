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


/**

http://www.scandichotels.se/Hotels/Sverige/Goteborg/Scandic-Opalen/?hotelpage=rooms&roomid=16669

  Paketpris: Boende med matpaket och gala middag:
  -----------------------------------------------
  10 st enkelrum med en 140 cm säng Paketpris 2426 SEK/person (om man är två personer på rummet) Enkelrumstillägg 275 SEK/natt Extranatt från onsdag-torsdag 650 SEK för en person Extranatt från onsdag-torsdag 750 SEK för två personer

  35 standard dubbelrum och 50 standard trebäddsrum Paketpris 2651 SEK/person (om man är två-tre personer på rummet) Enkelrumstillägg 200 SEK/natt Extranatt från onsdag-torsdag 800 SEK för en person Extranatt från onsdag-torsdag 900 SEK för två personer Extranatt från onsdag-torsdag 1100 SEK för tre personer

  5 superior rum med 2x90 cm sängar samt en 140 cm bäddsoffa, 1-4 personer. Paketpris 2951 SEK/person (om man är två-fyra personer på rummet) Enkelrumstillägg 450 SEK/natt Extranatt från onsdag-torsdag 1350 SEK för en person Extranatt från onsdag-torsdag 1450 SEK för två personer Extranatt från onsdag-torsdag 1650 SEK för tre personer Extranatt från onsdag-torsdag 1850 SEK för fyra personer


  I ovan paketpris ingår 3 nätter torsdag-söndag Frukost 2 luncher (fredag och lördag) 2 middagar (torsdag och fredag) Galamiddag inkl isvatten och kaffe (lördag) Kaffe/te under helgen Take away påse (söndag)
*/
