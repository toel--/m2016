/* http://javascript.crockford.com/private.html */
function MensaBackend() {

    // constructor
    var that = this;
    dbUsers = TAFFY( getJsonUsers() );
    dbText = TAFFY( getJsonText() );
    var isLoggedIn = false;
    var isAdmin = false;

    /**** public ****/

    // for qunit test
    this.getList = function(callback) {

        var list = ["item1", "item2", "item3"];
        setTimeout(callback(list), 200);

    };

    // for qunit test
    this.getMap = function(callback) {
        var map = {};
        map["id"]=1;
        map["label"]="Hej!";

        setTimeout(callback(map), 200);
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

        setTimeout(callback(maplist), 200);
    };

    // loggin
    this.login = function(id, password, callback) {

      var success = false;
      user = dbUsers({id:id}).first();
      if (user!==undefined) {
        success = (user["password"]===password);
      }
      if (success) {
        isLoggedIn = true;
        isAdmin = user["admin"];
      }

      setTimeout(callback(success), 200);

    }

    // logout
    this.logout = function() {

      isLoggedIn = false;
      isAdmin = false;

    }

    // To allow changes
    this.isAdmin = function(callback) {
      setTimeout(callback(isAdmin), 200);
    }


    // get a user
    this.getUser = function(id, callback) {

      var user;
      if (isLoggedIn) {
        user = dbUsers({"id":id}).first();
      }
      setTimeout(callback(user), 200);

    };

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
        answer["message"]="Medlemsnumret är redan registrerad";
      }

      if (answer["success"]) {
        dbUsers.insert({"id":id,"password":password,"email":"","admin":false});
      }

      setTimeout(callback(answer), 200);

    };


    // get a text
    this.getText = function(id, lang, callback) {

      var text = dbText({id:id}).first()[lang];
      setTimeout(callback(text), 200);

    };

    // get a text
    this.setText = function(id, lang, text) {

      if (isAdmin) {
        dbText({id:id}).update(lang, text);
      }

    };



    /********** private **********/
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

}
