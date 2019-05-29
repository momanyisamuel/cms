var db = require('../models'),
fineService =  require('../services/finesService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('fineDate') || !req.body.hasOwnProperty('fineAmount')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        fineService.create(req, res);
    }
};

exports.read = function (req, res){
    fineService.read(req, res);
};

exports.readAll = function (req, res){
    fineService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    fineService.update(req, res, data);
};

exports.delete = function (req, res){
    fineService.delete(req, res);
};
