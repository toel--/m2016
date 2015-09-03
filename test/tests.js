var backend = new MensaBackend;

QUnit.test( "getList test", testGetList);
QUnit.test( "getMap test", testGetMap);
QUnit.test( "getMapList test", testGetMapList);

QUnit.test( "getText test", testGetText);

QUnit.test( "login failure test", testLoginFailure);
QUnit.test( "login as admin test", testLoginAsAdmin);
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
    backend.login("admin", "", callback);

    function callback(success) {
      assert.ok(success);
      done();
    }

}

function testSetText( assert ) {

    console.log("testSetText");

    var done = assert.async();
    var s = "This is a test";

    backend.login("admin", "", callbackLogin);

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
