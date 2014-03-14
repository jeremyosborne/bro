// Load all the routes:
var path = require("path");
var fs = require("fs");



// Register test page.
exports.home = function(req, res) {
    res.render('home', {});
};



console.log("Begin loading all route packages.");
require("fs").readdirSync("./routes").forEach(function(p) {
    var fullpath = path.resolve(path.join(__dirname, p));
    if (fullpath == path.join(__dirname, "index.js")) {
        console.log("Not loading:", fullpath);
    }
    else if (fs.statSync(fullpath).isDirectory()) {
        console.log("Loading:", fullpath);
        // Short directory name becomes module reference.
        module.exports[p] = require(fullpath);
    }
    else {
        console.log("Not loading:", fullpath);
    }
});
console.log("Done loading all route packages.");
