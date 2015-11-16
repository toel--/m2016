var backend = MensaBackend;
if (!backend.getList) {
    backend = new MensaBackend;
}

var registrator = new Registrator;
var isLoggedIn = false;
var isAdmin = false;
var language = "sv";
var showingWhat;

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
  
  $('#lngEN').click(function() {switchLanguage('en');});
  $('#lngSV').click(function() {switchLanguage('sv');});
  $('#lngDE').click(function() {switchLanguage('de');});

  doWindowResize();
  initDesign();
  
  backend.getUser(getUserInformationCallback);


}

/********** populate gui ***********/

function switchLanguage(lang) {
    language=lang;
    isLoggedIn ? populateMenuMember(): populateMenuGuest();
    populateMainContent(showingWhat);
}

function populateMenuGuest() {

  var mnuRows = [
    {"id":"mnuWelcome","sv":"Välkommen","en":"Welcome","de":"Willkommen","function":doShowWelcomePage},
    {"id":"mnuMensaGbg","sv":"Mensa Väst","en":"Mensa Väst","de":"Mensa Väst","function":doShowMensaGbg},
    {"id":"mnuGothenburg","sv":"Göteborg","en":"Gothenburg","de":"Göteborg","function":doShowAboutGbg},
    {"id":"mnuVasttrafik","sv":"Resor","en":"Travel","de":"Resor","function":doShowAboutVasttrafik},
    {"id":"mnuHotel","sv":"Boende","en":"Boende","de":"Boende","function":doShowAboutHotel},
    {"id":"mnuContact","sv":"Kontakt","en":"Contact","de":"Kontakt","function":doShowExternalContact},
    {"id":"mnuFAQ","sv":"FAQ","en":"FAQ","de":"FAQ","function":doShowExternalFAQ},
    
    // {"id":"mnuLogin","label":"Logga in","function":doShowLoginPage},
    {"id":"mnuRegister","sv":"Logga in","en":"Login","de":"Registrera","function":doShowRegisterPage}
  ];
  populateMenu(mnuRows);

}

function populateMenuMember() {

  var mnuRows = [
    {"id":"mnuWelcome","sv":"Välkommen","en":"Welcome","de":"Willkommen","function":doShowWelcomePage},
    {"id":"mnuMensaGbg","sv":"Mensa Väst","en":"Mensa Väst","de":"Mensa Väst","function":doShowMensaGbg},
    {"id":"mnuGothenburg","sv":"Göteborg","en":"Gothenburg","de":"Göteborg","function":doShowAboutGbg},
    {"id":"mnuVasttrafik","sv":"Resor","ev":"Travel","de":"Resor","function":doShowAboutVasttrafik},
    {"id":"mnuHotel","sv":"Boende","en":"Boende","de":"Boende","function":doShowAboutHotel},
    {"id":"mnuContact","sv":"Kontakt","en":"Contact","de":"Kontakt","function":doShowMembersContact},
    {"id":"mnuFAQ","sv":"FAQ","en":"FAQ","de":"FAQ","function":doShowMembersFAQ},
    {"id":"mnuMembers","sv":"Årsträffen","en":"Årsträffen","de":"Årsträffen","function":doShowMembersPage},
    {"id":"mnuActivities","sv":"Aktiviteter","en":"Activities","de":"Aktiviteter","function":doShowActivitiesPage},
    {"id":"mnuMeeting","sv":"Årsmöte","en":"Årsmöte","de":"Årsmöte","function":doShowMeetingPage},
    {"id":"mnuGalamiddag","sv":"Galamiddag","en":"Galamiddag","de":"Galamiddag","function":doShowGalamiddagPage},
    {"id":"mnuRegister","sv":"Registrera","en":"Register","de":"Registrera","function":doShowRegisterPage}
  ];
  populateMenu(mnuRows);

}
/*
function populateSubMenuWelcome() {

  var mnuRows = [
    {"id":"mnuSub_0","label":"Välkommen","function":doShowWelcomePage},
    {"id":"mnuSub_1","label":"Mensa Göteborg","function":function(){populateMainContent("mensa_gothenburg");}},
    {"id":"mnuSub_2","label":"Göteborg","function":function(){populateMainContent("about_gothenburg");}},
    {"id":"mnuSub_3","label":"Västtrafik","function":function(){populateMainContent("about_vasttrafik");}},
    {"id":"mnuSub_4","label":"Hotell","function":function(){populateMainContent("about_hotel");}},
  ];
  populateSubMenu(mnuRows);

}*/

