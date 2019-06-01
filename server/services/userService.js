var db = require('../models');
var bcrypt = require('bcrypt')

exports.create = function (req, res, callback){
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        nationalId: req.body.nationalId,
        email: req.body.email,
        userStatus: req.body.userStatus,
        password: req.body.password,
        riskApetite: req.body.riskApetite
    })
    .success(function (user){
        if (callback){
            callback(user)
        }
        else {
          res.send(200, user);  
        }
    })
    .error(function (err){
        console.log('error: userService.create');
        res.send(500, {error: 'error: userService.create'});
    })
};

exports.read = function (req, res, callback){
    db.User.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (user){
        if (user){
            if (callback){
                callback(user)
            }
            else {
                res.send(200, user);
            }
        }
        else {
            console.log('error: userService.read - user does not exist');
            res.send(500, {error: 'error: userService.read - user does not exist'});
        }
    })
    .error(function (err){
        console.log('error: userService.read');
        res.send(500, {error: 'error: userService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.User.findAll()
    .success(function (users){
        if (callback){
            callback(users);
        }
        else{
            res.send(200, users);
        } 
    })
    .error(function (err){
        console.log('error: userService.readAll');
        res.send(500, {error: 'error: userService.readAll'});
    })
};

exports.update = function(req, res){
    let updateValues = { riskApetite: req.body.riskApetite }
    db.User.update(updateValues, { id:req.params.id } ).then((result) => {
        // here result will be [ 1 ], if the id column is unique in your table
        // the problem is that you can't return updated instance, you would have to retrieve it from database once again
        console.log(result);
    }).catch(e => {
        console.log(e);
    });
};

exports.delete = function (req, res){
    db.User.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (user){
        if (user){
            user.destroy()
            .success(function (){
                console.log('successfully deleted the user');
                res.send(200, {message: 'successfully deleted the user'});
            })
            .error(function (err){
                console.log('error: userService.delete - deleting user');
                res.send(500, {error: 'error: userService.delete - deleting user'});
            })
        }
        else{
            console.log('error: userService.delete - user does not exist');
            res.send(500, {error: 'error: userService.delete - user does not exist'});
        }
    })
    .error(function (err){
        console.log('error: userService.delete');
        res.send(500, {error: 'error: userService.delete'});
    })
};

exports.findById = function(id, cb) {
    db.User.findById(id,cb)
}
exports.findByEmail= function(req, res, callback) {
    db.User.find({
        where:{ email : req.body.email }
    })
    .success(function (user){
        if (callback){
            callback(user)
        }
        else {
          res.send(200, user);  
        }
    })
    .error(function (err){
        console.log('error: userService.readAll');
        res.send(500, {error: 'error: userService.readAll'});
    })
}
exports.validPassword = function(req, res, callback) {
    db.User.find({
        where:{ email : req.query.email, password: req.query.password }
    })
    .success(function (user){
        if (callback){
            callback(user)
        }
        else {
        res.send(200, user);  
        }
    })
    .error(function (err){
        console.log('error: userService.readAll');
        res.send(500, {error: 'error: userService.readAll'});
    })
    // return  bcrypt.compare(password, this.password, function(err, isMatch){
    //     if(err) throw err;
    //     cb(null, isMatch)
    // });
}