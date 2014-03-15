var routes = require('./routes');

var path = require('path');
var express = require('express');
var exphbs  = require('express3-handlebars');
var _ = require("underscore");

var app = express();

app.set('port', process.env.PORT || 54242);

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger('dev'));
// rawBody consists of the unaltered content body of the request.
app.use(function(req, res, next) {
    var contentType = req.header('content-type');
    // Add a rawBody property to the request no matter what.
    req.rawBody = '';
    // Opt in to things the bodyParser doesn't deal with.
    if (contentType == 'text/plain'){
        req.on('data', function(chunk){
            req.rawBody += chunk;
        });
        req.on('end', function(){
            next();
        });
    } else {
        // If we don't want it, pass this on to the bodyParser.
        next();
    }
});
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());



// Make things CORS friendly.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Explicitly define router. It shows priority, and makes me feel better.
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    console.log('Application running in development mode.');
    app.use(express.errorHandler());
}



// Register APIs.
_.each(routes, function(route, routeName, routes) {
    console.log("Registering route:", routeName);
    app.all('/api/'+routeName, routes[routeName].api);
});



// Usage page.
app.all('/', function(req, res) {
    var usages = [];
    var route;

    for (route in routes) {
        if (typeof routes[route].usage == "function") {
            usages.push({usage: routes[route].usage()});
        }
    }

    _.sortBy(usages, "usage");

    res.render('home', {usages: usages});
});



app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
