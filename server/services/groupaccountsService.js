var db = require('../models');

exports.create = function (req, res, callback){
    db.GroupAccounts.create({
        totalWithdrawals: req.body.totalWithdrawals,
        totalContributions: req.body.totalContributions,
        totalAssets: req.body.totalAssets,
        totalLiabilities: req.body.totalLiabilities,
        totalLoans: req.body.totalLoans,
        totalFines: req.body.totalFines
    })
    .success(function (groupAccount){
        if (callback){
            callback(groupAccount)
        }
        else {
          res.send(200, groupAccount);  
        }
    })
    .error(function (err){
        console.log('error: groupAccountService.create');
        res.send(500, {error: 'error: groupAccountService.create'});
    })
};

exports.read = function (req, res, callback){
    db.GroupAccounts.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (groupAccount){
        if (groupAccount){
            if (callback){
                callback(groupAccount)
            }
            else {
                res.send(200, groupAccount);
            }
        }
        else {
            console.log('error: groupAccountService.read - groupAccount does not exist');
            res.send(500, {error: 'error: groupAccountService.read - groupAccount does not exist'});
        }
    })
    .error(function (err){
        console.log('error: groupAccountService.read');
        res.send(500, {error: 'error: groupAccountService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.GroupAccounts.findAll()
    .success(function (groupAccounts){
        if (callback){
            callback(groupAccounts);
        }
        else{
            res.send(200, groupAccounts);
        } 
    })
    .error(function (err){
        console.log('error: groupAccountService.readAll');
        res.send(500, {error: 'error: groupAccountService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.GroupAccounts.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (groupAccount){
        if (groupAccount){
            groupAccount.updateAttributes(data)
            .success(function (groupAccount){
                if (callback){
                    callback(groupAccount)
                }
                else{
                    res.send(200, groupAccount);
                }
            })
            .error(function (err){
                console.log('error: groupAccountService.update - when updating attributes');
                res.send(500, {error: 'error: groupAccountService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: groupAccountService.update - groupAccount does not exist');
            res.send(500, {error: 'error: groupAccountService.read - groupAccount does not exist'});
        }
    })
    .error(function (err){
        console.log('error: groupAccountService.update');
        res.send(500, {error: 'error: groupAccountService.update'});
    })
};

exports.delete = function (req, res){
    db.GroupAccounts.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (groupAccount){
        if (groupAccount){
            groupAccount.destroy()
            .success(function (){
                console.log('successfully deleted the groupAccount');
                res.send(200, {message: 'successfully deleted the groupAccount'});
            })
            .error(function (err){
                console.log('error: groupAccountService.delete - deleting groupAccount');
                res.send(500, {error: 'error: groupAccountService.delete - deleting groupAccount'});
            })
        }
        else{
            console.log('error: groupAccountService.delete - groupAccount does not exist');
            res.send(500, {error: 'error: groupAccountService.delete - groupAccount does not exist'});
        }
    })
    .error(function (err){
        console.log('error: groupAccountService.delete');
        res.send(500, {error: 'error: groupAccountService.delete'});
    })
};