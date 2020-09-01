var qs = require("querystring");
var http = require("https");
var fs = require("fs");

var req;

var options = {
  method: "POST",
  hostname: "easypostapi-easypost-v1.p.rapidapi.com",
  port: null,
  path: "/v2/trackers",
  headers: {
    "x-rapidapi-host": "easypostapi-easypost-v1.p.rapidapi.com",
    "x-rapidapi-key": "9941eb10c3msh008ce8bd3efe177p107a49jsnb2768f9d860e",
    "content-type": "application/x-www-form-urlencoded",
    useQueryString: true,
  },
};

var trackingRequest = function(trackingNumber, carrierNumber) {
  req = http.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function() {
      var body = Buffer.concat(chunks);
      // console.log(body.toString());
      var data = JSON.parse(body.toString());
      console.log(JSON.stringify(data, null, 2));
      fs.writeFileSync("trackingfile.json", JSON.stringify(data, null, 2));
    });
  });

  req.write(
    qs.stringify({
      "tracker[carrier]": "USPS",
      "tracker[tracking_code]": "9374889727009104132569",
    })
  );
  req.end();
};

module.exports = trackingRequest;