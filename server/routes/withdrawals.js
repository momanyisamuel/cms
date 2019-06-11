var db = require('../models'),
withdrawalsService =  require('../services/withdrawalsService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('withdrawalDate') || !req.body.hasOwnProperty('withdrawRefNumber')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
    withdrawalsService.create(req, res);
    }
};

exports.read = function (req, res){
    withdrawalsService.read(req, res);
};

exports.readAll = function (req, res){
    withdrawalsService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;  
    withdrawalsService.update(req, res, data);
};

exports.delete = function (req, res){
    withdrawalsService.delete(req, res);
};
