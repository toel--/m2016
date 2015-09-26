/* http://javascript.crockford.com/private.html */
function Registrator() {

    // constructor
    var that = this;
    var step = 0;
    var stepsCount = 3;
    var user = {"id":"","email":"","gender": "-1"};
    var reg = {"roomType":"","package":"1","shareRoom":""};

    /**** public ****/

    /** get the html content for the actual step */
    this.getHtml = function(callback) {

      var html;
      switch (step) {
        case 0: html = getCreateAccountHtml(callback); break;
        case 1: html = getPopulateAccountHtml(callback); break;
        case 2: html = getRegisterHotel(callback); break;
        case 3: html = getHtml3(callback); break;
        default: html = "Oops!";
      }
    };

    /** register event listenders for the html of the current step */
    this.doRegisterEventListeners = function() {
      switch (step) {
        case 2: registerEventListenersRegisterHotel(); break;
      }
    }

    this.doPrevious = function() {

      if (step>1) step--;
      doShowRegisterPage();

    }

    this.doNext = function() {

      performStep(callback);
      function callback(isOk) {
        if (isOk) {
          if (step<stepsCount) step++;
          doShowRegisterPage();
        }
      }
    }

    this.isLoggedIn = function(b) {
      if (b) {
        if (step===0) step = 1;
      }
    }


    /**** private ****/
    function getCreateAccountHtml(callback) {
      var html = "<div class='registration_box' >" + getRegistrationHeader();
      html+="Ange ditt medlemsnummer och välj ett lösenord:<br> \
      <input type='text' id='username' placeholder='Medlemsnummer'/><br> \
      <input type='password' id='password' placeholder='Lösenord'/><br></div>";
      html += getBrowsingBar();
      setTimeout(callback(html), 1);
    }

    function getPopulateAccountHtml(callback) {
      var email="";
      if (user) email=user.email;
      var genders = {"0":"kvinna", "1":"man"};
      var html = "<div class='registration_box' >" + getRegistrationHeader();
      html+="Ange ditt email adress och kön:<br> \
      <input type='email' id='email' placeholder='Email' value='"+email+"'/><br>";
      html += getHtmlSelect("gender", "", genders, user.gender, "Kön");
      html+="<br></div>";
      html += getBrowsingBar();
      setTimeout(callback(html), 1);
    }

    function getRegisterHotel(callback) {

      var rooms = getHotelRooms();
      var events = getHotelEvents();
      var shareRoomValues = {
        "0":"dela rum med vem som helst",
        "1":"dela rum med en person av samma kön",
        "2":"dela rum med medlem:",
        "3":"jag vill ha eget rum"
      };

      var html = "<div class='registration_box'>" + getRegistrationHeader();

      html+="<div class='hotel_reservation'>";

      // Type of room
      var roomTypes = [];
      for (var i = 0; i< rooms.length; i++){
        roomTypes[i]=rooms[i].id+", "+rooms[i].Ps+" personer";
      };
      html+=getHtmlSelect('roomType', '', roomTypes, reg.roomType, "Välj typ av rum");
      html+="<div class='field'>"+getCheckBox('package', '', 'package', reg.package, 'Packet erbjudande')+"</div>";
      html+=getHtmlSelect('shareRoom', '', shareRoomValues, reg.shareRoom, "Hur vill du dela rum");

      var lastDate = "";
      for (var i = 0; i< events.length; i++){
          var entry = events[i];
          var date = entry.date;
          if (date!==lastDate) {
            html+="<div class='row'>"+date+"</div>";
            lastDate=date;
          }
          html+="<div class='row'>"+entry.label+"</div>";
      }

      html+="TOTAL PRICE";

      html += "</div></div>";
      html += getBrowsingBar();
      setTimeout(callback(html), 1);

    }

    function registerEventListenersRegisterHotel() {



    }

    function getHtml3() {
      var html="Registration page 3...";
      html += getBrowsingBar();
      setTimeout(callback(html), 1);
    }

    function getRegistrationHeader() {
      var html = "<div class='header'>###title###</div>";
      if (step>0) html += "steg "+step+" av "+stepsCount;
      html += "<br><br><br>";
      var title;
      switch (step) {
        case 0: title = "Skapa ett konto"; break;
        case 1: title = "Om dig"; break;
        case 2: title = "Hotell"; break;
        case 2: title = "Aktivitet"; break;
        default: title = "-----";
      }
      return html.replace("###title###", title);
    }

    function getBrowsingBar() {
      var html = "<div id='lblMessage'></div><div class='buttonBar'>";
      if (step>1) html+="<div id='btnPrevious' class='button' style='float: left;'>Föregående</div>";
      if (step<stepsCount) html+="<div id='btnNext' class='button' style='float: right;'>Nästa</div>";
      html+="</div>";
      return html;
    }

    function performStep(callback) {
      var ok = true;
      switch (step) {
        case 0:
          user.id = $("#username").val();
          var password = $("#password").val();
          backend.createUser(user.id, password, createUserCallback);
          break;
        case 1:
          user.email = $("#email").val();
          user.gender = $("#gender").val();
          backend.setUserInfo(user.id, user.gender, user.email, answerCallback);
          break;
        default:
      }

      function createUserCallback(answer) {
        if (answer.success) {
          var password = $("#password").val();
          backend.login(user.id, password, loginUserCallback);
        } else {
          $("#lblMessage").html(answer.message);
        }

        function loginUserCallback(success) {
          if (success) {
              populateMenuMember();
              callback(true);
          } else {
              $("#lblMessage").html("Oops!");
          }

        }

      }

      function answerCallback(answer) {
        if (answer.success) {
          callback(true);
        } else {
          $("#lblMessage").html(answer.message);
        }
      }

    }

    function nopCallback() {
      // Do nothing
    }


    function getUserCallback(user) {
      this.user = user;
    }

}
