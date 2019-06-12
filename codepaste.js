http POST CALL
var url = 'http://localhost:8000/api/user/'
    $http.post(url, {
        firstName: 'Kevin',
        lastName: 'Samuel',
        phoneNumber: '0735556778',
        nationalId: '27669103',
        email: 'momanyikevin@mail.com',
        userStatus: 0,
        password: 'pass'
    },
    {
      headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    }).then(function(response){ console.log(response)}).catch(err => console.log(err))

    
userService.findByEmail({where:{ email : data.email }}, function(err, user){
        res.json(user)
        if(err) throw err
        if(!user) { return res.json({success: false, message: 'user is registered'})}
        userService.validPassword(password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                var token = jw.sign(user, config.secret, { expiresIn:600000 })
                res.json({ success: true, token: token, user : {
                    id: user.id,
                    email: user.email,
                    password: user.password
                } 
                })
            } else {
                return res.json({ success: false, message: 'password does not match'})
            }
        })
    })



    console.log(user)
        // if(err) throw err
        if(!user) { return res.json({success: false, message: 'No user is found'})}
        userService.validPassword(password, function(err, isMatch){
            // if(err) throw err;
            if(isMatch){
                var token = jwt.sign(user, config.secret, { expiresIn:600000 })
                res.json({ success: true, token: token, user : {
                    id: user.id,
                    email: user.email,
                    password: user.password
                } 
                })
            } else {
                return res.json({ success: false, message: 'password does not match'})
            }
        })
        getUsers().then(result => {
            let usersBody = "";
        
            result.forEach(user => {
                    usersBody+= `<tr>
                    <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    </tr>`
                }
            );
        
            global.document.getElementById('users').innerHTML = usersBody;
            })


            if(user){
                db.User.update(user,{
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    nationalId: req.body.nationalId,
                    email: req.body.email,
                    userStatus: req.body.userStatus,
                    password: req.body.password,
                    riskApetite: req.params.riskApetite
                })
                .success(function (user){
        
                    if (callback){
                        callback(user)
                    }
                    else {
                        res.status(200).send([{result: user}]);  
                    }
                })
                .error(function (err){
                    console.log('error here');
                })
            }else{
                console.log('error - user does not exist');
                res.send(500, {error: 'error - user does not exist'});
            }



            exports.update = function (req, res, callback){
                db.User.find({
                    where: {
                        id: req.params.id
                    }
                })
                .success(function (user){
                    // console.log(user)
                    console.log(user.id)
                    if(user.id === req.params.id){
                    let updateValues = { riskApetite: req.body.riskApetite }
                    db.User.update(updateValues).then((self) => {
                        // here your result is simply an array with number of affected rows
                        console.log(self);
                        // [ 1 ]
                    });}
                    
                })
                .error(function (err){
                    console.log('error');
                    res.send(500, {error: 'error'});
                })
            };


           


    $scope.submitInviteForm = function(){
        var url = 'http://localhost:8000/invite/user/'+user.ChamaId

        $http.post(url, {
                email: $scope.inviteEmail
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            $location.url('/members')
        }).catch(err => console.log(err))
    }


    attributes: ['question'],
        include:[{
            model: db.Choice,
            attributes: ['id','PollId','text'[db.sequelize.fn('COUNT', db.sequelize.col('Choice.votes.id')),'voteCount']],
            include:[{
                model:db.Vote
            }]
        }]


        attributes: ['question'],
        include: {
            model: db.models.Choice,
            attributes: [
              ['id', 'PollId'],
              'text',
              [db.sequelize.fn('COUNT', db.sequelize.col('Choice.votes.id')), 'voteCount']
            ],
            include: {
              model: db.models.vote,
              attributes: []
            }
        },
        group: ['Choice.id'],
        order: [[db.sequelize.literal('`Choice.voteCount`'), 'ASC']]