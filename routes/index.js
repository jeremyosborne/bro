// Load all the routes:
var path = require("path");
var fs = require("fs");

var moduleExports = Object.create(null);

require("fs").readdirSync("./routes").forEach(function(p) {
    var fullpath = path.resolve(path.join(__dirname, p));
    if (fs.statSync(fullpath).isDirectory()) {
        // Short directory name becomes module reference.
        moduleExports[p] = require(fullpath);
        // DEBUG
        //console.log("routes: loading:", fullpath);
    }
    else {
        // DEBUG
        //console.log("routes: not loading:", fullpath);
    }
});

module.exports = moduleExports;
