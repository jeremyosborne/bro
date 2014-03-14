var fs = require("fs");
var path = require("path");
var marked = require("marked");
var request = require("request");


// Read the usage file once.
var USAGE = fs.readFileSync(path.join(__dirname, "README.md"), "UTF-8");
// Assume markdown.
USAGE = marked(USAGE);
exports.usage = function() {
    return USAGE;
};


// Use the geo.placefinder available through YQL.
var whereURL = 'http://query.yahooapis.com/v1/public/yql?format=json&q=select * from geo.placefinder where gflags="R" and text="{LAT},{LON}"';

exports.api = function(req, res) {
    // be forgiving with how the arguments are passed.
    var latitude = req.param("latitude");
    var longitude = req.param("longitude");

    var url = whereURL.replace("{LAT}", latitude).replace("{LON}", longitude);

    var revgeoResponse = {
        // Basic layout of response.
        error: null,
        latitude: latitude || null,
        longitude: longitude || null,
        address: null,
    };

    request(url, function(error, response, contentBody) {
        // Attempt to build the interpoloated address, or fail.
        var address;

        if (error || response.statusCode != 200) {
            revgeoResponse.error = "Error contacting the reverse geocoding service.";
        }
        else {
            try {
                address = JSON.parse(contentBody).query.results.Result;
                address = Array.isArray(address) ? address[0] : address;
                revgeoResponse.address = address.line1 + " " + address.line2;
            }
            catch(e) {
                revgeoResponse.error = "Could not parse address.";
            }
        }

        res.send(revgeoResponse);
    });
};
