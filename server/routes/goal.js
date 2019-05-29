var db = require('../models'),
goalService =  require('../services/goalService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('duration')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        goalService.create(req, res);
    }
};

exports.read = function (req, res){
    goalService.read(req, res);
};

exports.readAll = function (req, res){
    goalService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    goalService.update(req, res, data);
};

exports.delete = function (req, res){
    goalService.delete(req, res);
};
