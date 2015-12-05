var backend = MensaBackend;
if (!backend.getList) {
    backend = new MensaBackend;
}

var trans = new Translations;
var text = new Texts;
var registrator = new Registrator;
var isLoggedIn = false;
var isAdmin = false;
var language = "sv";
var showingWhat;

/* At startup */
$(init);

/* Init function */
function init() {

  // alert(navigator.userAgent);

  loadSpecificCss();

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
    {"id":"mnuWelcome","theme":"green","logo":"images/glenn/volare.png","function":doShowWelcomePage},
    {"id":"mnuAG","theme":"yellow","function":doShowAG},
    {"id":"mnuHotel","function":doShowAboutHotel},
    {"id":"mnuVasttrafik","function":doShowAboutVasttrafik},
    {"id":"mnuContact","function":doShowContact},
    {"id":"mnuFAQ","function":doShowFAQ},
    {"id":"mnuMensaGbg","function":doShowMensaGbg},
    {"id":"mnuGothenburg","function":doShowAboutGbg},
    
    {"id":"mnuLogin","function":doShowRegisterPage}
  ];
  populateMenu(mnuRows);

}

function populateMenuMember() {

  var mnuRows = [
    {"id":"mnuWelcome","theme":"green","function":doShowWelcomePage},
    
    {"id":"mnuAG","theme":"yellow","function":doShowAG},
    {"id":"mnuAGM","theme":"yellow","function":doShowAGM},
    {"id":"mnuActivities","theme":"yellow","function":doShowActivitiesPage},
    {"id":"mnuGalamiddag","theme":"yellow","function":doShowGalamiddagPage},
    
    {"id":"mnuHotel","theme":"default","function":doShowAboutHotel},
    
    {"id":"mnuVasttrafik","theme":"green","function":doShowAboutVasttrafik},
    {"id":"mnuContact","theme":"default","function":doShowContact},
    {"id":"mnuFAQ","theme":"default","function":doShowFAQ},
    {"id":"mnuMensaGbg","theme":"default","function":doShowMensaGbg},
    {"id":"mnuGothenburg","theme":"default","function":doShowAboutGbg},
    
    {"id":"mnuRegister","theme":"green","function":doShowRegisterPage},
    
    {"id":"mnuLogout","theme":"white","function":doLogout}
  ];
  populateMenu(mnuRows);

}

function populateMainContent(what) {

  showingWhat = what;
  backend.getText(what, language, callback);

  function callback(s) {
    doShow(what, s);
  }

}

function populateMainContent_(what) {

  showingWhat = what;
  var s = text.get(what, language);
  doShow(what, s);

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
    var label=trans.get(mnuRow.id, language);
    var cssClass = "button";
    var theme = "";
    if (mnuRow.theme!==undefined) {
        theme = mnuRow.theme;
        cssClass += " "+theme;
    }
    var html="<div id='"+mnuRow.id+"' class='"+cssClass+"' title='"+label+"' theme='"+theme+"'>"+label+"</div>\n";
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
  }, 500);

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
  changeTheme("green");
  changeLogo("volare");
  // showSubMenu();
  // populateSubMenuWelcome();
  if (isLoggedIn) {
    populateMainContent("members_welcome");
  } else {
    populateMainContent("welcome");
  }
}

function doShowAG() {
  menuClose("mnuAG");
  changeLogo("landar");
  changeTheme("yellow");
  if (isLoggedIn) {
    populateMainContent("members_AG");
  } else {
    populateMainContent("about_AG");
  }
}

function doShowAGM() {
  menuClose("mnuAGM");
  changeLogo("kavat");
  changeTheme("yellow");
  populateMainContent("members_meeting");
}

function doShowMensaGbg() {
  menuClose("mnuMensaGbg");
  changeLogo("kavat");
  changeTheme("default");
  populateMainContent("mensa_gothenburg");
}

function doShowAboutGbg() {
  menuClose("mnuGothenburg");
  changeLogo("kavat");
  changeTheme("default");
  populateMainContent("about_gothenburg");
}

function doShowAboutVasttrafik() {
    
  menuClose("mnuVasttrafik");
  changeLogo("kavat");
  changeTheme("default");
  populateMainContent("about_vasttrafik");
}

function doShowAboutHotel() {
  menuClose("mnuHotel");
  changeLogo("kavat");
  changeTheme("default");
  if (isLoggedIn) {
    populateMainContent("members_hotel");
  } else {
    populateMainContent("about_hotel");
  }
}

function doShowActivitiesPage() {
  menuClose("mnuActivities");
  changeLogo("kavat");
  changeTheme("yellow");
  populateMainContent("members_activities");
}


function doShowGalamiddagPage() {
  menuClose("mnuGalamiddag");
  changeLogo("travolta");
  changeTheme("yellow");
  populateMainContent("members_galamiddag");
}

function doShowForgotPasswordPage() {
  menuClose();
  populateMainContent("forgotPasswordPage");
}

function doShowContact() {
  menuClose("mnuContact");
  changeLogo("kavat");
  changeTheme("default");
  if (isLoggedIn) {
    populateMainContent("members_contact");
  } else {
    populateMainContent("about_contact");
  }
}

function doShowFAQ() {
  menuClose("mnuFAQ");
  changeLogo("kavat");
  changeTheme("default");
  if (isLoggedIn) {
    populateMainContent("members_FAQ");
  } else {
    populateMainContent("about_FAQ");
  }
}

function doShowRegisterPage() {

  menuClose("mnuRegister");
  changeLogo("kavat");
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
      var s = editor.getContent();
      backend.setText(textId, language, s);
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

function doLogout() {

    backend.logout(callback);
    
    function callback() {
        isLoggedIn=false;
        registrator.isLoggedIn(isLoggedIn);
        populateMenuGuest();
        populateMainContent("welcome");
    }

}

function loginCallback(success) {
    if (success) {
        changeTheme("green");
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

function loadSpecificCss() {
  
  var css = undefined;
  
  if (navigator.userAgent.indexOf("Safari/8536") > -1) {
      css = "safari_8536";
  }
  if (navigator.userAgent.indexOf("Safari/9537") > -1) {
      css = "safari_9537";
  }
  


  if (css!==undefined) {
    var ipadCss = document.createElement("link");
    ipadCss.type = "text/css";
    ipadCss.rel = "stylesheet";
    ipadCss.href = "css/devices/"+css+".css";
    document.head.appendChild(ipadCss);
      
  }
}


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
