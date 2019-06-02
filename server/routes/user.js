var db = require('../models'),
userService =  require('../services/userService');
var jwt = require('jsonwebtoken')
var config = require('../../config/config')

exports.create = function (req, res){
    if(!req.body.hasOwnProperty('firstName') || !req.body.hasOwnProperty('password')){
        console.log('Error 400: Post syntax incorrect.');
        res.send(400, 'Error 400: Post syntax incorrect.');
    }
    else
    {
        userService.create(req, res);
    }
};

exports.read = function (req, res){
    userService.read(req, res);
};

exports.readAll = function (req, res){
    userService.readAll(req, res);
};

exports.update = function (req, res){
    userService.update(req, res);
};

exports.delete = function (req, res){
    userService.delete(req, res);
};
exports.findByEmail = function (req, res) {
    userService.validPassword( req, res, function(user) {
        if(!user) { 
            res.send( 500, { error : 'Wrong Email or password'} )
        } else {
            
            res.send(200, user)
           
        }
    });
}

exports.sendInvites = function (req,res){
    userService.sendInvites(req, res);
}