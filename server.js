// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint for Whoami:
app.get("/api/whoami", function (req, res) {
  /// Get the remote address:
  let ip = req.get('x-forwarded-for') || req.connection.remoteAddress;
  
  // Use only the first IP addres if provided more:
  ip = ip.slice(0, 14);
  
  res.json({
    "ipaddress": ip,
    "language": req.get("Accept-Language"),
    "software": req.get("User-Agent")
  });
});

// listen for requests:
var listener = app.listen(process.env.PORT);
