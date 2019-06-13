var db = require('../models');

exports.create = function (req, res, callback){
    db.Fines.create({
        fineDate: req.body.fineDate,
        fineCategory: req.body.fineCategory,
        fineAmount: req.body.fineAmount,
        comment: req.body.comment,
        ChamaId: req.body.ChamaId,
        UserId: req.body.UserId,
        email:req.body.email
    })
    .success(function (fine){
        if (callback){
            callback(fine)
        }
        else {
          res.send(200, fine);  
        }
    })
    .error(function (err){
        console.log('error: fineService.create');
        res.send(500, {error: 'error: fineService.create'});
    })
};

exports.read = function (req, res, callback){
    db.Fines.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (fine){
        if (fine){
            if (callback){
                callback(fine)
            }
            else {
                res.send(200, fine);
            }
        }
        else {
            console.log('error: fineService.read - fine does not exist');
            res.send(500, {error: 'error: fineService.read - fine does not exist'});
        }
    })
    .error(function (err){
        console.log('error: fineService.read');
        res.send(500, {error: 'error: fineService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.Fines.findAll()
    .success(function (fines){
        if (callback){
            callback(fines);
        }
        else{
            res.send(200, fines);
        } 
    })
    .error(function (err){
        console.log('error: fineService.readAll');
        res.send(500, {error: 'error: fineService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.Fines.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (fine){
        if (fine){
            fine.updateAttributes(data)
            .success(function (fine){
                if (callback){
                    callback(fine)
                }
                else{
                    res.send(200, fine);
                }
            })
            .error(function (err){
                console.log('error: fineService.update - when updating attributes');
                res.send(500, {error: 'error: fineService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: fineService.update - fine does not exist');
            res.send(500, {error: 'error: fineService.read - fine does not exist'});
        }
    })
    .error(function (err){
        console.log('error: fineService.update');
        res.send(500, {error: 'error: fineService.update'});
    })
};

exports.delete = function (req, res){
    db.Fines.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (fine){
        if (fine){
            fine.destroy()
            .success(function (){
                console.log('successfully deleted the fine');
                res.send(200, {message: 'successfully deleted the fine'});
            })
            .error(function (err){
                console.log('error: fineService.delete - deleting fine');
                res.send(500, {error: 'error: fineService.delete - deleting fine'});
            })
        }
        else{
            console.log('error: fineService.delete - fine does not exist');
            res.send(500, {error: 'error: fineService.delete - fine does not exist'});
        }
    })
    .error(function (err){
        console.log('error: fineService.delete');
        res.send(500, {error: 'error: fineService.delete'});
    })
};