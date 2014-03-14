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


var messageId = 1;
var messages = [];
exports.api = function(req, res) {
    var message;

    if (req.param("reset")) {
        // reset takes precedence
        messages = [];
        res.send({
            status: {
                response: "Messages cleared.",
                error: false,
            },
            messages: messages,
        });
    }
    else if (req.param("history")) {
        res.send({
            status: {
                response: null,
                error: false,
            },
            messages: messages,
        });
    }
    else if (req.param("user") && req.param("message")) {
        message = {
            id: messageId++,
            date: Date.now(),
            user: req.param("user"),
            message: req.param("message"),
        };
        messages.unshift(message);
        messages = messages.slice(0, 100);
        res.send({
            status: {
                response: "Message added to the list.",
                error: false,
            },
            messages: messages,
        });
    }
    else {
        res.send({
            status: {
                response: "Could not compute request.",
                error: true,
            },
            messages: null,
        });
    }
};
