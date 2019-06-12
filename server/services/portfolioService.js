var db = require('../models');

exports.create = function (req, res, callback){
    db.Portfolio.create({
        name: req.body.name,
        category: req.body.category,
        assetFlag: req.body.assetFlag,
        description: req.body.description,
        amount: req.body.amount,
        dateRecorded: req.body.dateRecorded,
        refDetails: req.body.refDetails,
        comment: req.body.comment,
        ChamaId: req.body.ChamaId
    })
    .success(function (portfolio){
        if (callback){
            callback(portfolio)
        }
        else {
          res.send(200, portfolio);  
        }
    })
    .error(function (err){
        console.log('error: portfolioService.create');
        res.send(500, {error: 'error: portfolioService.create'});
    })
};

exports.read = function (req, res, callback){
    db.Portfolio.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (portfolio){
        if (portfolio){
            if (callback){
                callback(portfolio)
            }
            else {
                res.send(200, portfolio);
            }
        }
        else {
            console.log('error: portfolioService.read - portfolio does not exist');
            res.send(500, {error: 'error: portfolioService.read - portfolio does not exist'});
        }
    })
    .error(function (err){
        console.log('error: portfolioService.read');
        res.send(500, {error: 'error: portfolioService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.Portfolio.findAll()
    .success(function (portfolios){
        if (callback){
            callback(portfolios);
        }
        else{
            res.send(200, portfolios);
        } 
    })
    .error(function (err){
        console.log('error: portfolioService.readAll');
        res.send(500, {error: 'error: portfolioService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.Portfolio.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (portfolio){
        if (portfolio){
            portfolio.updateAttributes(data)
            .success(function (portfolio){
                if (callback){
                    callback(portfolio)
                }
                else{
                    res.send(200, portfolio);
                }
            })
            .error(function (err){
                console.log('error: portfolioService.update - when updating attributes');
                res.send(500, {error: 'error: portfolioService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: portfolioService.update - portfolio does not exist');
            res.send(500, {error: 'error: portfolioService.read - portfolio does not exist'});
        }
    })
    .error(function (err){
        console.log('error: portfolioService.update');
        res.send(500, {error: 'error: portfolioService.update'});
    })
};

exports.delete = function (req, res){
    db.Portfolio.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (portfolio){
        if (portfolio){
            portfolio.destroy()
            .success(function (){
                console.log('successfully deleted the portfolio');
                res.send(200, {message: 'successfully deleted the portfolio'});
            })
            .error(function (err){
                console.log('error: portfolioService.delete - deleting portfolio');
                res.send(500, {error: 'error: portfolioService.delete - deleting portfolio'});
            })
        }
        else{
            console.log('error: portfolioService.delete - portfolio does not exist');
            res.send(500, {error: 'error: portfolioService.delete - portfolio does not exist'});
        }
    })
    .error(function (err){
        console.log('error: portfolioService.delete');
        res.send(500, {error: 'error: portfolioService.delete'});
    })
};