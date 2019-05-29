var db = require('../models'),
groupaccountService =  require('../services/groupaccountsService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('totalWithdrawals') || !req.body.hasOwnProperty('totalContributions')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        groupaccountService.create(req, res);
    }
};

exports.read = function (req, res){
    groupaccountService.read(req, res);
};

exports.readAll = function (req, res){
    groupaccountService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
   
    groupaccountService.update(req, res, data);
};

exports.delete = function (req, res){
    groupaccountService.delete(req, res);
};
