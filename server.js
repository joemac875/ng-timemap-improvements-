// server.js

// Generate a new instance of express server.
var express = require('express'), http = require('http');


var app = express();

/* This will allow Cozy to run your app smoothly but
 it won't break other execution environment */
var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
var server = http.createServer(app).listen(port, host, function() {
  console.log("Server listening to %s:%d within %s environment",
              host, port, app.get('env'));
});


//load the embeddable view 
app.get('/em', function(req, res) {
  res.sendfile('./public/views/iframe/index.html')
});

//home
app.get('/', function(req, res) {
  res.sendfile('./public/views/main/index.html')
});
//edit mode
app.get('/edit', function(req, res) {
  res.sendfile('./public/views/edit/index.html')
});

/* Built in CORS Proxy */ 
var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins 
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port+1, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port+1);
});

//serve the static components
app.use(express.static('public'));
	