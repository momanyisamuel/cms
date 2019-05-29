var db = require('../models'),
chamaService =  require('../services/chamaService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('country')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        chamaService.create(req, res);
    }
};

exports.read = function (req, res){
    chamaService.read(req, res);
};

exports.readAll = function (req, res){
    chamaService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    chamaService.update(req, res, data);
};

exports.delete = function (req, res){
    chamaService.delete(req, res);
};
