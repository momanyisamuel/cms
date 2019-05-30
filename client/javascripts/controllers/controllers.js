'use strict';


angular.module('app.controllers', ['socketService'])

.controller('HomeCtrl', ['$scope', 'socket','$http', function ($scope, socket, $http){

    
    $scope.welcome = 'Welcome to the angular express world';
    
}])

// .controller('registerCtrl',['$scope','$http',function($scope, $http){
//     $scope.submitUserForm = function(){
//         var url = 'http://localhost:8000/api/user/'
//         $http.post(url, {
//             firstName: $scope.firstName,
//             lastName: $scope.lastName,
//             phoneNumber: $scope.phoneNumber,
//             nationalId: $scope.nationalId,
//             email: $scope.userStatus,
//             password: $scope.password
//         },
//         {
//           headers: { 'Content-Type': 'application/json; charset=UTF-8'}
//         }).then(function(response){ console.log(response)}).catch(err => console.log(err))
//     }
// }])

.controller('loginCtrl',['$scope','$http','$location',function($scope, $http, $location){
    var currentUser = []
    $scope.submitLoginForm = function(){
        console.log($scope.email)
        var url = 'http://localhost:8000/api/login'
        $http.get(url,{
            headers : {'Accept' : 'application/json; charset=UTF-8'},
            params: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function(response){ 
            if(response.status === 200){
                console.log('youre logged in')
                localStorage.setItem('currentUser',JSON.stringify({ token:"token",email:response.data.email}))
                $location.path('/')
            }
            console.log(response.status)
        }).catch(err => console.log(err))
    }

    $scope.logout = function () {
        return localStorage.setItem('currentUser', null)
    }

}]);