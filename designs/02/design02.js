/**
contains the javascript methods that are design specific
*/

function populateMenu(mnuRows) {

  $("#menu").width(170*mnuRows.length);
  $("#menu").html("");
  for (var i = 0; i< mnuRows.length; i++){
    var mnuRow = mnuRows[i];
    var html="<div class='btnBigSun' id='"+mnuRow["id"]+"' href='#"+mnuRow["id"]+"' title='"+mnuRow["label"]+"'>"+mnuRow["label"]+"</div>\n";
    $("#menu").append(html);
    $("#"+mnuRow["id"]).hide().fadeIn(200+100*i);
    $("#"+mnuRow["id"]).click(mnuRow["function"]);
    //setTimeout(function() {$("#"+mnuRow["id"]).fadeIn();}, 100*i);
  }

}

function doWindowResize() {
  var w = $(this).width();

  var gbgH = (373/1959)*$("#goteborg").width();
  if (gbgH>100) gbgH=100;
  $("#goteborg").height(gbgH);
}

function menuClose() {
  $("#menu").fadeOut();
}
