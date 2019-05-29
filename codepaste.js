http POST CALL
// var url = 'http://localhost:8000/api/user/'
    // $http.post(url, {
    //     firstName: 'Kevin',
    //     lastName: 'Samuel',
    //     phoneNumber: '0735556778',
    //     nationalId: '27669103',
    //     email: 'momanyikevin@mail.com',
    //     userStatus: 0,
    //     password: 'pass'
    // },
    // {
    //   headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    // }).then(function(response){ console.log(response)}).catch(err => console.log(err))

    
userService.findByEmail({where:{ email : data.email }}, function(err, user){
        res.json(user)
        // if(err) throw err
        // if(!user) { return res.json({success: false, message: 'user is registered'})}
        // userService.validPassword(password, function(err, isMatch){
        //     if(err) throw err;
        //     if(isMatch){
        //         var token = jw.sign(user, config.secret, { expiresIn:600000 })
        //         res.json({ success: true, token: token, user : {
        //             id: user.id,
        //             email: user.email,
        //             password: user.password
        //         } 
        //         })
        //     } else {
        //         return res.json({ success: false, message: 'password does not match'})
        //     }
        // })
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