var request = require("request");
var path = require("path");
var marked = require("marked");

// Read the usage file once.
var USAGE = require("fs").readFileSync(path.join(__dirname, "README.md"), "UTF-8");
// Assume markdown.
USAGE = marked(USAGE);
exports.usage = function() {
    return USAGE;
};



exports.api = function(req, res) {
    var file = req.query.data;
    var extension = ".txt";

    switch(file) {
        case "accesslog":
            extension = ".log";
            break;
        case "html":
            extension = ".html";
            break;
        case "json":
            extension = ".json";
            break;
        case "longtext":
            extension = ".txt";
            break;
        case "text":
            extension = ".txt";
            break;
        case "wordlist":
            extension = ".txt";
            break;
        case "xml":
            extension = ".xml";
            break;
        case "yaml":
            extension = ".yaml";
            break;
        default:
            console.log("lorimpbro received unkown data request:", file);
            file = "text";
            extension = ".txt";
            break;
    }

    res.sendfile(path.join(__dirname, "data", file+extension));
};
