const errorhandler = require("errorhandler");
const express = require("express");
const expressFavicon = require("express-favicon");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
const _ = require("lodash");
const path = require("path");
const routes = require("./routes");

const processStartDate = new Date(Date.now());
const version = require("./package.json").version;

var server = function () {
  console.log("Starting bro");

  var app = express();

  app.use(morgan("combined"));
  app.set("port", process.env.PORT || 54242);

  app.set("views", path.join(__dirname, "views"));
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");

  app.use(expressFavicon(path.join(__dirname, "public/images/favicon.ico")));

  // rawBody consists of the unaltered content body of the request.
  app.use(function (req, res, next) {
    var contentType = req.header("content-type");
    // Add a rawBody property to the request no matter what.
    req.rawBody = "";
    // Opt in to things the bodyParser doesn't deal with.
    if (contentType == "text/plain") {
      req.on("data", function (chunk) {
        req.rawBody += chunk;
      });
      req.on("end", function () {
        next();
      });
    } else {
      // If we don't want it, pass this on to the bodyParser.
      next();
    }
  });
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(methodOverride());

  // Make things CORS friendly.
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  if ("development" == app.get("env")) {
    console.log("Application running in development mode.");
    app.use(errorhandler());
  }

  // Register APIs.
  _.each(routes, function (route, routeName, routes) {
    console.log("Registering route:", routeName);
    app.all("/api/" + routeName, routes[routeName].api);
  });

  // Explicitly define router. It shows priority, and makes me feel better.
  app.use(express.static(path.join(__dirname, "public")));

  // Usage page.
  app.all("/", function (req, res) {
    var usages = [];
    var route;

    for (route in routes) {
      if (typeof routes[route].usage == "function") {
        usages.push({ usage: routes[route].usage() });
      }
    }

    _.sortBy(usages, "usage");

    res.render("home", { usages, processStartDate: processStartDate.toString(), version });
  });

  app.listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
  });
};

if (require.main === module) {
  // Run as a server.
  server();
} else {
  // Export routes for external use.
  module.exports = routes;
}
