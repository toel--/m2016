
function getHotelRooms() {
return [
  {"id":"ekonomi", "count":10, "description":"Enkelrum med en 140 cm säng", "Ps":2, "1P+": 275, "1N1P": 650, "1N2P": 750, "PCK": 2426},
  {"id":"standard", "count":35, "description":"Dubbelrum med två sängar", "Ps":2, "1P+": 200, "1N1P": 800, "1N2P": 900, "PCK": 2651},
  {"id":"family", "count":50, "description":"Trebäddsrum", "Ps":3, "1P+": 200, "1N1P": 800, "1N2P": 900, "1N3P": 1100, "PCK": 2651},
  {"id":"superior", "count":5, "description":"Superior rum med 2x90 cm sängar samt en 140 cm bäddsoffa", "Ps":4, "1P+": 450, "1N1P": 1350, "1N2P": 1450, "1N3P": 1650, "1N4P": 1850, "PCK": 2951}
];
}

/*
För de som bara äter på hotellet gäller följande paketpris: 1301 SEK/person 2 luncher (fredag och lördag) 2 middagar (torsdag och fredag) Galamiddag inkl isvatten och kaffe (lördag) Kaffe/te under helgen Take away påse (söndag)

Eventuella barn: Mellan 5-12 år – halva priset Barn under 5 år – gratis

OBS det går inte att avboka delar i paketet
*/
function getHotelEvents() {
return [
  {"id":"S0504", "date":"2016-05-04", "type":"food", "label":"Middag"},
  {"id":"N0504", "date":"2016-05-04", "type":"room", "label":"Natt onsdag-tordag"},
  {"id":"B0505", "date":"2016-05-05", "type":"food", "label":"Frukost"},
  {"id":"L0505", "date":"2016-05-05", "type":"food", "label":"Lunch"},
  {"id":"S0505", "date":"2016-05-05", "type":"food", "label":"Middag"},
  {"id":"N0505", "date":"2016-05-05", "type":"room", "label":"Natt tordag-fredag"},
  {"id":"B0506", "date":"2016-05-06", "type":"food", "label":"Frukost"},
  {"id":"L0506", "date":"2016-05-06", "type":"food", "label":"Lunch"},
  {"id":"S0506", "date":"2016-05-06", "type":"food", "label":"Galamiddag"},
  {"id":"N0506", "date":"2016-05-06", "type":"room", "label":"Natt fredag-lördag"},
  {"id":"B0507", "date":"2016-05-07", "type":"food", "label":"Frukost"},
  {"id":"L0507", "date":"2016-05-07", "type":"food", "label":"Take away påse"},
  {"id":"N0507", "date":"2016-05-07", "type":"room", "label":"Natt lördag-söndag"},
  {"id":"B0508", "date":"2016-05-08", "type":"food", "label":"Frukost"}
];
}

function getHotelInPackage() {
/* 3 nätter torsdag-söndag Frukost
2 luncher (fredag och lördag)
2 middagar (torsdag och fredag) Galamiddag inkl isvatten och kaffe (lördag) Kaffe/te
under helgen Take away påse (söndag) */
return ["N0505","N0506","N0507","B0506","B0507","B0508","L0506","L0507","S0505","S0506","S0507"];
}
