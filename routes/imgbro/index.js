var fs = require("fs");
var path = require("path");
var marked = require("marked");


// Build a list of all available images on startup.
var imgs = fs.readdirSync(path.join(__dirname, "images")).filter(function(f) {
    var ext = path.extname(f);
    return /^\.jpg$|^\.jpeg$|^\.gif$|^\.png$|/.test(ext);
});


// Read the usage file once.
var USAGE = fs.readFileSync(path.join(__dirname, "README.md"), "UTF-8");
// Assume markdown.
USAGE = marked(USAGE);
exports.usage = function() {
    return USAGE;
};



// Generate a list of images.
exports.api = function(req, res) {
    // If they're requesting an image...
    if (req.query.img) {
        res.sendfile(path.join(__dirname,
                            "images",
                            path.basename(req.query.img)));
        return;
    }

    // else send this list...
    // Guesstimate what our host is from the HTTP headers.
    var host = req.headers["host"] ? req.protocol+"://"+req.headers["host"] : "";
    // Hardcoded... for now... blah.
    var imgPath = req.path+"?img=";
    var imgSrcs = [];
    for (var i = 0; i < imgs.length; i++) {
        imgSrcs.push(host+imgPath+imgs[i]);
    }
    res.send({
        urls: imgSrcs,
    });
};
