var db = require('../models');

exports.create = function (req, res, callback){
    db.Votes.create({
        question: req.body.question,
        description: req.body.description,
        answer: req.body.answer,
        pollDate: req.body.pollDate
    })
    .success(function (vote){
        if (callback){
            callback(vote)
        }
        else {
          res.send(200, vote);  
        }
    })
    .error(function (err){
        console.log('error: voteService.create');
        res.send(500, {error: 'error: voteService.create'});
    })
};

exports.read = function (req, res, callback){
    db.Votes.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (vote){
        if (vote){
            if (callback){
                callback(vote)
            }
            else {
                res.send(200, vote);
            }
        }
        else {
            console.log('error: voteService.read - vote does not exist');
            res.send(500, {error: 'error: voteService.read - vote does not exist'});
        }
    })
    .error(function (err){
        console.log('error: voteService.read');
        res.send(500, {error: 'error: voteService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.Votes.findAll()
    .success(function (votes){
        if (callback){
            callback(votes);
        }
        else{
            res.send(200, votes);
        } 
    })
    .error(function (err){
        console.log('error: voteService.readAll');
        res.send(500, {error: 'error: voteService.readAll'});
    })
};

exports.update = function (req, res, data, callback){
    db.Votes.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (vote){
        if (vote){
            vote.updateAttributes(data)
            .success(function (vote){
                if (callback){
                    callback(vote)
                }
                else{
                    res.send(200, vote);
                }
            })
            .error(function (err){
                console.log('error: voteService.update - when updating attributes');
                res.send(500, {error: 'error: voteService.update - when updating attributes'});
            })
        }
        else{
            console.log('error: voteService.update - vote does not exist');
            res.send(500, {error: 'error: voteService.read - vote does not exist'});
        }
    })
    .error(function (err){
        console.log('error: voteService.update');
        res.send(500, {error: 'error: voteService.update'});
    })
};

exports.delete = function (req, res){
    db.Votes.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (vote){
        if (vote){
            vote.destroy()
            .success(function (){
                console.log('successfully deleted the vote');
                res.send(200, {message: 'successfully deleted the vote'});
            })
            .error(function (err){
                console.log('error: voteService.delete - deleting vote');
                res.send(500, {error: 'error: voteService.delete - deleting vote'});
            })
        }
        else{
            console.log('error: voteService.delete - vote does not exist');
            res.send(500, {error: 'error: voteService.delete - vote does not exist'});
        }
    })
    .error(function (err){
        console.log('error: voteService.delete');
        res.send(500, {error: 'error: voteService.delete'});
    })
};