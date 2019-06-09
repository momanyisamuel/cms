var db = require('../models');

exports.create = function (req, res, callback){
    db.Contributions.create({
        contributionDate: req.body.contributionDate,
        payRefNumber: req.body.payRefNumber,
        contributionAmount: req.body.contributionAmount,
        fundAssignment: req.body.fundAssignment,
        comment: req.body.comment
    })
    .success(function (contribution){
        if (callback){
            callback(contribution)
        }
        else {
          res.send(200, contribution);  
        }
    })
    .error(function (err){
        console.log('error: contributionService.create');
        res.send(500, {error: 'error: contributionService.create'});
    })
};

exports.read = function (req, res, callback){
    db.Contributions.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (contribution){
        if (contribution){
            if (callback){
                callback(contribution)
            }
            else {
                res.send(200, contribution);
            }
        }
        else {
            console.log('error: contributionService.read - contribution does not exist');
            res.send(500, {error: 'error: contributionService.read - contribution does not exist'});
        }
    })
    .error(function (err){
        console.log('error: contributionService.read');
        res.send(500, {error: 'error: contributionService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.Contributions.findAll()
    .success(function (contributions){
        if (callback){
            callback(contributions);
        }
        else{
            res.send(200, contributions);
        } 
    })
    .error(function (err){
        console.log('error: contributionService.readAll');
        res.send(500, {error: 'error: contributionService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.Contributions.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (contribution){
        if (contribution){
            contribution.updateAttributes(data)
            .success(function (contribution){
                if (callback){
                    callback(contribution)
                }
                else{
                    res.send(200, contribution);
                }
            })
            .error(function (err){
                console.log('error: contributionService.update - when updating attributes');
                res.send(500, {error: 'error: contributionService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: contributionService.update - contribution does not exist');
            res.send(500, {error: 'error: contributionService.read - contribution does not exist'});
        }
    })
    .error(function (err){
        console.log('error: contributionService.update');
        res.send(500, {error: 'error: contributionService.update'});
    })
};

exports.delete = function (req, res){
    db.Contributions.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (contribution){
        if (contribution){
            contribution.destroy()
            .success(function (){
                console.log('successfully deleted the contribution');
                res.send(200, {message: 'successfully deleted the contribution'});
            })
            .error(function (err){
                console.log('error: contributionService.delete - deleting contribution');
                res.send(500, {error: 'error: contributionService.delete - deleting contribution'});
            })
        }
        else{
            console.log('error: contributionService.delete - contribution does not exist');
            res.send(500, {error: 'error: contributionService.delete - contribution does not exist'});
        }
    })
    .error(function (err){
        console.log('error: contributionService.delete');
        res.send(500, {error: 'error: contributionService.delete'});
    })
};