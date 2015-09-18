var backend = new MensaBackend;
var registrator = new Registrator;
var isAdmin = false;

/* At startup */
$(init);

/* Init function */
function init() {

  $(window).resize(doWindowResize);
  /* $(window).popstate(doHashChange); */

  populateMenuGuest();
  switch (window.location.hash) {
    case "#mnuRegister": doShowRegisterPage(); break;
    default: populateMainContent("welcome");
  }


}

/********** populate gui ***********/

function populateMenuGuest() {

  var mnuRows = [
    {"id":"mnuLogin","label":"Logga in","function":doShowLoginPage},
    {"id":"mnuRegister","label":"Registrera","function":doShowRegisterPage}
  ];
  populateMenu(mnuRows);

}

function populateMenuMember() {

  var mnuRows = [
    {"id":"mnuWelcome","label":"Välkommen","function":doShowWelcomePage},
    {"id":"mnuMembers","label":"Årsträffen","function":doShowMembersPage},
    {"id":"mnuRegister","label":"Ändra registration","function":doShowRegisterPage}
  ];
  populateMenu(mnuRows);

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

function doShowLoginPage() {
  $("#nav-expand").prop('checked', false);

  var html = "<div id='login_box'> \
    <h2>Logga in</h2> \
    <input type='text' id='username' placeholder='Medlemsnummer'/><br> \
    <input type='password' id='password' placeholder='Lösenord'/><br> \
    <div id='btnLogin' class='button' style='float: right;' tabindex=0, autofocus=true>Logga in</div> \
</div> \
<div id='lblMessage'></div>";
    $("#main_content").attr("what", "login").html(html);
    $("#btnLogin").click(doLogin);
}

function doShowRegisterPage() {

  $("#nav-expand").prop('checked', false);
  registrator.getHtml(callback);

  function callback(html) {
    $("#main_content").attr("what", "registration").html(html);
    $("#btnPrevious").click(registrator.doPrevious);
    $("#btnNext").click(registrator.doNext);
  }

}

function doShowWelcomePage() {
  $("#nav-expand").prop('checked', false);
  populateMainContent("welcome");
}

function doShowMembersPage() {
  $("#nav-expand").prop('checked', false);
  populateMainContent("members_welcome");
}

function doShowForgotPasswordPage() {
  $("#nav-expand").prop('checked', false);
  populateMainContent("notImplementedYet");
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
            registrator.isLoggedIn(true);
        } else {
            var message = "Tyvärr inte, klick <div id='btnForgotPassword' class='button' style='display: inline;'>här</div> om du har glömt ditt lösenord."
            $("#lblMessage").html(message).hide().fadeIn(.2).fadeOut(.2).fadeIn();
            $("#btnForgotPassword").click(doShowForgotPasswordPage);

        }
    }
}

/********** events listeners ***********/


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

function doHashChange(){
  alert( location.hash );
}

/********** layout function **********/
