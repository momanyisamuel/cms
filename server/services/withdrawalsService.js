var db = require('../models');

exports.create = function (req, res, callback){
    console.log(req.body);
    db.Withdrawals.create({
        withdrawalAmount: req.body.withdrawalAmount,
        withdrawalDate: req.body.withdrawalDate,
        withdrawRefNumber: req.body.withdrawRefNumber,
        paymentPurpose: req.body.paymentPurpose,
        comment: req.body.comment,
        UserId: req.body.UserId,
        ChamaId: req.body.ChamaId       
    })
    .success(function (withdrawal){
        if (callback){
            callback(withdrawal)
        }
        else {
          res.send(200, withdrawal);  
        }
        console.log(withdrawal);
    })
    .error(function (err){
        res.send(500, {error: 'error: withdrawalsService.create'});
    })
};

exports.read = function (req, res, callback){
    db.Withdrawals.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (withdrawal){
        if (withdrawal){
            if (callback){
                callback(withdrawal)
            }
            else {
                res.send(200, withdrawal);
            }
        }
        else {
            console.log('error: withdrawalService.read - withdrawal does not exist');
            res.send(500, {error: 'error: withdrawalService.read - withdrawal does not exist'});
        }
    })
    .error(function (err){
        console.log('error: withdrawalService.read');
        res.send(500, {error: 'error: withdrawalService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.Withdrawals.findAll()
    .success(function (withdrawals){
        if (callback){
            callback(withdrawals);
        }
        else{
            res.send(200, withdrawals);
        } 
    })
    .error(function (err){
        console.log('error: withdrawalService.readAll');
        res.send(500, {error: 'error: withdrawalService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.Withdrawals.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (withdrawal){
        if (withdrawal){
            withdrawal.updateAttributes(data)
            .success(function (withdrawal){
                if (callback){
                    callback(withdrawal)
                }
                else{
                    res.send(200, withdrawal);
                }
            })
            .error(function (err){
                console.log('error: withdrawalService.update - when updating attributes');
                res.send(500, {error: 'error: withdrawalService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: withdrawalService.update - withdrawal does not exist');
            res.send(500, {error: 'error: withdrawalService.read - withdrawal does not exist'});
        }
    })
    .error(function (err){
        console.log('error: withdrawalService.update');
        res.send(500, {error: 'error: withdrawalService.update'});
    })
};

exports.delete = function (req, res){
    db.Withdrawals.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (withdrawal){
        if (withdrawal){
            withdrawal.destroy()
            .success(function (){
                console.log('successfully deleted the withdrawal');
                res.send(200, {message: 'successfully deleted the withdrawal'});
            })
            .error(function (err){
                console.log('error: withdrawalService.delete - deleting withdrawal');
                res.send(500, {error: 'error: withdrawalService.delete - deleting withdrawal'});
            })
        }
        else{
            console.log('error: withdrawalService.delete - withdrawal does not exist');
            res.send(500, {error: 'error: withdrawalService.delete - withdrawal does not exist'});
        }
    })
    .error(function (err){
        console.log('error: withdrawalService.delete');
        res.send(500, {error: 'error: withdrawalService.delete'});
    })
};