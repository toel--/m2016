var backend = MensaBackend;
if (!backend.getList) {
    backend = new MensaBackend;
}

var registrator = new Registrator;
var isAdmin = false;

/* At startup */
$(init);

/* Init function */
function init() {

  $(window).resize(doWindowResize);
  $(window).bind('beforeunload', doWindowBeforeUnload);
  $(window).on("navigate", doWindowNavigate);
  /* $(window).popstate(doHashChange); */

  populateMenuGuest();
  switch (window.location.hash) {
    case "#mnuRegister": doShowRegisterPage(); break;
    default: doShowWelcomePage();
  }

  doWindowResize();
  initDesign();
  
  backend.getUser(getUserInformationCallback);


}

/********** populate gui ***********/

function populateMenuGuest() {

  var mnuRows = [
    {"id":"mnuWelcome","label":"Välkommen","function":doShowWelcomePage},
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

function populateSubMenuWelcome() {

  var mnuRows = [
    {"id":"mnuSub_0","label":"Välkommen","function":doShowWelcomePage},
    {"id":"mnuSub_1","label":"Mensa Göteborg","function":function(){populateMainContent("mensa_gothenburg");}},
    {"id":"mnuSub_2","label":"Göteborg","function":function(){populateMainContent("about_gothenburg");}},
    {"id":"mnuSub_3","label":"Västtrafik","function":function(){populateMainContent("about_vasttrafik");}},
    {"id":"mnuSub_4","label":"Hotell","function":function(){populateMainContent("about_hotel");}},
  ];
  populateSubMenu(mnuRows);

}

function populateMainContent(what) {

  backend.getText(what, "sv", callback);

  function callback(text) {
    doShow(what, text);
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

function populateSubMenu(mnuRows) {

  $("#submenu").html("");
  for (var i = 0; i< mnuRows.length; i++){
    var mnuRow = mnuRows[i];
    var html="<div id='"+mnuRow["id"]+"' class='button' title='"+mnuRow["label"]+"'>"+mnuRow["label"]+"</div><br>\n";
    $("#submenu").append(html);
    $("#"+mnuRow["id"]).click(mnuRow["function"]);
  }

}

function hideSubMenu() {
    
    $("#submenu").fadeOut().animate({width: "0"}, 500);
    
}

function showSubMenu() {
    
    $("#submenu").animate({width: "100px"}, 500).fadeIn();
    
}

/********** action function ***********/

function doShow(what, html, callback) {

  $("#main_content").fadeOut();
  setTimeout(function() {
    $("#main_content").attr("what", what).html(html).fadeIn();
    if (callback!==undefined) callback();
  }, 300);

}

function doShowLoginPage() {

  menuClose();
  hideSubMenu();
  changeBackground("grey");

  var html = "<div id='login_box'> \
    <h2>Logga in</h2> \
    <input type='text' id='username' placeholder='Medlemsnummer'/><br> \
    <input type='password' id='password' placeholder='Lösenord'/><br> \
    <div id='btnLogin' class='button' style='float: right;' tabindex=0, autofocus=true>Logga in</div> \
</div> \
<div id='lblMessage'></div>";

  doShow("login", html, callback);
  function callback() {
    $("#btnLogin").click(doLogin);
  }

}

function doShowRegisterPage() {

  menuClose();
  registrator.getHtml(callback);

  function callback(html) {
    doShow("registration", html, callback2);
    function callback2() {
      $("#btnPrevious").click(registrator.doPrevious);
      $("#btnNext").click(registrator.doNext);
      registrator.doRegisterEventListeners();
    }
  }

}

function doShowWelcomePage() {
  menuClose();
  showSubMenu();
  populateSubMenuWelcome();
  populateMainContent("welcome");
}

function doShowMembersPage() {
  menuClose();
  populateMainContent("members_welcome");
}

function doShowForgotPasswordPage() {
  menuClose();
  populateMainContent("forgotPasswordPage");
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
    backend.login(username, password, loginCallback);

}

function loginCallback(success) {
    if (success) {
        changeBackground("default");
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

function getUserInformationCallback(data) {
    // Resume ongoing session on page reload
    if (data!==null) loginCallback(true);
}

/********** events listeners ***********/

function doWindowNavigate(event, data) {
  var direction = data.state.direction;
  if (direction === 'back') {
      alert("back!");
    event.stopPropagation();
  }
  if (direction === 'forward') {
    // do something else
  }
}

function doWindowBeforeUnload(event) {
    //alert(JSON.stringify(event));
    return "Vill du lämna sidan?";
}

function doHashChange(){
  alert( location.hash );
}

/********** layout function **********/
