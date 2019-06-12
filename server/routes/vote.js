var db = require('../models'),
votesService =  require('../services/votesService');

exports.create = function (req, res){
    votesService.create(req, res);
};

exports.read = function (req, res){
    votesService.read(req, res);
};

exports.readAll = function (req, res){
    votesService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    
    if (data.password){
        console.log('Data: ' + JSON.stringify(data));
        data.password = security.hashPassword(data.password);
    }
    votesService.update(req, res, data);
};

exports.delete = function (req, res){
    votesService.delete(req, res);
};
