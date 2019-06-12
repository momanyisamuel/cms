var db = require('../models'),
loanService =  require('../services/loansService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('loanAmount') || !req.body.hasOwnProperty('loanDuration')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        loanService.create(req, res);
    }
};

exports.read = function (req, res){
    loanService.read(req, res);
};

exports.readAll = function (req, res){
    loanService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    
    loanService.update(req, res, data);
};

exports.delete = function (req, res){
    loanService.delete(req, res);
};
