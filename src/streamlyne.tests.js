console.log("Starting Tests");

// Example creating connection
var conn = Streamlyne.connect({"host":"http://127.0.0.1:5000/", "email":"testing@streamlyne.co", "token":"sl-dev"});
console.log(conn);

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
  Streamlyne.asset.readAll(conn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
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
  Streamlyne.attribute.readAll(conn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
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
  Streamlyne.group.readAll(conn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
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
  Streamlyne.log.readAll(conn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
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
  Streamlyne.organization.readAll(conn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
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
  Streamlyne.site.readAll(conn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
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

  Streamlyne.user.readAll(conn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    start();
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

  Streamlyne.workOrder.readAll(conn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    start();
  }); 

});

asyncTest( "Create", function() {
  expect( 1 );

  Streamlyne.workOrder.create(conn, {
    "data": {
      "description": "This is a test Work Order at "+new Date()+"."
    }
  }, function(error, result) {
    console.log("Created Work Order",error, result);
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

var workOrder = new StreamlyneWorkOrder();
workOrder.readAll(conn, function(error, result) {
    console.log(error, result);
}); 

/*
var request = StreamlyneRequest(conn);
request.readAll("workOrder").run(function(error, result) {
    console.log(error, result);
});

StreamlyneRequest(conn).readAll("workOrder").limit(10).run(function(error, result) {
    console.log(error, result);
});
*/

