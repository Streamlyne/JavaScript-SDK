//console.log("Starting Tests");

// Example creating connection
// Non-Authentication
var noAuthConn = Streamlyne.connect({"host":"http://127.0.0.1:5000/"});
var authConn = Streamlyne.connect({"host":"http://127.0.0.1:5000/", "email":"testing@streamlyne.co", "token":"sl-dev"});


test( "Testing QUnit", function() {
  ok( 1 == "1", "Passed!" );
});

// New node
var node = {id: null};

/**
Asset
--------------------------------------------------------------------------
*/
module("Steamlyne - Asset", { });
asyncTest( "Read All", function() {
  expect( 1 );
  Streamlyne.asset.readAll(authConn, function(error, result) {
    //console.log('readall asset', error, result);
    if (!error) 
    {
        ok( true, "Passed and ready to resume!" );
    }
    else
    {
        ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Create", function() {
    //console.log('Create test');
    expect( 1 );
    Streamlyne.asset.create(authConn, {
        "data": {
          "description": "This is an Asset.",
          "number_asset": "A"+new Date().getTime(),
          "number_serial": ""+(new Date().getTime() * 3)
        }
    }, function(error, result) {
        //console.log("Created User",error, result);
        if (!error)
        {
            node.id = result.id;
          ok( true, "Passed and ready to resume! Node Id: "+node.id );
        }
        else
        {
          ok( false, error.message);
        }
        start();
    }); 
});
asyncTest( "Read with Id", function() {
  expect( 1 );
  //console.log('Start Read With Id: '+node.id);
  Streamlyne.asset.readWithId(authConn, node.id, function(error, result) {
    //console.log("Read Work Order with Id", node.id, error, result);
    if (!error && result.id === node.id)
    {
      ok( true, "Passed and ready to resume! Node Id: "+node.id );
    }
    else
    {
      ok( false, error && error.message);
    }
    start();
  }); 
});
asyncTest( "Update with Id", function() {
  expect( 1 );
  console.log(node.id);
  Streamlyne.asset.updateWithId(authConn, node.id, {
        "data": {
          "description": "This is an Asset.",
          "number_asset": "A"+new Date().getTime(),
          "number_serial": ""+(new Date().getTime() * 3)
        }
  }, function(error, result) {
    console.log("Created Asset",error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume! Node Id: "+node.id );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});

asyncTest( "Delete with Id", function() {
  expect( 1 );
  //console.log('Delete With Id');
  Streamlyne.asset.deleteWithId(authConn, node.id, function(error, result) {
    //console.log("Delete Work Order with Id", node.id, error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume! Node Id: "+node.id );
    }
    else
    {
      ok( false, error.message);
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
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Create", function() {
  expect( 1 );
  Streamlyne.attribute.create(authConn, {
    "data": {
      "name": "Pressure",
      "description": "This is the Asset's pressure attribute.",
      "data_type": "kPa"
    }
  }, function(error, result) {
    //console.log("Created User",error, result);
    if (!error)
    {
        node.id = result.id;
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Read with Id", function() {
  expect( 1 );
  //console.log('Start Read With Id: '+node.id);
  Streamlyne.attribute.readWithId(authConn, node.id, function(error, result) {
    //console.log("Read Work Order with Id", node.id, error, result);
    if (!error && result.id === node.id)
    {
      ok( true, "Passed and ready to resume! Node Id: "+node.id );
    }
    else
    {
      ok( false, error && error.message);
    }
    start();
  }); 
});
asyncTest( "Delete with Id", function() {
  expect( 1 );
  //console.log('Delete With Id');
  Streamlyne.attribute.deleteWithId(authConn, node.id, function(error, result) {
    //console.log("Delete Work Order with Id", node.id, error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
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
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Create", function() {
  expect( 1 );
  Streamlyne.group.create(authConn, {
    "data": {
      "name": "Unit Testers",
      "description": "This is a group for unit testing."
    }
  }, function(error, result) {
    //console.log("Created User",error, result);
    if (!error)
    {
        node.id = result.id;
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Read with Id", function() {
  expect( 1 );
  //console.log('Start Read With Id: '+node.id);
  Streamlyne.attribute.readWithId(authConn, node.id, function(error, result) {
    //console.log("Read Work Order with Id", node.id, error, result);
    if (!error && result.id === node.id)
    {
      ok( true, "Passed and ready to resume! Node Id: "+node.id );
    }
    else
    {
      ok( false, error && error.message);
    }
    start();
  }); 
});
asyncTest( "Delete with Id", function() {
  expect( 1 );
  //console.log('Delete With Id');
  Streamlyne.attribute.deleteWithId(authConn, node.id, function(error, result) {
    //console.log("Delete Work Order with Id", node.id, error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
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
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Create", function() {
  expect( 1 );
  Streamlyne.log.create(authConn, {
    "data": {
      "name": "Unit Test Log Sheet",
      "description": "This is an example log sheet."
    }
  }, function(error, result) {
    //console.log("Created User",error, result);
    if (!error)
    {
        node.id = result.id;
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Read with Id", function() {
  expect( 1 );
  //console.log('Start Read With Id');
  Streamlyne.log.readWithId(authConn, node.id, function(error, result) {
    //console.log("Read Work Order with Id", node.id, error, result);
    if (!error && result.id === node.id)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Delete with Id", function() {
  expect( 1 );
  //console.log('Delete With Id');
  Streamlyne.log.deleteWithId(authConn, node.id, function(error, result) {
    //console.log("Delete Work Order with Id", node.id, error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
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
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Create", function() {
  expect( 1 );
  Streamlyne.organization.create(authConn, {
    "data": {
      "name": "Unit Test Organization "+new Date().getTime()
    }
  }, function(error, result) {
    console.log("Created Organization",error, result);
    if (!error)
    {
        node.id = result.id;
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});

asyncTest( "Read with Id", function() {
  expect( 1 );
  //console.log('Start Read With Id');
  Streamlyne.organization.readWithId(authConn, node.id, function(error, result) {
    //console.log("Read Work Order with Id", node.id, error, result);
    if (!error && result.id === node.id)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Delete with Id", function() {
  expect( 1 );
  //console.log('Delete With Id');
  Streamlyne.organization.deleteWithId(authConn, node.id, function(error, result) {
    //console.log("Delete Work Order with Id", node.id, error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
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
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Create", function() {
  expect( 1 );
  Streamlyne.site.create(authConn, {
    "data": {
      "name": "Unit Test Site",
      "location": "Unit Test Location"
    }
  }, function(error, result) {
    //console.log("Created User",error, result);
    if (!error)
    {
        node.id = result.id;
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});

asyncTest( "Read with Id", function() {
  expect( 1 );
  //console.log('Start Read With Id');
  Streamlyne.site.readWithId(authConn, node.id, function(error, result) {
    //console.log("Read Work Order with Id", node.id, error, result);
    if (!error && result.id === node.id)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Delete with Id", function() {
  expect( 1 );
  //console.log('Delete With Id');
  Streamlyne.site.deleteWithId(authConn, node.id, function(error, result) {
    //console.log("Delete Work Order with Id", node.id, error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
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
      ok( false, error.message);
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
        node.id = result.id;
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});

asyncTest( "Incorrect Login - Requires User Read All to pass", function() {
  expect( 1 );
  var testConn = 
  Streamlyne.connect({"host":"http://127.0.0.1:5000/"})
  .authenticate(newUserEmail, newUserPassword+"incorrect", function(error, testConn){
    console.log('authenticated connection', testConn, testConn.getUserId());
    Streamlyne.user.readAll(testConn, function(error, result) {
      console.log(error, result);
      if (!error && !!error.message)
      {
        ok( true, "Passed and ready to resume! Error message: "+error.message );
      }
      else
      {
        ok( false, "Server Error: Missing appropriate error message response.");
      }
      start();
    }); 
  });
});

asyncTest( "Login - Requires User Read All to pass", function() {
  expect( 1 );
  var testConn = 
  Streamlyne.connect({"host":"http://127.0.0.1:5000/"})
  .authenticate(newUserEmail, newUserPassword, function(error, testConn){
    console.log('authenticated connection', testConn, testConn.getUserId());
    Streamlyne.user.readAll(testConn, function(error, result) {
      console.log(error, result);
      if (!error && testConn.getUserId())
      {
        ok( true, "Passed and ready to resume! Authenticated user: "+testConn.getUserId() );
      }
      else
      {
        ok( false, error.message);
      }
      start();
    }); 
  });
});
asyncTest( "Delete with Id", function() {
  expect( 1 );
  //console.log('Delete With Id');
  Streamlyne.user.deleteWithId(authConn, node.id, function(error, result) {
    //console.log("Delete Work Order with Id", node.id, error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume! Deleted Node Id: "+node.id );
    }
    else
    {
      ok( false, error.message);
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

  Streamlyne.workOrder.readAll(authConn, function(error, result) {
    //console.log(error, result);
    if (!error) 
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
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
        node.id = result.id;
        ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Read with Id", function() {
  expect( 1 );
  //console.log('Start Read With Id');
  Streamlyne.workOrder.readWithId(authConn, node.id, function(error, result) {
    //console.log("Read Work Order with Id", node.id, error, result);
    if (!error && result.id === node.id)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});
asyncTest( "Delete with Id", function() {
  expect( 1 );
  //console.log('Delete With Id');
  Streamlyne.workOrder.deleteWithId(authConn, node.id, function(error, result) {
    //console.log("Delete Work Order with Id", node.id, error, result);
    if (!error)
    {
      ok( true, "Passed and ready to resume!" );
    }
    else
    {
      ok( false, error.message);
    }
    start();
  }); 
});


/**
Relationships
--------------------------------------------------------------------------
*/
module("Steamlyne - Relationships", {
});
asyncTest( "Add Relationship", function() {
  expect( 6 );

  //console.log('Test - Add Relationship');
  //console.log('Creating Log');

  Streamlyne.log.create(authConn, {
    "data": {
      "name": "Unit Test Log Sheet",
      "description": "This is an example log sheet."
    }
  }, function(error, result) {
    //console.log("Created User",error, result);
    if (!error)
    {
        node.id = result.id;

        ok( true, "Passed. Created Log "+node.id+"." );

        Streamlyne.attribute.create(authConn, {
            "data": {
              "name": "Pressure",
              "description": "This is the Asset's pressure attribute.",
              "data_type": "kPa"
            }
        }, function(error, result) {
            //console.log("Created User",error, result);
            if (!error)
            {
                var attr = {};
                attr.id = result.id;
                //
                var relsType = "relationship";

                ok( true, "Passed. Created Attribute "+attr.id+"." );

                Streamlyne.log.addRelationshipBetweenIds(authConn, node.id, attr.id, relsType, function(error, result){
    
                    if (!error)
                    {
                        ok( true, "Passed. Added relationship." );

                        Streamlyne.log.readWithId(authConn, node.id, function(error, result) {

                            //console.log('Read after add relationship', error, result);

                            if (!error && result.id === node.id)
                            {
                                ok( true, "Passed and ready to resume!" );

                                // Clean up
                                Streamlyne.log.deleteWithId(authConn, node.id, function(error, result) {
                                    //console.log("Delete Work Order with Id", node.id, error, result);
                                    if (!error)
                                    {
                                        ok( true, "Passed cleanup. Deleted log "+node.id+"." );

                                        // Clean up
                                        Streamlyne.attribute.deleteWithId(authConn, attr.id, function(error, result) {
                                            //console.log("Delete Work Order with Id", node.id, error, result);
                                            if (!error)
                                            {
                                              ok( true, "Passed cleanup. Deleted attribute "+attr.id+"." );
                                            }
                                            else
                                            {
                                              ok( false, error.message);
                                            }
                                            start();
                                        }); 

                                    }
                                    else
                                    {
                                      ok( false, error.message);
                                    start();
                                    }
                                }); 

                            }
                            else
                            {
                                ok( false, error.message);
                                start();
                            }
                        }); 

                    }
                    else
                    {
                        ok( false, error.message);
                        start();
                    }

                });

            }
        });
    }
    else
    {
      ok( false, error.message);
    start();
    }
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

