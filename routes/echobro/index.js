var request = require("request");
var path = require("path");
var url = require("url");
var marked = require("marked");
var _ = require("underscore");



// Read the usage file once.
var USAGE = require("fs").readFileSync(path.join(__dirname, "README.md"), "UTF-8");
// Assume markdown.
USAGE = marked(USAGE);
exports.usage = function() {
    return USAGE;
};



exports.api = function(req, res) {
    // Piece together our response from the input.
    var parsedURL = url.parse(req.url, true);
    var requestEcho = {
        httpVersion: req.httpVersion,
        headers: req.headers,
        method: req.method,
        url: req.url,
        parsedURL: {
            protocol: parsedURL.protocol || "",
            auth: parsedURL.auth || "",
            hostname: parsedURL.hostname || "",
            port: parsedURL.port || "",
            pathname: parsedURL.pathname || "",
            hash: parsedURL.hash || "",
        },
        parsedQuery: parsedURL.query,
        rawBody: req.rawBody || "",
        parsedBody: req.body,
    };

    if (req.query.format == "html") {
        // Remap certain keys to array of {"name":name, "value":value} objects.
        requestEcho.headers = _.map(req.headers, function(value, name) {
            return {"name":name, "value":value};
        });
        requestEcho.parsedURL = _.map(requestEcho.parsedURL, function(value, name) {
            return {"name":name, "value":value};
        });
        requestEcho.parsedQuery = _.map(parsedURL.query, function(value, name) {
            return {"name":name, "value":value};
        });
        requestEcho.parsedBody = _.map(req.body, function(value, name) {
            return {"name":name, "value":value};
        });
        res.render("echobro", requestEcho);
    }
    else {
        res.send(requestEcho);
    }
};
