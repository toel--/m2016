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
