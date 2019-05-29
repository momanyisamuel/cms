'use strict';

angular.module('app.controllers', ['socketService'])

.controller('HomeCtrl', ['$scope', 'socket','$http', function ($scope, socket, $http){

    
    $scope.welcome = 'Welcome to the angular express world';
    
}])

.controller('registerCtrl',['$scope','$http',function($scope, $http){
    $scope.submitUserForm = function(){
        var url = 'http://localhost:8000/api/user/'
        $http.post(url, {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            phoneNumber: $scope.phoneNumber,
            nationalId: $scope.nationalId,
            email: $scope.userStatus,
            password: $scope.password
        },
        {
          headers: { 'Content-Type': 'application/json; charset=UTF-8'}
        }).then(function(response){ console.log(response)}).catch(err => console.log(err))
    }
}]);