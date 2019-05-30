var routes  = require('./server/routes');

exports = module.exports = function (app, passport){
    app.get('/', function(req, res){
        res.render('index');
    });
    
    app.get('/api/login', routes.user.findByEmail)
    //users
    app.get('/api/user', routes.user.readAll);
    app.post('/api/user', routes.user.create);
    app.get('/api/user/:id', routes.user.read);
    app.get('/api/user/edit/:id', routes.user.update);
    app.get('/api/user/delete/:id', routes.user.delete);

    //chamas
    app.get('/api/chama', routes.chama.readAll);
    app.post('/api/chama', routes.chama.create);
    app.get('/api/chama/:id', routes.chama.read);
    app.get('/api/chama/edit/:id', routes.chama.update);
    app.get('/api/chama/delete/:id', routes.chama.delete);
    //contributions
    app.get('/api/contribution', routes.contribution.readAll);
    app.post('/api/contribution', routes.contribution.create);
    app.get('/api/contribution/:id', routes.contribution.read);
    app.get('/api/contribution/edit/:id', routes.contribution.update);
    app.get('/api/contribution/delete/:id', routes.contribution.delete);
    //withdrawals
    app.get('/api/withdrawal', routes.withdrawal.readAll);
    app.post('/api/withdrawal', routes.withdrawal.create);
    app.get('/api/withdrawal/:id', routes.withdrawal.read);
    app.get('/api/withdrawal/edit/:id', routes.withdrawal.update);
    app.get('/api/withdrawal/delete/:id', routes.withdrawal.delete);
    //loans
    app.get('/api/loan', routes.loan.readAll);
    app.post('/api/loan', routes.loan.create);
    app.get('/api/loan/:id', routes.loan.read);
    app.get('/api/loan/edit/:id', routes.loan.update);
    app.get('/api/loan/delete/:id', routes.loan.delete);
    //groupaccounts
    app.get('/api/groupaccount', routes.groupaccount.readAll);
    app.post('/api/groupaccount', routes.groupaccount.create);
    app.get('/api/groupaccount/:id', routes.groupaccount.read);
    app.get('/api/groupaccount/edit/:id', routes.groupaccount.update);
    app.get('/api/groupaccount/delete/:id', routes.groupaccount.delete);
    //fines
    app.get('/api/fine', routes.fine.readAll);
    app.post('/api/fine', routes.fine.create);
    app.get('/api/fine/:id', routes.fine.read);
    app.get('/api/fine/edit/:id', routes.fine.update);
    app.get('/api/fine/delete/:id', routes.fine.delete);
    //goals
    app.get('/api/goal', routes.goal.readAll);
    app.post('/api/goal', routes.goal.create);
    app.get('/api/goal/:id', routes.goal.read);
    app.get('/api/goal/edit/:id', routes.goal.update);
    app.get('/api/goal/delete/:id', routes.goal.delete);
    //votes
    app.get('/api/vote', routes.vote.readAll);
    app.post('/api/vote', routes.vote.create);
    app.get('/api/vote/:id', routes.vote.read);
    app.get('/api/vote/edit/:id', routes.vote.update);
    app.get('/api/vote/delete/:id', routes.vote.delete);
    //portfolio
    app.get('/api/portfolio', routes.portfolio.readAll);
    app.post('/api/portfolio', routes.portfolio.create);
    app.get('/api/portfolio/:id', routes.portfolio.read);
    app.get('/api/portfolio/edit/:id', routes.portfolio.update);
    app.get('/api/portfolio/delete/:id', routes.portfolio.delete);
    //end
}