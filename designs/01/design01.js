/**
contains the javascript methods that are design specific
*/

function populateMenu(mnuRows) {

  $("#menu").html("");
  for (var i = 0; i< mnuRows.length; i++){
    var mnuRow = mnuRows[i];
    var html="<li><a id='"+mnuRow["id"]+"' href='#"+mnuRow["id"]+"' title='"+mnuRow["label"]+"'>"+mnuRow["label"]+"</a></li>\n";
    $("#menu").append(html);
    $("#"+mnuRow["id"]).click(mnuRow["function"]);
  }

}

function doWindowResize() {
  var w = $(this).width();
  /*
  var kitComponents = $('#kit_components');
  if (kitComponents.length) {
    var kcw = w-168;
    $('#kit_components').width(kcw);
    var titlew = (kcw - 150)/2;
    if (titlew<100) titlew=100;
    $('.kc_title').width(titlew);
    $('.kc_subtitle').width(titlew);
  }
  */

}

function menuClose() {
  $("#nav-expand").prop('checked', false);
}

function changeBackground(theme) {
    
}

function initDesign() {
    
}