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
    var url = req.param("url");
    var method = req.param("method") || "GET";
    var headers = {};
    var form;

    // Normalize the entries that are supposed to be JSON.
    // Failure here is not necessarily an error.
    try {
        headers = JSON.parse(req.body.headers);
    }
    catch(e) {}
    try {
        form = JSON.parse(req.body.form);
    }
    catch(e) {}


    request({
        url: url,
        method: method,
        headers: headers,
        form: form,
    }, function (error, response, body) {
        res.send({
            request: {
                url: url,
                method: method,
                headers: headers,
                form: form,
            },
            response: {
                error: error+"" || null,
                status: (response && response.statusCode) || null,
                headers: (response && response.headers) || null,
                body: body || null
            }
        });
    });

};
