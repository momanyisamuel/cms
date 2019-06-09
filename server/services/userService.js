var db = require('../models');
var nodemailer = require('nodemailer')

exports.create = function (req, res, callback){
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        nationalId: req.body.nationalId,
        email: req.body.email,
        userStatus: req.body.userStatus,
        password: req.body.password,
        riskApetite: req.body.riskApetite,
        ChamaId: req.body.ChamaId
    })
    .success(function (user){
        if (callback){
            callback(user)
        }
        else {
          res.send(200, user);  
        }
    })
    .error(function (err){
        console.log('error: userService.create');
        res.send(500, {error: 'error: userService.create'});
    })
};

exports.read = function (req, res, callback){
    db.User.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (user){
        if (user){
            if (callback){
                callback(user)
            }
            else {
                res.send(200, user);
            }
        }
        else {
            console.log('error: userService.read - user does not exist');
            res.send(500, {error: 'error: userService.read - user does not exist'});
        }
    })
    .error(function (err){
        console.log('error: userService.read');
        res.send(500, {error: 'error: userService.read'});
    })
};

exports.readAll = function (req, res, callback){
    db.User.findAll()
    .success(function (users){
        if (callback){
            callback(users);
        }
        else{
            res.send(200, users);
        } 
    })
    .error(function (err){
        console.log('error: userService.readAll');
        res.send(500, {error: 'error: userService.readAll'});
    })
};

exports.update = function(req, res){
    let updateValues = { riskApetite: req.body.riskApetite, ChamaId: req.body.ChamaId, admin: req.body.admin }
    db.User.update(updateValues, { id:req.params.id } ).then((result) => {
        res.status(200).send([{result: result}])
        console.log(result);
    }).catch(e => {
        console.log(e);
    });
};

exports.delete = function (req, res){
    db.User.find({
        where: {
            id: req.params.id
        }
    })
    .success(function (user){
        if (user){
            user.destroy()
            .success(function (){
                console.log('successfully deleted the user');
                res.send(200, {message: 'successfully deleted the user'});
            })
            .error(function (err){
                console.log('error: userService.delete - deleting user');
                res.send(500, {error: 'error: userService.delete - deleting user'});
            })
        }
        else{
            console.log('error: userService.delete - user does not exist');
            res.send(500, {error: 'error: userService.delete - user does not exist'});
        }
    })
    .error(function (err){
        console.log('error: userService.delete');
        res.send(500, {error: 'error: userService.delete'});
    })
};

exports.findById = function(id, cb) {
    db.User.findById(id,cb)
}
exports.findByEmail= function(req, res, callback) {
    db.User.find({
        where:{ email : req.body.email }
    })
    .success(function (user){
        if (callback){
            callback(user)
        }
        else {
          res.send(200, user);  
        }
    })
    .error(function (err){
        console.log('error: userService.readAll');
        res.send(500, {error: 'error: userService.readAll'});
    })
}
exports.validPassword = function(req, res, callback) {
    db.User.find({
        where:{ email : req.query.email, password: req.query.password }
    })
    .success(function (user){
        if (callback){
            callback(user)
        }
        else {
        res.send(200, user);  
        }
    })
    .error(function (err){
        console.log('error: userService.readAll');
        res.send(500, {error: 'error: userService.readAll'});
    })
}

exports.sendInvites = function(req, res, callback) {
    console.log(req.body)
    //create user with chamaId from currentuser then send email

    db.User.create({
        email: req.body.email,
        userStatus: 0, //0 invited 1:accepted/active 2:deactivated
        ChamaId: req.params.ChamaId
    })
    .success(function (user){
        if (callback){
            callback(user)
        }
        else {
          res.send(200, user);  
        }
    })
    .error(function (err){
        console.log('error: userService.create');
        res.send(500, {error: 'error: userService.create'});
    })

    const output = `
        <p>You have been invited to join a chama by ${req.body.email} </p>
        <h3>Accept invite and register</h3>
        <button><a href="http://localhost:8000/#/acceptinvite">Accept</a></button>
    `
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'momanyisamuel48@gmail.com', // generated ethereal user
            pass: 'Thearrow@485'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    let invitees = req.body.email

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"FCMS Chama App" <momanyisamuel48@gmail.com>', // sender address
        to: invitees, // list of receivers pass data from invite form
        subject: 'FCMS Invite', // Subject line
        text: '<user> has invited you to join his/her chama', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.redirect('#/members')
    });

}

exports.acceptInvites = function(req,res){
    let updateValues = { 
        firstName    :   req.body.firstName,
        lastName     :   req.body.lastName,
        phoneNumber  :   req.body.phoneNumber,
        nationalId   :   req.body.nationalId,
        userStatus   :   1,
        password     :   req.body.password
    }
    db.User.update(updateValues, { 
        email: req.body.email 
    } ).then((result) => {
        res.status(200).send([{result: result}])
        console.log(result);
    }).catch(e => {
        console.log(e);
    });
}