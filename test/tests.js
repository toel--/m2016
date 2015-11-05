var backend = MensaBackend;
if (!backend.getList) {
    backend = new MensaBackend;
}

QUnit.test( "getList test", testGetList);
QUnit.test( "getMap test", testGetMap);
QUnit.test( "getMapList test", testGetMapList);

QUnit.test( "getText test", testGetText);

QUnit.test( "login failure test", testLoginFailure);
QUnit.test( "login as admin test", testLoginAsAdmin);

QUnit.test( "getUser test", testGetUser);
// QUnit.test( "createUser test", testCreateUser);
QUnit.test( "setUserInfo test", testSetUserInfo);

QUnit.test( "setText test", testSetText);

function testGetList( assert ) {

    console.log("testGetList");

    var done = assert.async();
    backend.getList(callback);

    function callback(list) {

      assert.equal(list.length, 3);
      assert.ok($.inArray("item1", list)!==-1);

      for (var i = 0; i< list.length; i++){
          console.log(i+": "+list[i]);
      }

      done();

    }

}

function testGetMap( assert ) {

    console.log("testGetMap");

    var done = assert.async();
    backend.getMap(callback);

    function callback(map) {

      assert.equal(map["id"], 1);

      for (var key in map){
          console.log(key+" => "+map[key]);
      }
      done();
    }
}

function testGetMapList( assert ) {

    console.log("testGetMapList");

    var done = assert.async();
    backend.getMapList(callback);

    function callback(maplist) {
      assert.equal(maplist.length, 3);
      assert.equal(maplist[0]["id"], 1);
      done();
    }
}

function testGetText( assert ) {

    console.log("testGetText");

    var done = assert.async();
    backend.getText("test", "sv", callback);

    function callback(text) {
      assert.equal(text, "Test");
      done();
    }
}

function testLoginFailure( assert ) {

    console.log("testLoginFailure");

    var done = assert.async();
    backend.login("thisuserdoesnotexists", "norethispassword", callback);

    function callback(success) {
      assert.ok(!success);
      done();
    }

}


function testLoginAsAdmin( assert ) {

    console.log("testLoginAsAdmin");

    var done = assert.async();
    backend.login("madmin", "removeme!", callback);

    function callback(success) {
      assert.ok(success);
      backend.logout();
      done();
    }

}

/********* Users **************************************************************/

function testGetUser( assert ) {

    console.log("testGetUser");

    var doneTestGetUser = assert.async();
    backend.logout();
    window.setTimeout(function() {testGetUser_A(assert);}, 1000);

    function testGetUser_A( assert ) {

      var done = assert.async();
      backend.getUser("madmin", callbackNotLoggedIn);
      function callbackNotLoggedIn(user) {
        assert.equal(user, null);
        done();
        window.setTimeout(function() {testGetUser_B(assert);}, 100);
      }
    }

    function testGetUser_B( assert ) {
      backend.login("user", "removeme!", callbackLoginUser);
      function callbackLoginUser(success) {

        // Users skall not be able to see other users
        var done = assert.async();
        backend.getUser("madmin", callback1);
        function callback1(user) {
          assert.equal(user, null);
          done();
          window.setTimeout(function() {testGetUser_C(assert);}, 100);
        }
      }
    }

    function testGetUser_C( assert ) {

        // Users skall be able to see themselves
        var done = assert.async();
        backend.getUser("user", callback2);
        function callback2(user) {
          assert.equal(user.id, "user");
          done();
          window.setTimeout(function() {testGetUser_D(assert);}, 100);
        }

    }

    function testGetUser_D( assert ) {

      backend.login("madmin", "removeme!", callbackLoginAdmin);
      function callbackLoginAdmin(success) {

        assert.equal(success, true);

        // Admins are allowed to see all users
        var done = assert.async();
        backend.getUser("madmin", callback1);
        function callback1(user) {
          assert.equal(user.id, "madmin");
          done();
        }
        backend.getUser("user", callback2);
        function callback2(user) {
          assert.equal(user.id, "user");
          doneTestGetUser();
        }

      }

    }
}
    
function testCreateUser( assert ) {

  console.log("testCreateUser");

  var doneCreateUser = assert.async();
  backend.logout(testCreateUser_A);
  
  function testCreateUser_A(retvalue) {
    var done = assert.async();
    backend.getUser("madmin", callbackNotLoggedIn);
    function callbackNotLoggedIn(user) {
      assert.equal(user, undefined);
      done();
      testCreateUser_B();
    }
  }
  
  function testCreateUser_B() {
  
    backend.login("madmin", "removeme!", callbackLogin);

    function callbackLogin(success) {

      var done1 = assert.async();
      backend.createUser("madmin", "removeme!", callback1);
      function callback1(answer) {
        assert.equal(answer.success, false);
        done1();
        testCreateUser_C();
      }
    }
  }

  function testCreateUser_C() {
    var done2 = assert.async();
    backend.createUser("test", "", callback2);
    function callback2(answer) {
      assert.equal(answer.success, false);
      done2();
      testCreateUser_D();
    }
  }
  
  function testCreateUser_D() {

    backend.getUser("1970001", callback3);
    function callback3(user) {

      assert.equal(user, null);

      backend.createUser("1970001", "123456789", callback4);
      function callback4(answer) {
        assert.equal(answer.success, true);

        backend.getUser("1970001", callback5);
        function callback5(user) {
          assert.equal(user.id, "1970001");
          doneCreateUser();
        }

      }

    }

  }

}

function testSetUserInfo( assert ) {

  console.log("testSetUserInfo");

  var doneSetUserInfo = assert.async();
  backend.logout();
  window.setTimeout(function() {testSetUserInfo_A(assert);}, 1000);

  function testSetUserInfo_A(assert) {  

    var done = assert.async();
    backend.setUserInfo("madmin", 1, "toel@toel.se", "0712345678", callback);
    function callback(answer) {
      assert.equal(answer.success, false);
      done();
      window.setTimeout(function() {testSetUserInfo_B(assert);}, 100);
    }
  }

  function testSetUserInfo_B(assert) { 
    backend.login("madmin", "removeme!", callbackLoginAdmin);
    function callbackLoginAdmin(success) {

      var done1 = assert.async();
      backend.getUser("madmin", callback1);
      function callback1(user) {
        assert.equal(user.id, "madmin");
        assert.equal(user.email, "toel@toel.se");
        done1();
        window.setTimeout(function() {testSetUserInfo_C(assert);}, 100);
      }
    }
  }

  function testSetUserInfo_C(assert) { 
    var done2 = assert.async();
    backend.setUserInfo("madmin", 1, "toel@toel.se", "0712345678", callback2);
    function callback2(answer) {
      assert.equal(answer.success, true);
      done2();
      window.setTimeout(function() {testSetUserInfo_D(assert);}, 100);
    }
  }

  function testSetUserInfo_D(assert) { 
    backend.getUser("madmin", callback3);
    function callback3(user) {
      assert.equal(user.id, "madmin");
      assert.equal(user.email, "toel@toel.se");
      doneSetUserInfo();
    }

  }
}


/************ TEXT ************************************************************/

function testSetText( assert ) {

    console.log("testSetText");

    var done = assert.async();
    var s = "This is a test";

    backend.login("madmin", "removeme!", callbackLogin);

    function callbackLogin(success) {

      assert.ok(success);
      if (success) {
        backend.setText("test", "en", s)
        backend.getText("test", "en", callback);

        function callback(text) {
          assert.equal(text, s);
          done();
        }
      }
    }


}
