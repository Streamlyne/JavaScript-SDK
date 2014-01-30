/**
 @class Streamlyne JavaScript SDK
 @name Streamlyne
 
 @tutorial Installation

 @example 
 <script src="streamlyne.js"></script>
 var sl = Streamlyne.connect({"host":"http://localhost:5000/", "email":"testing@streamlyne.co", "token":"sl-dev"});

 @author Glavin Wiechert
 @version 0.0.1
 @constructor
*/
(function( Streamlyne, global, TAFFY, moment, undefined ) {
    /**
     Self-referential
    */
    var SL = self = Streamlyne;

    /**
    Private Properties

    @access private
    */
    var privateVarExample = true;
    var dateTimeFormat = "YYYY-MM-DDTHH:mm:ss Z";

    /**
    Public Properties

    @access public
    */
    self.version = "0.0.1";

    /** 
    Public methods
    
    @name Connect
    
    @example var sl = Streamlyne.connect( {
    "host":"http://localhost:5000/", 
    "email":"testing@streamlyne.co", 
    "token":"sl-dev"
    });
    
    @memberOf Streamlyne
    @public
    */
    self.connect = function() {
        return new StreamlyneConnection(arguments[0]);
    };

    /**
    Private Methods

    @memberOf Streamlyne
    @access private
    */
    var private = function() {
        console.log("Example Private Method");
    };

    /** 
    @class The StreamlyneConnection constructor.
    @name StreamlyneConnection    
    @example var sl = Streamlyne.connect( {
    "host":"http://localhost:5000/", 
    "email":"testing@streamlyne.co", 
    "token":"sl-dev"
    });
    
    @param {Object} options  The options for intiailizing this StreamlyneConnection. 
    
    @constructor
    */
    var StreamlyneConnection = function ( options ) {
        console.log("Creating Steamlyne Connection");
        var self = StreamlyneConnection;
        // Defaults
        var headers = null;
        var host = null;
        var email = null;
        var token = null;

        // Add methods
        /**
        @name   loadOptions
        @function   loadOptions
        @param  options The options.
        @memberOf   StreamlyneConnection
        */
        self.prototype.loadOptions = function(options) {
            // Host
            if (options.host) {

                host = options.host
            }
            // Authentication Email
            if (options.email) {
                email = options.email;
            }
            // Authentication Token
            if (options.token) {
                token = options.token;
            }

            /*
            // Test
            this.apiRequest("GET", "user", {"filters": {"fields":true,"rels":true}}, function(error, result) {
                console.log(error, result);
            });
            */
            return this;
        };
        /**
        @name apiRequest
        @function apiRequest
        @param method   {String} The method.
        @param path     The method.
        @param delta    The method.
        @param callback The method.
        @memberOf StreamlyneConnection
        */
        self.prototype.apiRequest = function(method, path, data, callback) {
            console.log("Streamlyne API Request: ", arguments);

            // Check if host is not null
            if (!host) {
                var error = new Error("Streamlyne Server Host URL not yet specified.");
                callback && callback(error, null);
                return this;
            }
            // Check path
            if (!path) {
                path = "";
            }
            // Check data
            if (!data) {
                data = {};
            }
            // Check headers
            if (!headers) {
                headers = {};
            }
            // Check if already authenticated
            if (email && token) {
                headers["x-sl-email"] = email;
                headers["x-sl-token"] = token;
            }

            //headers["Access-Control-Request-Method"] = method;
            //headers["Access-Control-Request-Headers"] = method;
            headers["Content-Type"] = "application/json";
            
            console.log(headers);
            // 
            var url = host + "api/" + path + (method=="GET"?"?p="+JSON.stringify(data):""); 
            var jsonResponse = {};
            var http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            console.log(method);
            http.open(method, url, true); //url is the url echoing the jsonString
            // Set headers
            for (var header in headers) {
                var value = headers[header];
                // console.log("header:", header, value);
                http.setRequestHeader(header, value);
            }
            //
            var isSuccessful = function(readyState, statusCode) {
              return ( readyState == 4 && (parseInt( statusCode / 100 ) == 2) );
            };
            // 
            http.onreadystatechange = function () {
              console.log('onreadystatechange', http.readyState, http.status);
              if ( isSuccessful(http.readyState, http.status) ) {
                console.log("Finished and OK!");
                var responseTxt = http.responseText;
                //console.log(responseTxt);
                jsonResponse = JSON.parse(responseTxt);
                console.log(jsonResponse);
                // jsonResponse = eval('(' + responseTxt + ')');
                return callback && callback(null, jsonResponse);
              } else {
                console.log(http.readyState)
                if (http.readyState == 4)
                {
                  console.log('Error!', http.status, http.responseText);
                  var responseTxt = http.responseText;
                  try {
                    jsonResponse = JSON.parse(responseTxt);
                    return callback && callback(error, jsonResponse);
                  } catch (e) {
                    var error = new Error(responseTxt);
                    return callback && callback(error, { });
                  }
                }
              }
            }
            http.send(JSON.stringify(data));

            return this;
        };

        // Load options from arguments
        this.loadOptions(options);

        return this;
    }
    
    /**
    @class StreamlyneRequest
    @name StreamlyneRequest
    */
    var StreamlyneRequest = (function(conn) {
        this.connection = conn;
        return {
            data : {
                method : "GET",
                path : "",
                query : { }
            },
            doneCallbacks : [ ],
            /**
            Clears all of the request object working data.
            @memberOf StreamlyneRequest
            */
            clear : function() {
                this.clearQuery();
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            clearQuery : function() {
                this.data = { 
                    method : "GET",
                    path : "",
                    query : { }
                };
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            connection : function(conn) {
                this.connection = conn;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            read : function(path) {
                this.data.method = "GET";
                this.data.path = path;
                /*
                this.data.query = {
                    "filter": {
                        "fields": true,
                        "rels": true
                    }
                };
                */
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            create : function(path) {
                this.data.method = "POST";
                this.data.path = path;
                /*
                this.data.query = {
                    "filter": {
                        "fields": true,
                        "rels": true
                    }
                };
                */
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            query : function(newQuery) {
                this.data.query = newQuery || this.data.query || { };
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            filter : function(newFilter) {
                this.data.query = this.data.query || { };
                this.data.query.filter = newFilter || this.data.query.filter || { } ;
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            filterFields : function(newFields) {
                this.data.query = this.data.query || { };
                this.data.query.filter = this.data.query.filter || { };
                this.data.query.filter.fields = newFields || this.data.query.filter.fields || true;                
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            filterRelationships : function(newRels) {
                this.data.query = this.data.query || { };
                this.data.query.filter = this.data.query.filter || { };
                this.data.query.filter.rels = newRels || this.data.query.filter.rels || true;
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            limit : function(pageCount) {
                this.data.query = this.data.query || { };
                this.data.query.page = this.data.query.page || { };
                this.data.query.page.count = pageCount || this.data.query.page.count || 0;
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            getPageWithId : function(pageId) {
                this.data.query = this.data.query || { };
                this.data.query.page = this.data.query.page || { };
                this.data.query.page.id = pageId || this.data.query.page.id || 0;
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            done : function(callback) {
                console.log(this.doneCallbacks);
                if (callback !== null) {
                    this.doneCallbacks.push( callback );
                }
                return this;
            },
            /**
            
            @memberOf StreamlyneRequest
            */
            run : function(callback) {
                // Check for required data
                if (connection === undefined) {
                    console.log("Requires a StreamlyneConnection.");
                    return { };
                } else 
                if (this.data &&
                    this.data.method &&
                    this.data.path &&
                    this.data.query ) {
                    //
                    this.done(callback);
                    // Run query
                    var self = this;
                    connection.apiRequest(
                        this.data.method,
                        this.data.path,
                        this.data.query,
                        function(error, result) {
                            console.log(self.data.method + " API Request:", error, result);
                            console.log(self.doneCallbacks);
                            // Process callbacks
                            if (self.doneCallbacks) {
                                self.doneCallbacks.reverse();
                                for (var i=0, len=self.doneCallbacks.length; i<len; i++) {
                                    var curr = self.doneCallbacks.pop();
                                    curr(error, result);
                                }
                            }
                            self.doneCallbacks = [ ];
                        }
                    );
                } else {
                    console.log("Does not meet requirements.", this.data);
                }
                return this;
            }
        };
    });
    // Reveal Streamlyne to the global object.
    global.StreamlyneRequest = StreamlyneRequest;

    /**
    @class StreamlyneNode
    @name StreamlyneNode
    
    */
    var StreamlyneNode = function() {
        console.log("Creating Streamlyne Node");
        var self = this;
        //console.log(this, self);

        /**
        @memberOf StreamlyneNode
        */
        self.data = { };
        /**
        @memberOf StreamlyneNode
        */
        self.relationships = { };

        /**
        Read All.
        @memberOf StreamlyneNode
        */
        self.readAll = function(conn, callback) {
            /*
            console.log("Read All ", this.type() );
            conn.apiRequest(
                "GET", 
                this.type(), 
                {"filter": {"fields":true,"rels":true}}, 
                function(error, result) {
                    console.log(error, result);
            });
            callback && callback(null,[]);
            */
            StreamlyneRequest(conn).read(this.type() + "/")
            .filterFields(true)
            .filterRelationships(true)
            .run(function(error, result) {
                console.log("Request Complete: ", error, result);
                // Parse nodes
                var nodes = result.nodes;
                console.log(nodes);
                for (var n=0, len=nodes.length; n<len; n++) {
                    var node = nodes[n];
                    console.log(node);
                }
                // Return nodes
                callback && callback(null, result);
            });
            return this;
        };

        /**
        Read node with ID.
        @memberOf StreamlyneNode
        */
        self.readWithId = function(conn, nodeId, callback) {
            /*
            console.log("Read All ", this.type() );
            conn.apiRequest(
                "GET", 
                this.type(), 
                {"filter": {"fields":true,"rels":true}}, 
                function(error, result) {
                    console.log(error, result);
            });
            callback && callback(null,[]);
            */
            StreamlyneRequest(conn).read(this.type()+"/"+nodeId)
            .filterFields(true)
            .filterRelationships(true)
            .run(function(error, result) {
                console.log("Request Complete: ", error, result);
                // Parse nodes
                var node = result;
                console.log(node);
                // Return nodes
                return callback && callback(null, result);
            });
            return this;
        };
        /**
        Read node with ID.
        @memberOf StreamlyneNode
        */
        self.readById = self.readWithId;

        /**
        Create node with `data` and `relationshps`.
        @memberOf StreamlyneNode
        @return StreamlyneNode Self-Referential.
        */
        self.create = function(conn, options, callback) {
          options = options || { };

          StreamlyneRequest(conn)
          .create(this.type())
          .query({
            "data": options.data || { },
            "rels": options.relationships || [ ]
          })
          .run(function(error, result){
            console.log("Request Complete: ", error, result);
            return callback && callback(error, result);
          });
          return this;
        };


        /**
        Get Database
        @memberOf StreamlyneNode
        */
        var db = { };
        self.db = function() {
            // Check if exists
            var d = db[this.type()];
            if (d === undefined) {
                d = TAFFY();
                db[this.type()] = d;
            }
            return d;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneNode = StreamlyneNode;
    
    /**
    @class StreamlyneUser
    @name StreamlyneUser    
    @inherits StreamlyneNode
    */
    var StreamlyneUser = function() {
        var self = this;
        //console.log(this, self);
        
        self = new StreamlyneNode;
        console.log(self.prototype);
        /**
        @memberOf StreamlyneUser
        */
        self.type = function() {
            return "user";
        };
        /**
        @memberOf StreamlyneUser
        @return StreamlyneUser Self-Referential.
        */
        self.customUserClassOnlyFun = function() {
            console.log("testUserFunction");
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneUser = StreamlyneUser;
    Streamlyne.user = StreamlyneUser();

    /**
    @class StreamlyneWorkOrder
    @name StreamlyneWorkOrder 
    @inherits StreamlyneNode   
    */
    var StreamlyneWorkOrder = function() {
        var self = this;
        //console.log(this, self);
        
        self = new StreamlyneNode;
        console.log(self.prototype);
        /**
        @memberOf StreamlyneWorkOrder
        */
        self.type = function() {
            return "workOrder";
        };
        /**
        @memberOf StreamlyneWorkOrder
        */
        self.customUserClassOnlyFun = function() {
            console.log("testUserFunction");
            return this;
        };
        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneWorkOrder = StreamlyneWorkOrder;
    Streamlyne.workOrder = StreamlyneWorkOrder();

    /**
    @class StreamlyneAsset
    @name StreamlyneAsset    
    @inherits StreamlyneNode
    */
    var StreamlyneAsset = function() {
        var self = this;
        
        self = new StreamlyneNode;
        /**
        @memberOf StreamlyneAsset
        */
        self.type = function() {
            return "user";
        };
        /**
        @memberOf StreamlyneAsset
        @return StreamlyneAsset Self-Referential.
        */
        self.customUserClassOnlyFun = function() {
            console.log("testUserFunction");
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneAsset = StreamlyneAsset;
    Streamlyne.asset = StreamlyneAsset();

    /**
    @class StreamlyneGroup
    @name StreamlyneGroup    
    @inherits StreamlyneNode
    */
    var StreamlyneGroup = function() {
        var self = this;
        
        self = new StreamlyneNode;
        /**
        @memberOf StreamlyneGroup
        */
        self.type = function() {
            return "user";
        };
        /**
        @memberOf StreamlyneGroup
        @return StreamlyneGroup Self-Referential.
        */
        self.customUserClassOnlyFun = function() {
            console.log("testUserFunction");
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneGroup = StreamlyneGroup;
    Streamlyne.group = StreamlyneGroup();


    /**
    @class StreamlyneLog
    @name StreamlyneLog    
    @inherits StreamlyneNode
    */
    var StreamlyneLog = function() {
        var self = this;
        
        self = new StreamlyneNode;
        /**
        @memberOf StreamlyneLog
        */
        self.type = function() {
            return "user";
        };
        /**
        @memberOf StreamlyneLog
        @return StreamlyneLog Self-Referential.
        */
        self.customUserClassOnlyFun = function() {
            console.log("testUserFunction");
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneLog = StreamlyneLog;
    Streamlyne.log = StreamlyneLog();

    /**
    @class StreamlyneAttribute
    @name StreamlyneAttribute    
    @inherits StreamlyneNode
    */
    var StreamlyneAttribute = function() {
        var self = this;
        
        self = new StreamlyneNode;
        /**
        @memberOf StreamlyneAttribute
        */
        self.type = function() {
            return "user";
        };
        /**
        @memberOf StreamlyneAttribute
        @return StreamlyneAttribute Self-Referential.
        */
        self.customUserClassOnlyFun = function() {
            console.log("testUserFunction");
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneAttribute = StreamlyneAttribute;
    Streamlyne.attribute = StreamlyneAttribute();



    /**
    @class StreamlyneOrganization
    @name StreamlyneOrganization    
    @inherits StreamlyneNode
    */
    var StreamlyneOrganization = function() {
        var self = this;
        
        self = new StreamlyneNode;
        /**
        @memberOf StreamlyneOrganization
        */
        self.type = function() {
            return "user";
        };
        /**
        @memberOf StreamlyneOrganization
        @return StreamlyneOrganization Self-Referential.
        */
        self.customUserClassOnlyFun = function() {
            console.log("testUserFunction");
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneOrganization = StreamlyneOrganization;
    Streamlyne.organization = StreamlyneOrganization();

    /**
    @class StreamlyneSite
    @name StreamlyneSite    
    @inherits StreamlyneNode
    */
    var StreamlyneSite = function() {
        var self = this;
        
        self = new StreamlyneNode;
        /**
        @memberOf StreamlyneSite
        */
        self.type = function() {
            return "user";
        };
        /**
        @memberOf StreamlyneSite
        @return StreamlyneSite Self-Referential.
        */
        self.customUserClassOnlyFun = function() {
            console.log("testUserFunction");
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneSite = StreamlyneSite;
    Streamlyne.site = StreamlyneSite();



    // Reveal Streamlyne to the global object.
    // Window is the global object in most situations:
    return self;

}( window.Streamlyne = window.Streamlyne || {}, window, TAFFY, moment ));
