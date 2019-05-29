var db = require('../models'),
portfolioService =  require('../services/portfolioService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('category')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        portfolioService.create(req, res);
    }
};

exports.read = function (req, res){
    portfolioService.read(req, res);
};

exports.readAll = function (req, res){
    portfolioService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    portfolioService.update(req, res, data);
};

exports.delete = function (req, res){
    portfolioService.delete(req, res);
};
