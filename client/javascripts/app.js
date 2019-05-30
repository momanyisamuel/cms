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
    .when('/login', {
        templateUrl: '/views/partials/login.html',
        controller: 'loginCtrl'})
    .otherwise({
        redirectTo: '/'
    });
})
.run(function (){

})