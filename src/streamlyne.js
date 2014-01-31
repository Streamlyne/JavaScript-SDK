/**
 @class Streamlyne JavaScript SDK
 @name Streamlyne
 
 @tutorial Installation
 
 @example 
 
 var sl = Streamlyne.connect({"host":"http://localhost:5000/", "email":"testing@streamlyne.co", "token":"sl-dev"});
 
 @author Glavin Wiechert
 @version 0.2.0
 @constructor
 */
(function (Streamlyne, global, TAFFY, moment, undefined)
{
    /**
     Self-referential
     */
    var self = Streamlyne;

    /**
     Private Properties
     
     @access private
     */
    //var dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss Z';

    /**
     Public Properties
     
     @access public
     */
    self.version = '0.2.0';

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
    self.connect = function ()
    {
        return new StreamlyneConnection(arguments[0]);
    };

    /**
     Private Methods
     
     @memberOf Streamlyne
     @access private
     */
/*
    var private = function() {
        console.log("Example Private Method");
    };
    */

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
    var StreamlyneConnection = function (options)
    {
        //console.log('Creating Steamlyne Connection', options);
        var self = this;
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
        self.loadOptions = function (options)
        {
            // Host
            if (options.host)
            {
                host = options.host;
            }
            // Authentication Email
            if (options.email)
            {
                email = options.email;
            }
            // Authentication Token
            if (options.token)
            {
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
        self.apiRequest = function (method, path, data, callback)
        {
            //console.log("Streamlyne API Request: ", arguments);
            // Check if host is not null
            if (!host)
            {
                var error = new Error('Streamlyne Server Host URL not yet specified.');
                callback && callback(error, null);
                return this;
            }
            // Check path
            if (!path)
            {
                path = '';
            }
            // Check data
            if (!data)
            {
                data =
                {
                };
            }
            // Check headers
            if (!headers)
            {
                headers =
                {
                };
            }
            // Check if already authenticated
            if (email && token)
            {
                headers['x-sl-email'] = email;
                headers['x-sl-token'] = token;
            }

            //headers["Access-Control-Request-Method"] = method;
            //headers["Access-Control-Request-Headers"] = method;
            headers['Content-Type'] = 'application/json';

            console.log(headers);
            // 
            var url = host + 'api/' + path + (method === 'GET' ? '?p=' + JSON.stringify(data) : '');
            var http = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            console.log(method, url);
            http.open(method, url, true); //url is the url echoing the jsonString
            // Set headers
            for (var header in headers)
            {
                var value = headers[header];
                // console.log("header:", header, value);
                http.setRequestHeader(header, value);
            }
            //
            var isSuccessful = function (readyState, statusCode)
            {
                return (readyState === 4 && (parseInt(statusCode / 100) === 2));
            };
            // 
            http.onreadystatechange = function ()
            {
                //console.log('onreadystatechange', http.readyState, http.status);
                
                // Attempt to parse responseText
                var jsonResponse = null;
                var error = null;
                var responseTxt = http.responseText;
                try
                {
                    // Check if responseText is falsy   
                    if (!responseTxt)
                    {
                        // Empty string
                        jsonResponse = {};
                    }
                    else
                    {
                        // Try and parse
                        jsonResponse = JSON.parse(responseTxt);
                    }
                }
                catch (e)
                {
                    // Could not parse to JSON
                    jsonResponse = {};
                    // 
                    error = new Error('Could not parse into JSON: '+responseTxt);
                }

                // Check if request is successful
                if (isSuccessful(http.readyState, http.status))
                {
                    // Completed & Successful: should not have an error.
                    error = null;
                    // Return
                    return callback && callback(error, jsonResponse);
                }
                else
                {
                    // Not Completed or Unsuccessful
                    // Check if Completed
                    if (http.readyState === 4)
                    {
                        // Must be unsuccessful / error occured.
                        error = new Error(responseTxt);
                        // Return
                        return callback && callback(error, jsonResponse);
                    }
                }
            };
            // Send the request
            console.log(JSON.stringify(data));
            http.send(JSON.stringify(data));

            return self;
        };


        /**
         Authenticate this StreamlyneConnection with a User.
         @param email User's email.
         @param password User's password.
         @param callback The callback, takes (Error, StreamlyneConnect).
         */
        self.authenticate = function (email, password, callback)
        {
            self.apiRequest('POST', 'authenticate', {
                'email': email,
                'password': password
            }, function (error, data)
            {
                console.log('authenticate', error, data);
                if (!error)
                {
                    self.loadOptions(
                    {
                        'email': data.email,
                        'token': data.token
                    });
                }
                return callback && callback(error, self);
            });
            return self;
        };

        // Load options from arguments
        self.loadOptions(options);

        self.display = function ()
        {
            console.log(host, email, token);
            return self;
        };

        return self;
    };

    /**
     @class StreamlyneRequest
     @name StreamlyneRequest
     */
    var StreamlyneRequest = function (conn)
    {
        var self = this;
        if (!(this instanceof StreamlyneRequest))
        {
            return new StreamlyneRequest(conn);
        }

        // Variables
        self.connection = null, self.data =
        {
            method: 'GET',
            path: '',
            query: {
            }
        };
        self.doneCallbacks = [];
        /**
         Clears all of the request object working data.
         @memberOf StreamlyneRequest
         */
        self.clear = function ()
        {
            this.clearQuery();
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.clearQuery = function ()
        {
            this.data =
            {
                method: 'GET',
                path: '',
                query: {
                }
            };
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.setConnection = function (conn)
        {
            this.connection = conn;
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.read = function (path)
        {
            this.data.method = 'GET';
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
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.create = function (path)
        {
            this.data.method = 'POST';
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
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.delete = function (path)
        {
            this.data.method = 'DELETE';
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
        };

        /**
         
         @memberOf StreamlyneRequest
         */
        self.query = function (newQuery)
        {
            this.data.query = newQuery || this.data.query || {
            };
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.filter = function (newFilter)
        {
            this.data.query = this.data.query || {
            };
            this.data.query.filter = newFilter || this.data.query.filter || {
            };
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.filterFields = function (newFields)
        {
            this.data.query = this.data.query || {
            };
            this.data.query.filter = this.data.query.filter || {
            };
            this.data.query.filter.fields = newFields || this.data.query.filter.fields || true;
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.filterRelationships = function (newRels)
        {
            this.data.query = this.data.query || {
            };
            this.data.query.filter = this.data.query.filter || {
            };
            this.data.query.filter.rels = newRels || this.data.query.filter.rels || true;
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.limit = function (pageCount)
        {
            this.data.query = this.data.query || {
            };
            this.data.query.page = this.data.query.page || {
            };
            this.data.query.page.count = pageCount || this.data.query.page.count || 0;
            return this;
        },
        /**
         
         @memberOf StreamlyneRequest
         */
        self.getPageWithId = function (pageId)
        {
            this.data.query = this.data.query || {
            };
            this.data.query.page = this.data.query.page || {
            };
            this.data.query.page.id = pageId || this.data.query.page.id || 0;
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.done = function (callback)
        {
            //console.log(this.doneCallbacks);
            if (callback !== null)
            {
                this.doneCallbacks.push(callback);
            }
            return this;
        };
        /**
         
         @memberOf StreamlyneRequest
         */
        self.run = function (callback)
        {
            this.connection.display();
            console.log(this.connection);
            // Check for required data
            if (this.connection === undefined)
            {
                console.log('Requires a StreamlyneConnection.');
                return {
                };
            }
            else
            if (this.data && this.data.method && this.data.path && this.data.query)
            {
                //
                this.done(callback);
                // Run query
                var self = this;
                this.connection.apiRequest(
                this.data.method, this.data.path, this.data.query, function (error, result)
                {
                    console.log(self.data.method + ' API Request:', error, result);
                    //console.log(self.doneCallbacks);
                    // Process callbacks
                    if (self.doneCallbacks)
                    {
                        self.doneCallbacks.reverse();
                        for (var i = 0, len = self.doneCallbacks.length; i < len; i++)
                        {
                            var curr = self.doneCallbacks.pop();
                            if (typeof curr === 'function')
                            {
                                curr(error, result);
                            }
                        }
                    }
                    self.doneCallbacks = [];
                });
            }
            else
            {
                console.log('Does not meet requirements.', this.data);
            }
            return this;
        };

        //
        self.setConnection(conn); // Set connection
        // 
        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneRequest = StreamlyneRequest;

    /**
     @class StreamlyneNode
     @name StreamlyneNode
     
     */
    var StreamlyneNode = function ()
    {
        //console.log("Creating Streamlyne Node");
        var self = this;
        //console.log(this, self);
        /**
         @memberOf StreamlyneNode
         */
        self.data =
        {
        };
        /**
         @memberOf StreamlyneNode
         */
        self.relationships =
        {
        };

        /**
         Read All.
         @memberOf StreamlyneNode
         @return StreamlyneNode Self-Referential.
         */
        self.readAll = function (conn, callback)
        {
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
            new StreamlyneRequest(conn)
            .read(this.type() + '/')
            .filterFields(true)
            .filterRelationships(true)
            .run(function (error, result)
            {
                console.log('Request Complete: ', error, result);
                try
                {
                    // TODO: Wrap the JSON nodes in their respective StreamlyneNode objects.
                    /*
                    // Parse nodes
                    var nodes = result.nodes;
                    for (var n = 0, len = nodes.length; n < len; n++)
                    {
                        var node = nodes[n];
                        //console.log(node);
                    }
                    */
                    // Return nodes
                    return callback && callback(error, result);
                }
                catch (e)
                {
                    return callback && callback(e, []);
                }
            });
            return this;
        };

        /**
         Read node with ID.
         @memberOf StreamlyneNode
         @return StreamlyneNode Self-Referential.
         */
        self.readWithId = function (conn, nodeId, callback)
        {
            console.log('readWithId', nodeId);
            // Validate input
            if (!nodeId)
            {
                var error = new Error('NodeId argument not defined in readWithId request.');
                callback && callback(error, {});
                return this;
            }
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
            new StreamlyneRequest(conn)
            .read(this.type() + '/' + nodeId)
            .filterFields(true)
            .filterRelationships(true)
            .run(function (error, result)
            {
                //console.log("Request Complete: ", error, result);
    
                // TODO: Wrap the JSON nodes in their respective StreamlyneNode objects.
                // Parse nodes
                /*
                var node = result;
                console.log(node);
                */
                // Return nodes
                return callback && callback(error, result);
            });
            return this;
        };
        /**
         Read node with ID.
         @memberOf StreamlyneNode
         @return StreamlyneNode Self-Referential.
         */
        self.readById = self.readWithId;

        /**
         Create node with `data` and `relationshps`.
         @memberOf StreamlyneNode
         @return StreamlyneNode Self-Referential.
         */
        self.create = function (conn, options, callback)
        {
            options = options || {
            };

            new StreamlyneRequest(conn).create(this.type()).query(
            {
                'data': options.data || {
                },
                'rels': options.relationships || []
            }).run(function (error, result)
            {
                //console.log('Request Complete: ', error, result);
                return callback && callback(error, result);
            });
            return this;
        };

        /**
         Delete node with ID.
         @memberOf StreamlyneNode
         @return StreamlyneNode Self-Referential.
         */
        self.deleteWithId = function (conn, nodeId, callback)
        {
            console.log('deleteWithId', nodeId);
            // Validate input
            if (!nodeId)
            {
                var error = new Error('NodeId argument not defined in readWithId request.');
                callback && callback(error, {});
                return this;
            }

            new StreamlyneRequest(conn)
            .delete(this.type() + '/' + nodeId)
            .filterFields(true)
            .filterRelationships(true)
            .run(function (error, result)
            {
                //console.log("Request Complete: ", error, result);
                return callback && callback(error, result);
            });
            return this;
        };
        /**
         Delete node with ID.
         @memberOf StreamlyneNode
         @return StreamlyneNode Self-Referential.
         */
        self.deleteById = self.deleteWithId;

        /**
        Add a relationship between two nodes.
        @memberOf StreamlyneNode
        @return StreamlyneNode Self-Referential.
        */
        self.addRelationshipBetweenIds = function(conn, startId, endId, relsType, callback)
        {
            console.log('addRelationshipBetweenIds', startId);
            //
            relsType = relsType || 'relationship';
            // Validate input
            if (!startId || !endId)
            {
                var error = new Error('StartId or EndId argument is not defined in addRelationshipBetweenIds request.');
                callback && callback(error, {});
                return this;
            }

            new StreamlyneRequest(conn)
            .create(this.type() + '/' + startId)
            .query({
                'data': { }, // No change to data
                'rels': {
                    'add': [
                        // Add single Relationship
                        {
                            'dir': 'in',
                            'id': endId,
                            'nodeType': '', // This can be empty, and server will fill it in
                            'relsType': relsType
                        }
                    ]
                }
            })
            .run(function (error, result)
            {
                //console.log("Request Complete: ", error, result);
                return callback && callback(error, result);
            });
            return this;
        };

        /**
        Check if the data of `this` and another Node are the same.
        @param otherNode
        @memberOf StreamlyneNode
        @return Boolean Is the data of `this` node the same as the `otherNode` passed in. 
        */
        self.equalTo = function(otherNode)
        {
            // TODO
            return this === otherNode;
        };

        /**
         Get Database
         @memberOf StreamlyneNode
         */
        var db =
        {
        };
        self.db = function ()
        {
            // Check if exists
            var d = db[this.type()];
            if (d === undefined)
            {
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
    var StreamlyneUser = function ()
    {
        var self = this;
        //console.log(this, self);
        self = new StreamlyneNode();
        /**
         @memberOf StreamlyneUser
         */
        self.type = function ()
        {
            return 'user';
        };
        /**
         @memberOf StreamlyneUser
         @return StreamlyneUser Self-Referential.
         */
        self.customUserClassOnlyFun = function ()
        {
            console.log('testUserFunction');
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneUser = StreamlyneUser;
    Streamlyne.user = new StreamlyneUser();

    /**
     @class StreamlyneWorkOrder
     @name StreamlyneWorkOrder 
     @inherits StreamlyneNode   
     */
    var StreamlyneWorkOrder = function ()
    {
        var self = this;
        //console.log(this, self);
        self = new StreamlyneNode();
        /**
         @memberOf StreamlyneWorkOrder
         */
        self.type = function ()
        {
            return 'workOrder';
        };
        /**
         @memberOf StreamlyneWorkOrder
         */
        self.customUserClassOnlyFun = function ()
        {
            console.log('testUserFunction');
            return this;
        };
        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneWorkOrder = StreamlyneWorkOrder;
    Streamlyne.workOrder = new StreamlyneWorkOrder();

    /**
     @class StreamlyneAsset
     @name StreamlyneAsset    
     @inherits StreamlyneNode
     */
    var StreamlyneAsset = function ()
    {
        var self = this;

        self = new StreamlyneNode();
        /**
         @memberOf StreamlyneAsset
         */
        self.type = function ()
        {
            return 'asset';
        };
        /**
         @memberOf StreamlyneAsset
         @return StreamlyneAsset Self-Referential.
         */
        self.customUserClassOnlyFun = function ()
        {
            console.log('testUserFunction');
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneAsset = StreamlyneAsset;
    Streamlyne.asset = new StreamlyneAsset();

    /**
     @class StreamlyneGroup
     @name StreamlyneGroup    
     @inherits StreamlyneNode
     */
    var StreamlyneGroup = function ()
    {
        var self = this;

        self = new StreamlyneNode();
        /**
         @memberOf StreamlyneGroup
         */
        self.type = function ()
        {
            return 'group';
        };
        /**
         @memberOf StreamlyneGroup
         @return StreamlyneGroup Self-Referential.
         */
        self.customUserClassOnlyFun = function ()
        {
            console.log('testUserFunction');
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneGroup = StreamlyneGroup;
    Streamlyne.group = new StreamlyneGroup();


    /**
     @class StreamlyneLog
     @name StreamlyneLog    
     @inherits StreamlyneNode
     */
    var StreamlyneLog = function ()
    {
        var self = this;

        self = new StreamlyneNode();
        /**
         @memberOf StreamlyneLog
         */
        self.type = function ()
        {
            return 'log';
        };
        /**
         @memberOf StreamlyneLog
         @return StreamlyneLog Self-Referential.
         */
        self.customUserClassOnlyFun = function ()
        {
            console.log('testUserFunction');
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneLog = StreamlyneLog;
    Streamlyne.log = new StreamlyneLog();

    /**
     @class StreamlyneAttribute
     @name StreamlyneAttribute    
     @inherits StreamlyneNode
     */
    var StreamlyneAttribute = function ()
    {
        var self = this;

        self = new StreamlyneNode();
        /**
         @memberOf StreamlyneAttribute
         */
        self.type = function ()
        {
            return 'attribute';
        };
        /**
         @memberOf StreamlyneAttribute
         @return StreamlyneAttribute Self-Referential.
         */
        self.customUserClassOnlyFun = function ()
        {
            console.log('testUserFunction');
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneAttribute = StreamlyneAttribute;
    Streamlyne.attribute = new StreamlyneAttribute();



    /**
     @class StreamlyneOrganization
     @name StreamlyneOrganization    
     @inherits StreamlyneNode
     */
    var StreamlyneOrganization = function ()
    {
        var self = this;

        self = new StreamlyneNode();
        /**
         @memberOf StreamlyneOrganization
         */
        self.type = function ()
        {
            return 'organization';
        };
        /**
         @memberOf StreamlyneOrganization
         @return StreamlyneOrganization Self-Referential.
         */
        self.customUserClassOnlyFun = function ()
        {
            console.log('testUserFunction');
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneOrganization = StreamlyneOrganization;
    Streamlyne.organization = new StreamlyneOrganization();

    /**
     @class StreamlyneSite
     @name StreamlyneSite    
     @inherits StreamlyneNode
     */
    var StreamlyneSite = function ()
    {
        var self = this;

        self = new StreamlyneNode();
        /**
         @memberOf StreamlyneSite
         */
        self.type = function ()
        {
            return 'site';
        };
        /**
         @memberOf StreamlyneSite
         @return StreamlyneSite Self-Referential.
         */
        self.customUserClassOnlyFun = function ()
        {
            console.log('testUserFunction');
            return this;
        };

        return self;
    };
    // Reveal Streamlyne to the global object.
    global.StreamlyneSite = StreamlyneSite;
    Streamlyne.site = new StreamlyneSite();



    // Reveal Streamlyne to the global object.
    // Window is the global object in most situations:
    return self;

} (window.Streamlyne = window.Streamlyne || {}, window, TAFFY, moment));
