var db = require('../models'),
voteService =  require('../services/votesService');

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('question') || !req.body.hasOwnProperty('answer')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        voteService.create(req, res);
    }
};

exports.read = function (req, res){
    voteService.read(req, res);
};

exports.readAll = function (req, res){
    voteService.readAll(req, res);
};

exports.update = function (req, res){
    var data = req.body;
    
    if (data.password){
        console.log('Data: ' + JSON.stringify(data));
        data.password = security.hashPassword(data.password);
    }
    voteService.update(req, res, data);
};

exports.delete = function (req, res){
    voteService.delete(req, res);
};
