'use strict';

angular.module('app.controllers', ['socketService'])
.controller('HomeCtrl', ['$scope', 'socket','$http', function ($scope, socket, $http){
    $scope.welcome = 'Welcome to the angular express world';
}]);