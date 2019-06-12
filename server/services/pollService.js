var db = require('../models');

exports.create = (req, res, callback) => {
    console.log(req.body)
    let data = req.body.choices;
    db.Poll.create({
        question: req.body.question
    }).success(function (poll){
        var passData = []
        data.forEach(element => {
            console.log(element)
            passData.push({ 
                text: element,
                PollId: poll.id
            })
        });
        console.log(passData)
        db.Choice.bulkCreate(passData)

        if (callback){
            callback(poll)
        }
        else {
            res.send(200, poll);  
        }
    })
    .error(function (err){
        console.log('error: pollService.create');
        res.send(500, {error: 'error: pollService.create'});
    })
}

exports.readAll = (req,res, callback) => {
    db.Poll.findAll({
        include:[{
            model: db.Choice,
            attributes: ['id','PollId','text'],
            include:[{
                model:db.Vote,
                attributes:['id','ChoiceId','UserId']
            }]
        }]
    }).success(function (polls){
        if (callback){
            callback(polls);
        }
        else{
            res.send(200, polls);
        } 
    })
    .error(function (err){
        console.log('error: pollService.readAll');
        res.send(500, {error: 'error: pollService.readAll'});
    })
}

exports.read = function (req, res, callback){
    db.Poll.find({
        where: {
            id: req.params.id
        },
        attributes: ['question'],
        include:[{
            model: db.Choice,
            attributes: ['id','PollId','text'],
            include:[{
                model:db.Vote,
                attributes:['id','ChoiceId','UserId']
            }]
        }]
    })
    .success(function (poll){
        // res.json(poll);
        if (poll){
            if (callback){
                callback(poll)
            }
            else {
                var userVoted = false,
                userChoice,
                totalVotes = 0;

                // Loop through poll choices to determine if user has voted
                // on this poll, and if so, what they selected
                for(c in poll.choices) {
                    var choice = poll.choices[c]; 

                    for(v in choice.votes) {
                        var vote = choice.votes[v];
                        totalVotes++;

                        if(vote.UserId === req.body.UserId) {
                            userVoted = true;
                            userChoice = { id: choice.id, text: choice.text };
                        }
                    }
                }

                // Attach info about user's past voting on this poll
                poll.userVoted = userVoted;
                poll.userChoice = userChoice;

                poll.totalVotes = totalVotes;
                res.send(200, poll);
            }
        }
        else {
            console.log('error: pollService.read - poll does not exist');
            res.send(500, {error: 'error: pollService.read - poll does not exist'});
        }
    })
    .error(function (err){
        console.log('error: pollService.read');
        res.send(500, {error: 'error: pollService.read'});
    })
};