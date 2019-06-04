var db = require('../models'),
pollService =  require('../services/pollService');


exports.create = function (req, res){
    pollService.create(req, res);
};

exports.readAll = (req,res) => {
    pollService.readAll(req, res)
}

exports.read = (req,res) => {
    pollService.read(req, res)
}