function populateMainContent(what) {

  showingWhat = what;
  backend.getText(what, language, callback);

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

  $("#submenu").html("").hide();
  for (var i = 0; i< mnuRows.length; i++){
    var mnuRow = mnuRows[i];
    var html="<div id='"+mnuRow.id+"' class='button' title='"+mnuRow[language]+"'>"+mnuRow[language]+"</div><br>\n";
    $("#submenu").append(html);
    $('#'+mnuRow.id).click(mnuRow.function);
  }
  $("#submenu").fadeIn(2000);

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
  //hideSubMenu();
  changeTheme("grey");

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

function doShowWelcomePage() {
  menuClose("mnuWelcome");
  changeTheme("default");
  // showSubMenu();
  // populateSubMenuWelcome();
  populateMainContent("welcome");
}

function doShowMensaGbg() {
  menuClose("mnuMensaGbg");
  changeTheme("mensa");
  populateMainContent("mensa_gothenburg");
}

function doShowAboutGbg() {
  menuClose("mnuGothenburg");
  changeTheme("gbg");
  populateMainContent("about_gothenburg");
}

function doShowAboutVasttrafik() {
    
  menuClose("mnuVasttrafik");
  changeTheme("vasttrafik");
  populateMainContent("about_vasttrafik");
}

function doShowAboutHotel() {
  menuClose("mnuHotel");
  changeTheme("default");
  populateMainContent("about_hotel");
}

function doShowMembersPage() {
  menuClose("mnuMembers");
  populateMainContent("members_welcome");
}

function doShowActivitiesPage() {
  menuClose("mnuActivities");
  populateMainContent("members_activities");
}

function doShowMeetingPage() {
  menuClose("mnuMeeting");
  populateMainContent("members_meeting");
}

function doShowGalamiddagPage() {
  menuClose("mnuGalamiddag");
  populateMainContent("members_galamiddag");
}

function doShowForgotPasswordPage() {
  menuClose();
  populateMainContent("forgotPasswordPage");
}

function doShowExternalContact() {
  menuClose("mnuContact");
  populateMainContent("contact");
}

function doShowMembersContact() {
  menuClose("mnuContact");
  populateMainContent("members_contact");
}

function doShowExternalFAQ() {
  menuClose("mnuFAQ");
  populateMainContent("FAQ");
}

function doShowMembersFAQ() {
  menuClose("mnuFAQ");
  populateMainContent("members_FAQ");
}


function doShowRegisterPage() {

  menuClose("mnuRegister");
  changeTheme("grey");
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

function doEditClick() {

  var id = $(this).attr("what");
  var textId = $('#'+id).attr("what");
  tinyMCE.execCommand('mceToggleEditor', false, id);

  var action = $(this).html();
  switch (action) {
    case "edit":
      $("#submenu").hide();
      $(".btnEdit").hide();
      $(this).html("save").show();
      break;
    case "save":
      var editor = tinymce.get(id);
      var text = editor.getContent();
      backend.setText(textId, language, text);
      $(this).html("edit");
      $(".btnEdit").show();
      $("#submenu").show();
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
        changeTheme("default");
        populateMenuMember();
        populateMainContent("members_welcome");
        $("#login").fadeOut();
        backend.isAdmin(enableEditable);
        isLoggedIn=true;
        registrator.isLoggedIn(isLoggedIn);
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
