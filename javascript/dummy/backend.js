/* http://javascript.crockford.com/private.html */
function MensaBackend() {

    // constructor
    var that = this;
    dbUsers = TAFFY( getJsonUsers() );
    dbText = TAFFY( getJsonText() );
    var loggedInUser = false;
    var reg = {"roomType":"","package":"","shareRoom":"0"};

    /**** public ****/

    // for qunit test
    this.getList = function(callback) {

        var list = ["item1", "item2", "item3"];
        setTimeout(function(){callback(list);}, 200);

    };

    // for qunit test
    this.getMap = function(callback) {
        var map = {};
        map["id"]=1;
        map["label"]="Hej!";

        setTimeout(function(){callback(map);}, 200);
    };


    // for qunit test
    this.getMapList = function(callback) {

        var map1 = {"id":1,"label":"Good"};

        var map2 = {};
        map2["id"]=2;
        map2["label"]="morning";

        var map3 = {};
        map3["id"]=3;
        map3["label"]="vietnam!";

        var maplist = [map1, map2, map3];

        setTimeout(function(){callback(maplist);}, 200);
    };

    // loggin
    this.login = function(id, password, callback) {

      var success = false;
      user = dbUsers({id:id}).first();
      if (user!==undefined) {
        success = (user["password"]===password);
      }
      if (success) {
        loggedInUser = user;
      }

      setTimeout(function(){callback(success);}, 200);

    }

    // logout
    this.logout = function() {

      loggedInUser = false;

    }

    // To allow changes
    this.isAdmin = function(callback) {
      setTimeout(function(){callback(loggedInUser && loggedInUser.admin);}, 200);
    }
    
    this.getUser = function(id, callback) {

      var user;
      
      if (callback === undefined) {
          callback = id;
          if (loggedInUser) {
            getUser(loggedInUser.id, callback);
        } else {
            setTimeout(function(){callback(null);}, 200);
        }
      } else {
        if (loggedInUser && (loggedInUser.admin || loggedInUser.id === id)) {
            user = dbUsers({"id":id}).first();
        }
        if (user===false) user=null;
        setTimeout(function(){callback(user);}, 200);
      }

    }

    // create a user
    this.createUser = function(id, password, callback) {

      var answer = {"success":true, "message":""};
      var user = dbUsers({"id":id}).first();

      if (password.length<5) {
        answer["success"]=false;
        answer["message"]="Lösenordet är för kort!<br>Välj ett lösenord med minst 5 tecken.";
      }

      if (id.length!=7 || !isNumeric(id)) {
        answer["success"]=false;
        answer["message"]="Felaktig medlemsnummer";
      }
      if (user!==false) {
        answer["success"]=false;
        answer["message"]="Medlemsnumret är redan registrerad.<br>Välj 'Logga in' i menyn i stället.";
      }

      if (answer["success"]) {
        dbUsers.insert({"id":id,"password":password,"email":"","admin":false});
      }

      setTimeout(function(){callback(answer);}, 200);

    };

    // set the user info
    this.setUserInfo = function(id, gender, email, callback) {

      var answer = {"success":true, "message":""};
      var user = dbUsers({"id":id}).first();

      if (loggedInUser && (loggedInUser.admin || loggedInUser.id === id)) {

        dbUsers({id:id}).update({"email":email,"gender":gender});

      } else {
          answer["success"]=false;
          answer["message"]="nekat tillträde";
      }
      setTimeout(function(){callback(answer);}, 200);

    };

    /**************************************************************************/

    this.getUserHotellReg = function(callback) {
        
        setTimeout(function(){callback(reg);}, 200);
        
    }
    
    this.setUserHotellReg = function(data, callback) {
        
        reg = data;
        var answer = {"success":true, "message":""};
        setTimeout(function(){callback(answer);}, 200);
        
    }


    /**************************************************************************/

    // get a text
    this.getText = function(id, lang, callback) {

      var text = dbText({id:id}).first()[lang];
      setTimeout(function(){callback(text);}, 200);

    };

    // get a text
    this.setText = function(id, lang, text) {

      if (loggedInUser && loggedInUser.admin) {
        dbText({id:id}).update(lang, text);
      }

    };



    /********** private **********/
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

}
