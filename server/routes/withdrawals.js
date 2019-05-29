var db = require('../models'),
withdrawalService =  require('../services/withdrawalsService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('amount') || !req.body.hasOwnProperty('withdrawalDate')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        withdrawalService.create(req, res);
    }
};

exports.read = function (req, res){
    withdrawalService.read(req, res);
};

exports.readAll = function (req, res){
    withdrawalService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    
    withdrawalService.update(req, res, data);
};

exports.delete = function (req, res){
    withdrawalService.delete(req, res);
};
