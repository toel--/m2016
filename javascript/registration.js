/* http://javascript.crockford.com/private.html */

/* check http://stackoverflow.com/questions/4941004/putting-images-with-options-in-a-dropdown-list */

function Registrator() {

    // constructor
    var that = this;
    var step = 0;
    var stepsCount = 3;
    var user = {"id":"","email":"","phone":"","gender": "-1"};
    var reg = {"roomType":"","package":"","shareRoom":"0","shareWith":"","nbAdults":"0","nbChildrens":"0"};
    var lastReg = {"roomType":"","package":"","shareRoom":"","shareWith":""};
    var lastTotal = 0;
    

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
    }
    
    /** register event listenders for the html of the current step */
    this.doRegisterEventListeners = function() {
      switch (step) {
        case 2: registerEventListenersRegisterHotel(); break;
      }
      $("#btnReg"+step).addClass("selected");
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
        backend.getUser(getUserInformationCallback);
        backend.getUserHotellReg(getUserHotellRegCallback);
      }
    }

    // duplicate code to handle the reg menu: not good at all, but it will do for now
    this.doRegMenuClick = function(jumpToStep) {
        
        performStep(callback);
        
        function callback() {
            
            step=jumpToStep;

            registrator.getHtml(callback);

            function callback(html) {
                doShow("registration", html, callback2);
                function callback2() {
                  $("#btnPrevious").click(registrator.doPrevious);
                  $("#btnNext").click(registrator.doNext);
                  doRegisterEventListeners();
                }
            }
        }
    }

    /***************************************************************************
     * private 
     **************************************************************************/
    function getUserInformationCallback(data) {
        user = data;
    }
    
    function getUserHotellRegCallback(data) {
        reg = data;
    }
    
    function getCreateAccountHtml(callback) {
      var html = "<div class='registration_box' >" + getRegistrationHeader();
      html+=trans.get("createAccountInfo", language);
      html+="<br> \
      <input type='text' id='username' placeholder='Medlemsnummer'/><br> \
      <input type='password' id='password' placeholder='Lösenord'/><br><br> \
      <div class='info'>"+trans.get("createAccountInfo2", language)+"</div> \
</div>";
      html += getBrowsingBar();
      setTimeout(callback(html), 1);
    }

    function getPopulateAccountHtml(callback) {
    
      var email="", phone="";
      if (user) {
          email=user.email;
          phone=user.phone;
      }
      var genders = {"0": trans.get("woman", language), "1": trans.get("man", language)};
      var arrivals = ["2016-05-04 17.00", "2016-05-04 18.00", "2016-05-04 19.00", "2016-05-04 20.00", "2016-05-04 21.00", "2016-05-05 07.00", "2016-05-05 08.00", "2016-05-05 09.00"];
      
      
      var html = "<div class='registration_box' >" + getRegistrationHeader();
      html+="<b>"+trans.get("optionalUserInfo", language)+"</b><br><br>";
      
      html+="<div class='info'>"+trans.get("descEmail", language)+"</div> \
      <input type='email' id='email' placeholder='"+trans.get("email", language)+"' value='"+email+"'/><br><br>";
        
      html+="<div class='info'>"+trans.get("descPhone", language)+"</div> \
      <input type='text' id='phone' placeholder='"+trans.get("phone", language)+"' value='"+phone+"'/><br><br>";
        
      html+="<div class='info'>"+trans.get("descGender", language)+"</div>";
      html += getHtmlSelect("gender", "", genders, user.gender, "");
      html+="<br><br>";
      
      html+="<div class='info'>"+trans.get("descArrival", language)+"</div>";
      html += getHtmlSelect("arrival", "", arrivals, user.arrival, "");
      
      html += "</div>";
      html += getBrowsingBar();
      setTimeout(callback(html), 1);
    }

    function getRegisterHotel(callback) {

      var rooms = getHotelRooms();
      var events = getHotelEvents();
      var packages = getHotelPackages();
      var shareRoomValues = {
        "0":"Dela rum med vem som helst",
        "1":"Dela rum med personer av samma kön",
        "2":"Dela rum med medlem:",
        "3":"Jag vill ha eget rum"
      };

      var html = "<div class='registration_box'>" + getRegistrationHeader();

      html+="<div class='hotel_reservation'><div id='lblMessage'></div>";

      // Number of person
      var nbAdults = {
        "1":"Jag",
        "2":"Jag +1",
        "3":"Jag +2",
        "4":"Jag +3"
      };
      var nbChildrens = {
        "0":"",
        "1":"+1 barn",
        "2":"+2 barn"
      };
      
      html+=getHtmlSelect('nbAdults', '', nbAdults, reg.nbAdults, "Välj antal personer");
      html+=getHtmlSelect('nbChildrens', '', nbChildrens, reg.nbChildrens, "Barn mellan 5 och 12");

      //var nbPersons = parseInt(reg.nbAdults)+parseInt(reg.nbChildrens);
      
      //if (nbPersons>0) {

        // Type of room
        var roomTypes = {};
        for (var i = 0; i< rooms.length; i++){
          roomTypes[rooms[i].id]=rooms[i].id+", 1-"+rooms[i].Ps+" personer";
        };

        html+="<div style='width: 399px'>";
        html+=getHtmlSelect('roomType', '', roomTypes, reg.roomType , "Välj typ av rum");
        html+="<div id='room_image'></div>";
        html+=getHtmlSelect('shareRoom', '', shareRoomValues, reg.shareRoom); //, "Hur vill du dela rum");
        html+=getInput('text', 'shareWith', '', '', 'medlemsnummer');

        //html+="<div class='field' style='width: auto;'>"+getCheckBox('package', 'chkSmall', 'package', reg.package, 'Paketerbjudande')+"</div>";
        var selPackages = {};
        for (var i = 0; i< packages.length; i++){
          selPackages[packages[i].id]=packages[i].label;
        }
        html+=getHtmlSelect('package', '', selPackages, reg.package, "Välj paketerbjudande");
        html+="</div><br>";

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
        html+="<tr><td colspan='4'>&nbsp;</td><td><hr></tr>";
        html+="<tr><td colspan='4'>&nbsp;</td><td><div id='total' class='price'></div></td></tr>";
        html+="</table>";

        html += "</div></div>";
      //} else {
      //    html += "<br><br><br><br>";
      //}
      
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
      var type = $(this).attr("type");
      if (type===undefined) type = $(this).get(0).tagName.toLowerCase();
      var value;
      switch (type) {
        case "select":
          value = $(this).find('option:selected').attr("value");
          if (value===undefined) value=$(this).find('option:selected').text();
          break;
        case "text":
          value = $(this).val();
          break;
        case "checkbox":
          value = $(this).prop('checked');
      }
      // alert(id+": "+value);
      reg[id]=value;
      doRegistrationUpdate();
    }

    function doRegistrationUpdate() {

      var total = 0;
      var notSharing = (reg.shareRoom==="3");
      var sharingWith = (reg.shareRoom==="2");
      var nbAdults = parseInt(reg.nbAdults);
      var nbChildrens = parseInt(reg.nbChildrens);
      if (nbAdults !== nbAdults) nbAdults=0;
      if (nbChildrens !== nbChildrens) nbChildrens=0;

      if (sharingWith) {
        $( "#shareRoom" ).animate({width:'55%'}, function() {$("#shareWith").fadeIn();});
      } else {
        $("#shareWith").fadeOut(function() {$("#shareRoom").animate({width:'100%'});});
      }

      //alert(JSON.stringify(reg, null, 4));

      // determine selected package
      var packages = getHotelPackages();
      var package;
      for (var i = 0; i< packages.length; i++){
          if (packages[i].id===reg.package) {
            package = packages[i];
            break;
          }
      }

      // get the room data
      var rooms = getHotelRooms();
      var room;
      for (var i=0; i<rooms.length; i++) {
        if (rooms[i].id===reg.roomType) {
          room = rooms[i];
          break;
        }
      }

      // Perform som checks
      if (package!==undefined && package.id==="matologi" && room===undefined) {
        showMessage("Välj typ av rum först!");
        $("#roomType").focus();
        return;
      }

      //  select the ones in package and sync the checkboxes
      var events = getHotelEvents();
      for (var i=0; i<events.length; i++) {
        var event = events[i];
        var isRoom = (event.id.substring(0,1)==="N");
        var inPackage = (package && ($.inArray(event.id, package.events)>=0));
        if (inPackage) reg[event.id]=true;
        var disabled = inPackage;
        if (event.linked!==undefined) {
          disabled=true;                            // linked events are always disabled
          reg[event.id]=reg[event.linked];
        }
        
        // Night are always disabled unless a logi package is choosen
        if (isRoom) {
            disabled = !(package!==undefined && package.id!=="matologi");
        }
        
        if (disabled) {
          $("#"+event.id).attr("disabled", true);
        } else {
          $("#"+event.id).removeAttr("disabled");
        }
        $("#"+event.id).prop('checked', reg[event.id]);

      }

      // Select / deselect on change
      if (lastReg.roomType!==reg.roomType) {
        $("#room_image").html("<div>"+room.description+"</div><img src='images/opalen/"+reg.roomType+".jpg' width='400'>");
        lastReg.roomType=reg.roomType
      }

      // Compute price
      if (reg.package) {
        var price = package.price;
        if (price===undefined) price=package["price_"+reg.roomType];
        if (price!==undefined) {
            price = (nbAdults*price)+(nbChildrens*(price/2));
            price = Math.floor(price+.5);
            total += price;
        }
      }

      // handle each event
      for (var i=0; i<events.length; i++){

        var event = events[i];
        var id=event.id;
        var price=0;
        var selected = reg[id];
        var isRoom = (id.substring(0,1)==="N");

        // set the price value info
        if (isRoom) {
          if (room===undefined) {
            if (selected) {
              showInfo(id, "Välj typ av rum först!");
              $("#"+id).prop('checked', false);
              reg[id]=false;
              for (var j=0; j<events.length; j++){
                if (events[j].linked && events[j].linked===id) {
                  $("#"+events[j].id).prop('checked', false);
                  reg[events[j].id]=false;
                }
              }
            }
          } else {
            var ps = room["Ps"];
            if (notSharing) {
                price = room["1N1P"];
            } else {
                price = Math.floor((room["1N"+ps+"P"]/ps)+.5);
            }
          }
        } else {
          price = event.price;
        }

        price = (nbAdults*price)+(nbChildrens*(price/2));
        price = Math.floor(price+.5);
        var s = (price>0) ? price+" kr" : "";
        $("#price_"+id).html(s);
        
        if (selected) {
          if (package) {
            if (!($.inArray(id, package.events)>=0)) {                           // if package selected and event not part of package
                total += price;
            } else {
                if (isRoom && notSharing) total += room["1P+"];                 // Add extra when not sharing room included in package
            }
          } else {
            total += price;
          }
        }

      }

      $("#total").html("<b>"+total+" kr</b>");

      if (lastTotal!==total) {
        alertify.log("Summa: "+total+" kr");
        lastTotal=total;
      }

      // Check if package should be used
      var n=0;
      var shouldUsePackage;
      for (var i=0; i<packages.length; i++){
        var pck = packages[i];
        var ok = true;
        for (var j=0; j<pck.events.length; j++) {
          var id = pck.events[j];
          if (!reg[id]) {
            ok = false;
            break;
          }
        }
        if (ok) {
          if (pck.events.length>n) {
            shouldUsePackage = pck;
            n=pck.events.length;
          }
        }
      }
      if (shouldUsePackage) {
        if (package.id!==shouldUsePackage.id) {
          alertify.log("Paketerbjudande "+shouldUsePackage.label+" blir billigare!");
        }
      }

    }


    function getHtml3(callback) {
      var html="Registration page 3...";
      html += getBrowsingBar();
      setTimeout(callback(html), 1);
    }

    function getRegistrationHeader() {
        
      var transKeys = ["createAccount", "moreAboutYou", "foodAndShelter", "events"];
      
      var html = "";
      if (step>0) {
        html +="<div class='registration_menu'>";
        for (var key in transKeys) {
            if (key>0) html += "<div id='btnReg"+key+"' class='button' onClick='registrator.doRegMenuClick("+key+");' style='display: inline; margin-right: 5px;'>"+trans.get(transKeys[key], language)+"</div>";
        }
        html+="</div><br>";
      }
      html+="<div class='header'>"+trans.get(transKeys[step], language)+"</div><br>";
      
      return html;
    }

    function getBrowsingBar() {
      var html = "<div id='lblMessage'></div><div class='buttonBar'>";
      if (step>1) html+="<div id='btnPrevious' class='button' style='float: left;'>Föregående</div>";
      if (step<stepsCount) html+="<div id='btnNext' class='button' style='float: right;'>Nästa</div>";
      html+="</div>";
      return html;
    }

    function performStep(callback) {

        switch (step) {
            case 0:
                user.id = $("#username").val();
                var password = $("#password").val();
                backend.createUser(user.id, password, createUserCallback);
                break;
            case 1:
                user.email = $("#email").val();
                user.gender = $("#gender").val();
                user.phone = $("#phone").val();
                user.arrival = $("#arrival").val();
                backend.setUserInfo(user.id, user, answerCallback);
                break;
            case 2:
                backend.setUserHotellReg(reg, answerCallback);
                break;
            default:
        }

        function createUserCallback(answer) {
            if (answer.success) {
                var password = $("#password").val();
                backend.login(user.id, password, loginUserCallback);
            } else {
                $("#lblMessage").html(trans.get(answer.message, language));
                alertify.error(answer.message);
            }

            function loginUserCallback(success) {
                if (success) {
                    backend.getUser(getUserInformationCallback);
                    backend.getUserHotellReg(getUserHotellRegCallback);
                    populateMenuMember();
                    setTimeout(function () {
                        callback(true);
                    }, 200);
                    $("#btnReg" + step).removeClass("selected");
                } else {
                    $("#lblMessage").html("Oops!");
                }

            }

        }

        function answerCallback(answer) {
            if (answer.success) {
                $("#btnReg" + step).removeClass("selected");
                callback(true);
            } else {
                $("#lblMessage").html(answer.message);
                alertify.error(answer.message);
            }
        }

    }

    function nopCallback() {
      // Do nothing
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

    function showMessage(msg) {
      alertify.error(msg);
      //$("#lblMessage").html(msg).hide().fadeIn(.2).fadeOut(.2).fadeIn().delay(2000).fadeOut();
    }

    function showInfo(id, msg) {
      alertify.error(msg);
      //$("#price_"+id).html("<div id='info_"+id+"' style='color: red;'>"+msg+"</div>");
      //$("#info_"+id).hide().fadeIn(.2).fadeOut(.2).fadeIn().delay(2000).fadeOut();
    }

}
