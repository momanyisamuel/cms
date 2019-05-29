var db = require('../models');

exports.create = function (req, res, callback){
    db.Goal.create({
        name: req.body.name,
        duration: req.body.duration,
        riskRanking: req.body.riskRanking
    })
    .success(function (goal){
        if (callback){
            callback(goal)
        }
        else {
          res.send(200, goal);  
        }
    })
    .error(function (err){
        console.log('error: goalService.create');
        res.send(500, {error: 'error: goalService.create'});
    })
};

exports.read = function (req, res, callback){
    db.Goal.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (goal){
        if (goal){
            if (callback){
                callback(goal)
            }
            else {
                res.send(200, goal);
            }
        }
        else {
            console.log('error: goalService.read - goal does not exist');
            res.send(500, {error: 'error: goalService.read - goal does not exist'});
        }
    })
    .error(function (err){
        console.log('error: goalService.read');
        res.send(500, {error: 'error: goalService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.Goal.findAll()
    .success(function (goals){
        if (callback){
            callback(goals);
        }
        else{
            res.send(200, goals);
        } 
    })
    .error(function (err){
        console.log('error: goalService.readAll');
        res.send(500, {error: 'error: goalService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.Goal.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (goal){
        if (goal){
            goal.updateAttributes(data)
            .success(function (goal){
                if (callback){
                    callback(goal)
                }
                else{
                    res.send(200, goal);
                }
            })
            .error(function (err){
                console.log('error: goalService.update - when updating attributes');
                res.send(500, {error: 'error: goalService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: goalService.update - goal does not exist');
            res.send(500, {error: 'error: goalService.read - goal does not exist'});
        }
    })
    .error(function (err){
        console.log('error: goalService.update');
        res.send(500, {error: 'error: goalService.update'});
    })
};

exports.delete = function (req, res){
    db.Goal.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (goal){
        if (goal){
            goal.destroy()
            .success(function (){
                console.log('successfully deleted the goal');
                res.send(200, {message: 'successfully deleted the goal'});
            })
            .error(function (err){
                console.log('error: goalService.delete - deleting goal');
                res.send(500, {error: 'error: goalService.delete - deleting goal'});
            })
        }
        else{
            console.log('error: goalService.delete - goal does not exist');
            res.send(500, {error: 'error: goalService.delete - goal does not exist'});
        }
    })
    .error(function (err){
        console.log('error: goalService.delete');
        res.send(500, {error: 'error: goalService.delete'});
    })
};