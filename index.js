var app             = require('restify');
var Connection      = require('tedious').Connection;
var Request         = require('tedious').Request;

var Authenticate    = require('./service/authenticate');
var auth            = new Authenticate();
var Database        = require('./service/database');
var db              = new Database();

var server = app.createServer({  
    name: 'WebApp RESTful Service',  
    versions: ['1.0.0']  
});
server.use(app.acceptParser(server.acceptable));
server.use(app.queryParser());
server.use(app.dateParser());
server.use(app.jsonp());
server.use(app.gzipResponse());
server.use(app.bodyParser());
server.use(
    function crossOrigin(req,res,next){
        'use strict';
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);


server.get('/', function (req, res, next) {
    res.send('hello');
	return next();
});

//server.get('/hello/:name', function respond(req, res, next) {
//	res.send('hello ' + req.params.name);
//});


server.post('/login/user', auth.login);

server.get('/tables/plcp1', function (req, res, next) {
    var sql = "select TrxNo,VoucherNo,InvoiceAmt,VendorName,InvoiceDate,StatusCode from plcp1";
    db.execSQLselectCol(sql, res);
	return next();
});


server.listen(3000, function(){
    console.log('%s listening at %s', server.name, server.url);
});
/* 
server.listen(process.env.PORT, function(){
    //console.log('%s listening at %s', server.name, server.url);
});*/