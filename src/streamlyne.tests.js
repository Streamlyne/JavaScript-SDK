//console.log("Starting Tests");

// Example creating connection
// Non-Authentication
var noAuthConn = Streamlyne.connect({"host":"http://127.0.0.1:5000/"});
var authConn = Streamlyne.connect({"host":"http://127.0.0.1:5000/", "email":"testing@streamlyne.co", "token":"sl-dev"});


test( "Testing QUnit", function() {
  ok( 1 == "1", "Passed!" );
});


/**
Asset
--------------------------------------------------------------------------
*/
module("Steamlyne - Asset", { });
asyncTest( "Read All", function() {
  expect( 1 );
  Streamlyne.asset.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});

/**
Attribute
--------------------------------------------------------------------------
*/
module("Steamlyne - Attribute", { });
asyncTest( "Read All", function() {
  expect( 1 );
  Streamlyne.attribute.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});

/**
Group
--------------------------------------------------------------------------
*/
module("Steamlyne - Group", { });
asyncTest( "Read All", function() {
  expect( 1 );
  Streamlyne.group.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});

/**
Log
--------------------------------------------------------------------------
*/
module("Steamlyne - Log", { });
asyncTest( "Read All", function() {
  expect( 1 );
  Streamlyne.log.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});
asyncTest( "Create", function() {
  expect( 1 );
  Streamlyne.log.create(authConn, {
    "data": {
      "name_first": "Glavin",
      "name_last": "Wiechert"
    }
  }, function(error, result) {
    //console.log("Created User",error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});


/**
Organization
--------------------------------------------------------------------------
*/
module("Steamlyne - Organization", { });
asyncTest( "Read All", function() {
  expect( 1 );
  Streamlyne.organization.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});

/**
Site
--------------------------------------------------------------------------
*/
module("Steamlyne - Site", { });
asyncTest( "Read All", function() {
  expect( 1 );
  Streamlyne.site.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});

/**
Users
--------------------------------------------------------------------------
*/
module("Steamlyne - Users", {
});
asyncTest( "Read All", function() {
  expect( 1 );
  Streamlyne.user.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});
var newUserEmail = "user-"+new Date().getTime()+"@streamlyne.co";
var newUserPassword = "password";
asyncTest( "Create", function() {
  expect( 1 );
  Streamlyne.user.create(authConn, {
    "data": {
      "name_first": "Glavin",
      "name_last": "Wiechert",
      "email": newUserEmail,
      "password": newUserPassword,
      "job_title": "Unit Tester"
    }
  }, function(error, result) {
    //console.log("Created User",error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});
asyncTest( "Login - Requires User Read All to pass", function() {
  expect( 1 );
  var testConn = 
  Streamlyne.connect({"host":"http://127.0.0.1:5000/"})
  .authenticate(newUserEmail, newUserPassword, function(error, testConn){
    console.log('authenticated connection', testConn);
    Streamlyne.user.readAll(testConn, function(error, result) {
      //console.log(error, result);
      if (!error) 
      {
        ok( true, "Passed and ready to resume!" );
      }
      else
      {
        ok( false, "Failed");
      }
      start();
    }); 
  });
});



/**
Work Orders
--------------------------------------------------------------------------
*/
module("Steamlyne - Work Orders", {
});
asyncTest( "Read All", function() {
  expect( 1 );

  Streamlyne.workOrder.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 

});

asyncTest( "Create", function() {
  expect( 1 );
  Streamlyne.workOrder.create(authConn, {
    "data": {
      "description": "This is a test Work Order at "+new Date()+"."
    }
  }, function(error, result) {
    //console.log("Created Work Order",error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, "Failed");
    }
    start();
  }); 
});

// ----------------------------------------------------

/*
// User, custom node
var user = new StreamlyneUser();
console.log(user);
user.readAll(conn, function(error, result) {
    console.log(error, result);
}); 
*/
/*
var workOrder = new StreamlyneWorkOrder();
workOrder.readAll(conn, function(error, result) {
    console.log(error, result);
}); 
*/
/*
var request = StreamlyneRequest(conn);
request.readAll("workOrder").run(function(error, result) {
    console.log(error, result);
});

StreamlyneRequest(conn).readAll("workOrder").limit(10).run(function(error, result) {
    console.log(error, result);
});
*/

