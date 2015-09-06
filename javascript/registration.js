/* http://javascript.crockford.com/private.html */
function Registrator() {

    // constructor
    var that = this;
    var step = 0;
    var stepsCount = 3;

    /**** public ****/

    this.getHtml = function(callback) {

      var html;
      switch (step) {
        case 0: html = getCreateAccountHtml(); break;
        case 1: html = getHtml1(); break;
        case 2: html = getHtml2(); break;
        case 3: html = getHtml3(); break;
        default: html = "Oops!";
      }
      setTimeout(callback(html), 200);
    };

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
    function getCreateAccountHtml() {
      var html = "<div class='registration_box' >" + getRegistrationHeader();
      html+="Ange ditt medlemsnummer och välj ett lösenord:<br> \
      <input type='text' id='username' placeholder='Medlemsnummer'/><br> \
      <input type='password' id='password' placeholder='Lösenord'/><br></div>";
      html += getBrowsingBar();
      return html;
    }

    function getHtml1() {
      var html = "<div class='registration_box' >" + getRegistrationHeader();
      html += "Registration page 1...<br>(Not implemented yet!)";
      return html;
    }

    function getHtml2() {
      var html="Registration page 2...";
      html += getBrowsingBar();
      return html;
    }

    function getHtml3() {
      var html="Registration page 3...";
      html += getBrowsingBar();
      return html;
    }

    function getRegistrationHeader() {
      var html = "<div class='header'>###title###</div>";
      if (step>0) html += "steg "+step+" av "+stepsCount;
      html += "<br><br><br>";
      var title;
      switch (step) {
        case 0: title = "Skapa ett konto"; break;
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
          var username = $("#username").val();
          var password = $("#password").val();
          backend.createUser(username, password, createUserCallback);
          break;
        default:

      }

      function createUserCallback(answer) {
        if (answer.success) {
          callback(true);
        } else {
          $("#lblMessage").html(answer.message);
        }
      }
    }

}
