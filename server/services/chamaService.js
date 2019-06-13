var db = require('../models');

exports.create = function (req, res, callback){
    db.Chama.create({
        country: req.body.country,
        name: req.body.name,
        loan: req.body.loan,
        riskApetite: req.body.iskApetite
    })
    .success(function (chama){
        if (callback){
            callback(chama)
        }
        else {
          res.send(200, chama);  
        }
    })
    .error(function (err){
        console.log('error: chamaService.create');
        res.send(500, {error: 'error: chamaService.create'});
    })
};

exports.read = function (req, res, callback){
    db.Chama.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (chama){
        if (chama){
            if (callback){
                callback(chama)
            }
            else {
                res.send(200, chama);
            }
        }
        else {
            console.log('error: chamaService.read - chama does not exist');
            res.send(500, {error: 'error: chamaService.read - chama does not exist'});
        }
    })
    .error(function (err){
        console.log('error: chamaService.read');
        res.send(500, {error: 'error: chamaService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.Chama.findAll({
        include:[{
            model:db.Contributions
        },{
            model:db.Withdrawals
        },{
            model:db.Portfolio
        },{
            model:db.Fines
        }]
    })
    .success(function (chamas){
        if (callback){
            callback(chamas);
        }
        else{
            res.send(200, chamas);
        } 
    })
    .error(function (err){
        console.log('error: chamaService.readAll');
        res.send(500, {error: 'error: chamaService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.Chama.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (chama){
        if (chama){
            chama.updateAttributes(data)
            .success(function (chama){
                if (callback){
                    callback(chama)
                }
                else{
                    res.send(200, chama);
                }
            })
            .error(function (err){
                console.log('error: chamaService.update - when updating attributes');
                res.send(500, {error: 'error: chamaService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: chamaService.update - chama does not exist');
            res.send(500, {error: 'error: chamaService.read - chama does not exist'});
        }
    })
    .error(function (err){
        console.log('error: chamaService.update');
        res.send(500, {error: 'error: chamaService.update'});
    })
};

exports.delete = function (req, res){
    db.Chama.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (chama){
        if (chama){
            chama.destroy()
            .success(function (){
                console.log('successfully deleted the chama');
                res.send(200, {message: 'successfully deleted the chama'});
            })
            .error(function (err){
                console.log('error: chamaService.delete - deleting chama');
                res.send(500, {error: 'error: chamaService.delete - deleting chama'});
            })
        }
        else{
            console.log('error: chamaService.delete - chama does not exist');
            res.send(500, {error: 'error: chamaService.delete - chama does not exist'});
        }
    })
    .error(function (err){
        console.log('error: chamaService.delete');
        res.send(500, {error: 'error: chamaService.delete'});
    })
};