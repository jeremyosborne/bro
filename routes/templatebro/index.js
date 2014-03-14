var fs = require("fs");
var path = require("path");
var Handlebars = require("handlebars");
var marked = require("marked");
var request = require("request");

// Read the usage file once.
var USAGE = fs.readFileSync(path.join(__dirname, "README.md"), "UTF-8");
// Assume markdown.
USAGE = marked(USAGE);
exports.usage = function() {
    return USAGE;
};

// Build our templates.
// All files are treated as handlebars templates.
var DATA_PATH = path.normalize(path.join(__dirname, "data"));
var TEMPLATES = {
    bare: Handlebars.compile(fs.readFileSync(DATA_PATH+"/bare.html", "UTF-8")),
    html: Handlebars.compile(fs.readFileSync(DATA_PATH+"/index.html", "UTF-8")),
    readme: Handlebars.compile(fs.readFileSync(DATA_PATH+"/README.md", "UTF-8")),
};


exports.api = function(req, res) {
    var type = req.query.type;
    var template;
    var context = {};

    switch(type) {
        case "html":
            break;
        case "bare":
            break;
        case "readme":
            context = {
                year: (new Date()).getFullYear(),
            };
            break;
        default:
            if (type) {
                console.log("templatebro received unknown type:", type);
            }
            type = "html";
            break;
    }

    // Send everything back plain text for cutting/pasting.
    res.type("text/plain");
    res.send(TEMPLATES[type](context));
};
