'use strict';

angular.module('app', ['app.controllers', 'ngRoute'])
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
    .when('/deposits', {
        templateUrl: '/views/partials/deposits.html',
        controller: 'depositsCtrl'})
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
    });
})
.run(function (){

})