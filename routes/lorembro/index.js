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


// Assumption: files have unique basenames.
var lorems = {
    "accesslog": "accesslog.log",
    "hearthstone": "hearthstone.json",
    "html": "html.html",
    "json": "json.json",
    "longtext": "longtext.txt",
    "text": "text.txt",
    "wordlist": "wordlist.txt",
    "xml": "xml.xml",
    "yaml": "yaml.yaml",
};



exports.api = function(req, res) {
    var dataType = req.query.data || "text";
    var file;

    if (dataType in lorems) {
        file = lorems[dataType];
    }
    else {
        console.log("lorimbro request for unknown data type: %s, defaulting to text.", dataType);
        file = "text.txt";
    }

    res.sendfile(path.join(__dirname, "data", file));
};
