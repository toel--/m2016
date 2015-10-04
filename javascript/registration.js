/* http://javascript.crockford.com/private.html */

/* check http://stackoverflow.com/questions/4941004/putting-images-with-options-in-a-dropdown-list */

function Registrator() {

    // constructor
    var that = this;
    var step = 0;
    var stepsCount = 3;
    var user = {"id":"","email":"","gender": "-1"};
    var reg = {"roomType":"","package":true,"shareRoom":"0"};
    var lastReg = {"roomType":"","package":false,"shareRoom":""};

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
        "0":"dela rum",
        "1":"dela rum med likande kön",
        "2":"dela rum med medlem:",
        "3":"jag vill ha eget rum"
      };

      var html = "<div class='registration_box'>" + getRegistrationHeader();

      html+="<div class='hotel_reservation'>";

      // Type of room
      var roomTypes = {};
      for (var i = 0; i< rooms.length; i++){
        roomTypes[rooms[i].id]=rooms[i].id+", "+rooms[i].Ps+" personer";
      };
      html+="<table><tr><td>";
      html+=getHtmlSelect('roomType', '', roomTypes, reg.roomType , "Välj typ av rum");
      html+="</td><td>";
      html+="<div class='field' style='width: auto;'>"+getCheckBox('package', 'chkSmall', 'package', reg.package, 'Packet erbjudande')+"</div>";
      // html+=getCheckBox('package', '', 'package', reg.package, 'Packet erbjudande');
      html+="<td></tr>";
      html+="<tr><td colspan='2'><div id='room_image'></div></td></tr>";
      html+="<tr><td>"
      html+=getHtmlSelect('shareRoom', '', shareRoomValues, reg.shareRoom); //, "Hur vill du dela rum");
      html+="</td><td>";
      html+="<!-- input medlemsnummer -->";
      html+="</td></tr>";
      html+="</table>";

      var lastDate = "";
      html+="<table>";
      for (var i = 0; i< events.length; i++){
          var entry = events[i];
          var date = entry.date;
          if (date!==lastDate) {
            html+="<tr><td style='width: 30px'><div class='icon_calendar'>"+date.substring(8, 10)+"</div></td><td colspan='4'><b>"+getNameOfDay(date)+"</b></td></tr>";
            lastDate=date;
          }
          html+="<tr><td>&nbsp;</td><td><img src='images/icon_"+entry.type+".png'></td><td>"+getCheckBox(entry.id, 'chkSmall', '', reg[entry.id], '')+"</td><td>"+entry.label+"</td><td><div class='price' id='price_"+entry.id+"'></div/td></tr>";
      }

      html+="<tr><td colspan='4'>&nbsp;</td><td><div id='total' class='price'></div></td></tr>";
      html+="</table>";

      html += "</div></div>";
      html += getBrowsingBar();
      setTimeout(callback(html), 1);

    }

    function registerEventListenersRegisterHotel() {

      $("input").change(onRegisterHotelEvent);
      $("select").change(onRegisterHotelEvent);
      doRegistrationUpdate();

    }

    function onRegisterHotelEvent() {
      var id = $(this).attr("id");
      var value;
      if (id==="roomType" || id==="shareRoom") {
        value = $(this).find('option:selected').attr("value");
        if (value===undefined) value=$(this).find('option:selected').text();
      } else {
        value = $(this).prop('checked');
      }
      // alert(id+": "+value);
      reg[id]=value;
      doRegistrationUpdate();
    }

    function doRegistrationUpdate() {

      var total = 0;
      var notSharing = (reg.shareRoom==="3");
      var disableAll = (reg.roomType==="" || reg.shareRoom==="");

      // alert(JSON.stringify(reg, null, 4));

      var inPackage = getHotelInPackage();

      // get the room data
      var rooms = getHotelRooms();
      var room;
      for (var i=0; i<rooms.length; i++) {
        if (rooms[i].id===reg.roomType) {
          room = rooms[i];
          break;
        }
      }

      //  reset checkboxes
      var events = getHotelEvents();
      for (var i=0; i<events.length; i++) {
        var event = events[i];
        if (disableAll) {
          $("#"+event.id).attr("disabled", true);
        } else {
          var disabled = (reg.package && ($.inArray(event.id, inPackage)>=0));
          if (disabled) {
            $("#"+event.id).attr("disabled", true);
          } else {
            $("#"+event.id).removeAttr("disabled");
          }
          $("#"+id).prop('checked', reg[event.id]);
        }
      }

      // var reg = {"roomType":"","package":true,"shareRoom":""};
      // Select / deselect on change
      if (lastReg.roomType!==reg.roomType) {
        $("#room_image").html("<img src='images/opalen/"+reg.roomType+".jpg' width='400'>");
        lastReg.roomType=reg.roomType
      }

      /* need to split this */

      if (lastReg.package!==reg.package) {
        for (var i=0; i<inPackage.length; i++){
          var id=inPackage[i];
          if (reg.package) {
            $("#"+id).prop('checked', true).attr("disabled", true);
          } else {
            $("#"+id).prop('checked', false).removeAttr("disabled");
          }
        }
        lastReg.package=reg.package;
      }

      if (room===undefined) return;

      // Compute price
      if (reg.package) {
        total += room["PCK"];
      }

      // handle each event
      for (var i=0; i<events.length; i++){

        var event = events[i];
        var id=event.id;
        var price=0;

        // set the price value info
        if (id.substring(0,1)==="N") {
          var ps = room["Ps"];
          price = room["1N"+ps+"P"];
          if (notSharing) price += room["1P+"];
          $("#price_"+id).html(price+" kr");
        }

        var selected = $("#"+id).prop('checked') && !($("#"+id).prop('disabled') );
        if (selected) {
          if (!(reg.package && $.inArray(id, inPackage))) total += price;                        // if not part of package
        }


      }

      $("#total").html("<b>"+total+" kr</b>");

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


    function getNameOfDay(dateString) {
      var d = new Date(dateString);
      var weekday = new Array(7);
      weekday[0]=  "Söndag";
      weekday[1] = "Måndag";
      weekday[2] = "Tisdag";
      weekday[3] = "Onsdag";
      weekday[4] = "Torsdag";
      weekday[5] = "Fredag";
      weekday[6] = "Lördag";
      return weekday[d.getDay()];
    }

}
