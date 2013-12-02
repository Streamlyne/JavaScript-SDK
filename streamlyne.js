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
(function( Streamlyne, undefined ) {
    /**
     Self-referential
    */
    var SL = self = Streamlyne;

    /**
    Private Properties

    @access private
    */
    var privateVarExample = true;

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
    
    @public
    */
    self.connect = function() {
        return new StreamlyneConnection(arguments[0]);
    };

    /**
    Private Methods

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
            
            // Test
            this.apiRequest("GET", "user", null, function(error, result) {
                console.log(error, result);
            });
            
            return this;
        };
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
            // 
            var url = host + "api/" + path; 
            var jsonResponse = {};
            var http = new XMLHttpRequest();
            http.open(method, url, true); //url is the url echoing the jsonString
            // Set headers
            console.log(headers);
            for (var header in headers) {
                var value = headers[header];
                // console.log("header:", header, value);
                http.setRequestHeader(header, value);
            }
            // 
            http.onreadystatechange = function () {
                console.log("onreadystatechange", this);
                if (http.readyState == 4 && http.status == 200) {
                    var responseTxt = http.responseText;
                    console.log(responseTxt);
                    jsonResponse = JSON.parse(responseTxt);
                    // jsonResponse = eval('(' + responseTxt + ')');
                    callback && callback(null, jsonResponse);
                 } else {
                    var error = new Error("Not yet implemented.");
                    callback && callback(error, null);
                 }
            }
            http.send(null);

            return this;
        };

        // Load options from arguments
        this.loadOptions(options);

        return this;
    }
    
    /**
    @class StreamlyneNode
    @name StreamlyneNode
    
    */
    var StreamlyneNode = function() {
        console.log("Creating Streamlyne Node");
        return this;
    };
    StreamlyneNode.prototype = {
        
    };

    /**
    Custom Nodes
    
    */

    

    // Reveal Streamlyne to the global object.
    // Window is the global object in most situations:
    return self;

}( window.Streamlyne = window.Streamlyne || {} ));