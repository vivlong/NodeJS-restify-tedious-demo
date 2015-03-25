var app             = require('restify');
var Connection      = require('tedious').Connection;
var Request         = require('tedious').Request;
var TYPES           = require('tedious').TYPES;

var config = {
    server: '192.168.0.230',
    userName: 'sa',
    password: 'p@ssw0rd$',
    options: {
        debug: {
            packet: true,
            data: true,
            payload: true,
            token: false,
            log: true
        },
        database: 'CC802Freight',
        rowCollectionOnDone: 'true'
    }
};

function Database() {
    'use strict';
    return;
}

Database.prototype.execSQLselectCount = function(sql, res){
    'use strict';
    var connection = new Connection(config);
	connection.on('connect', function(err) {
		var objResult=[];
		var request = new Request(sql, function(err, rowCount) {
			if (err) {
                res.send({status: "failed"});
			} else {
                if(objResult[0].value > 0){
                    res.send({status: "success"});
                }else{
                    res.send({status: "failed"});
                }
			}
		});
        request.on('row', function(columns) {
			columns.forEach(function(column) {
				objResult.push({'value':column.value});
			});
		});
		connection.execSql(request);
	});
};

Database.prototype.execSQLselectCol = function(sql, res){
    'use strict';
    var connection = new Connection(config);
	connection.on('connect', function(err) {
		var objResult=[];
		var request = new Request(sql, function(err, rowCount) {
			if (err) {
				res.send(400,err);
            } else {
                res.send(objResult);
            }
        });
		request.on('row', function(columns) {
			var objRows=[];
			columns.forEach(function(column) {
				objRows.push({ key:column.metadata.colName, value:column.value });
			});
			objResult.push(objRows);
		});
		connection.execSql(request);
	});
};

Database.prototype.execSQLupdate = function(sql, res){
    'use strict';
    var connection = new Connection(config);
	connection.on('connect', function(err) {
		var objResult=[];
		var request = new Request(sql, function(err, rowCount) {
			if (err) {
                res.send({status: "failed"});
			}else{
                res.send({status: "success"});
            }
		});
		connection.execSql(request);
	});
};

module.exports = Database;