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
/*
Built in CORS Proxy
*/
app.get('/proxy/:file', function(req, res) {
      console.log(req.params.key);

});
//serve the static components
app.use(express.static('public'));
	