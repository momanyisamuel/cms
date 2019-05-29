var db = require('../models');

exports.create = function (req, res, callback){
    db.Loans.create({
        loanAmount: req.body.loanAmount,
        duration: req.body.duration,
        interestRate: req.body.interestRate
    })
    .success(function (loan){
        if (callback){
            callback(loan)
        }
        else {
          res.send(200, loan);  
        }
    })
    .error(function (err){
        console.log('error: loanService.create');
        res.send(500, {error: 'error: loanService.create'});
    })
};

exports.read = function (req, res, callback){
    db.Loans.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (loan){
        if (loan){
            if (callback){
                callback(loan)
            }
            else {
                res.send(200, loan);
            }
        }
        else {
            console.log('error: loanService.read - loan does not exist');
            res.send(500, {error: 'error: loanService.read - loan does not exist'});
        }
    })
    .error(function (err){
        console.log('error: loanService.read');
        res.send(500, {error: 'error: loanService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.Loans.findAll()
    .success(function (loans){
        if (callback){
            callback(loans);
        }
        else{
            res.send(200, loans);
        } 
    })
    .error(function (err){
        console.log('error: loanService.readAll');
        res.send(500, {error: 'error: loanService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.Loans.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (loan){
        if (loan){
            loan.updateAttributes(data)
            .success(function (loan){
                if (callback){
                    callback(loan)
                }
                else{
                    res.send(200, loan);
                }
            })
            .error(function (err){
                console.log('error: loanService.update - when updating attributes');
                res.send(500, {error: 'error: loanService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: loanService.update - loan does not exist');
            res.send(500, {error: 'error: loanService.read - loan does not exist'});
        }
    })
    .error(function (err){
        console.log('error: loanService.update');
        res.send(500, {error: 'error: loanService.update'});
    })
};

exports.delete = function (req, res){
    db.Loans.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (loan){
        if (loan){
            loan.destroy()
            .success(function (){
                console.log('successfully deleted the loan');
                res.send(200, {message: 'successfully deleted the loan'});
            })
            .error(function (err){
                console.log('error: loanService.delete - deleting loan');
                res.send(500, {error: 'error: loanService.delete - deleting loan'});
            })
        }
        else{
            console.log('error: loanService.delete - loan does not exist');
            res.send(500, {error: 'error: loanService.delete - loan does not exist'});
        }
    })
    .error(function (err){
        console.log('error: loanService.delete');
        res.send(500, {error: 'error: loanService.delete'});
    })
};