var db = require('../models'),
contributionService =  require('../services/contributionsService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('depositDate') || !req.body.hasOwnProperty('payRefNumber')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        contributionService.create(req, res);
    }
};

exports.read = function (req, res){
    contributionService.read(req, res);
};

exports.readAll = function (req, res){
    contributionService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    
    contributionService.update(req, res, data);
};

exports.delete = function (req, res){
    contributionService.delete(req, res);
};
