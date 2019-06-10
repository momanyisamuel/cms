'use strict';

angular.module('app', ['app.controllers','app.services', 'ngRoute'])

.config(function ($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/views/partials/home.html',
        controller: 'HomeCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/register', {
        templateUrl: '/views/partials/register.html',
        controller: 'registerCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/contribution', {
        templateUrl: '/views/partials/contribution.html',
        controller: 'contributionCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/login', {
        templateUrl: '/views/partials/login.html',
        controller: 'loginCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/withdrawals', {
        templateUrl: '/views/partials/withdrawals.html',
        controller: 'withdrawalsCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/votes', {
        templateUrl: '/views/partials/votes.html',
        controller: 'votesCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/fines', {
        templateUrl: '/views/partials/fines.html',
        controller: 'finesCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/risk', {
        templateUrl: '/views/partials/riskapetite.html',
        controller: 'riskCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/loans', {
        templateUrl: '/views/partials/loans.html',
        controller: 'loansCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/portfolio', {
        templateUrl: '/views/partials/portfolio.html',
        controller: 'portfolioCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/members', {
        templateUrl: '/views/partials/members.html',
        controller: 'membersCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/reports', {
        templateUrl: '/views/partials/reports.html',
        controller: 'reportsCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    .when('/acceptinvites', {
        templateUrl: '/views/partials/acceptinvites.html',
        controller: 'invitesCtrl'})
    .otherwise({
        redirectTo: '/'
    })    
    .when('/listpolls', {
        templateUrl: '/views/partials/listpolls.html',
        controller: 'PollListCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    
    .when('/polldetails/:id', {
        templateUrl: '/views/partials/polldetails.html',
        controller: 'PollItemCtrl'})
    .otherwise({
        redirectTo: '/'
    })

    .when('/newpoll', {
        templateUrl: '/views/partials/newpoll.html',
        controller: 'PollNewCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    
    .when('/portfolioview/', {
        templateUrl: '/views/partials/portfolioview.html',
        controller: 'PortfolioListCtrl'})
    .otherwise({
        redirectTo: '/'
    })

    .when('/goalsetting', {
        templateUrl: '/views/partials/goalsetting.html',
        controller: 'goalFormCtrl'})
    .otherwise({
        redirectTo: '/'
    })
    ;
})
.run(function (){

})