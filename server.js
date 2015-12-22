// server.js

// Generate a new instance of express server.
var express = require('express')
  , http = require('http');

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

// Load the non admin map screen
app.get('/', function(req, res) {
  res.sendfile('./public/index.html')
});

app.use(express.static('public'));
