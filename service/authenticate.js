var app         = require("restify");
var Database    = require('./database');
var db          = new Database();

function Authenticate() {
    'use strict';
    return;
}

Authenticate.prototype.login = function (req, res, next) {
    'use strict';
    var logininfo = req.params;
    if (logininfo.strUserName === undefined || logininfo.strPassword === undefined) {
        return next(new app.InvalidArgumentError('User Name must be supplied'));
    }    
    var sql = "SELECT count(*) FROM saus1 WHERE UserId = '" + logininfo.strUserName + "' or Password = '" + logininfo.strPassword + "'";
    db.execSQLselectCount(sql, res);
	return next();
};

module.exports = Authenticate;