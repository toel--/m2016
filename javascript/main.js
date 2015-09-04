var backend = new MensaBackend;
var isAdmin = false;

/* At startup */
$(init);

/* Init function */
function init() {

  $(window).resize(doWindowResize);
  populateMenuGuest();
  populateMainContent("welcome");

}

/********** populate gui ***********/

function populateMenuGuest() {

  var mnuRows = [
    {"id":"mnuLogin","label":"Logga in","function":doMenuLogin},
    {"id":"mnuRegister","label":"Registrera","function":doMenuRegister}
  ];
  for (var i = 0; i< mnuRows.length; i++){
    var mnuRow = mnuRows[i];
    var html="<li><a id='"+mnuRow["id"]+"' href='#"+mnuRow["id"]+"' title='"+mnuRow["label"]+"'>"+mnuRow["label"]+"</a></li>\n";
    $("#menu").append(html);
    $("#"+mnuRow["id"]).click(mnuRow["function"]);
  }

}

function populateMenuMember() {

  var mnuRows = [
    {"id":"mnuWelcome","label":"Välkommen","function":doMenuWelcome},
    {"id":"mnuMembers","label":"Årsträffen","function":doMenuMembers},
    {"id":"mnuRegister","label":"Ändra registration","function":doMenuRegister}
  ];
  $("#menu").html("");
  for (var i = 0; i< mnuRows.length; i++){
    var mnuRow = mnuRows[i];
    var html="<li><a id='"+mnuRow["id"]+"' href='#"+mnuRow["id"]+"' title='"+mnuRow["label"]+"'>"+mnuRow["label"]+"</a></li>\n";
    $("#menu").append(html);
    $("#"+mnuRow["id"]).click(mnuRow["function"]);
  }

}

function populateMainContent(what) {

  backend.getText(what, "sv", callback);

  function callback(text) {
    $("#main_content").attr("what", what).html(text);
  }

}

function enableEditable(b) {

  isAdmin = b;
  if (isAdmin) {
    $("#fieldset").append("<div what='main_content' class='button btnEdit'>edit</div>");
    $(".btnEdit").click(doEditClick);

    tinyMCE.init({
      mode : "none",
      auto_focus : false
    });
  }
}

/********** action function ***********/

function doMenuLogin() {
  $("#nav-expand").prop('checked', false);

  var html = "<div id='login_box'> \
    <h2>Logga in</h2> \
    <input type='text' id='username' placeholder='Medlems nummer'/><br> \
    <input type='password' id='password' placeholder='Lösenord'/><br> \
    <div id='btnLogin' class='button' style='float: right;' >Logga in</div> \
</div>";
    $("#main_content").attr("what", "login").html(html);
    $("#btnLogin").click(doLogin);
}

function doMenuRegister() {
  $("#nav-expand").prop('checked', false);
  alert("doMenuRegister");
}

function doMenuWelcome() {
  $("#nav-expand").prop('checked', false);
  populateMainContent("welcome");
}

function doMenuMembers() {
  $("#nav-expand").prop('checked', false);
  populateMainContent("members_welcome");
}

function doEditClick() {

  var id = $(this).attr("what");
  var textId = $('#'+id).attr("what");
  tinyMCE.execCommand('mceToggleEditor', false, id);

  var action = $(this).html();
  switch (action) {
    case "edit":
      $(".btnEdit").hide();
      $(this).html("save").show();
      break;
    case "save":
      var editor = tinymce.get(id);
      var text = editor.getContent();
      backend.setText(textId, "sv", text);
      $(this).html("edit");
      $(".btnEdit").show();
      break;
    default:
      alert("Oops!");
  }

}


function doLogin() {

    var username = $("#username").val();
    var password = $("#password").val();
    backend.login(username, password, callback);

    function callback(success) {
        if (success) {
            populateMenuMember();
            populateMainContent("members_welcome");
            $("#login").fadeOut();
            backend.isAdmin(enableEditable);
        } else {
            alert("Tyvärr!");
            $("#login").fadeOut();
        }
    }
}

/********** action function ***********/


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

/********** layout function **********/
