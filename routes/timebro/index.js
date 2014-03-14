var fs = require("fs");
var path = require("path");
var marked = require("marked");



// Read the usage file once.
var USAGE = fs.readFileSync(path.join(__dirname, "README.md"), "UTF-8");
// Assume markdown.
USAGE = marked(USAGE);
exports.usage = function() {
    return USAGE;
};



exports.api = function(req, res) {
    res.send({
        time: Date.now(),
    });
};
