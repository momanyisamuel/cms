'use strict';

angular.module('app.controllers', ['app', 'ngResource'])



.controller('HomeCtrl', ['$scope','$http', function ($scope, $http){
    $scope.welcome = 'Welcome to the angular express world';
}])

.controller('riskCtrl', ['$scope','$http','$location', function ($scope, $http,$location){

    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.submitRiskForm = function(){
        var url = 'http://localhost:8000/api/user/edit/'+user.id

        $http.put(url, {
                riskApetite: $scope.answer1
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            $location.url('/')
        }).catch(err => console.log(err))
    }
    
}])

.controller('registerCtrl',['$scope','$http','$location',function($scope, $http, $location){
    $scope.submitUserForm = function(){
        var url = 'http://localhost:8000/api/user/'
        $http.post(url, {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            phoneNumber: $scope.phoneNumber,
            nationalId: $scope.nationalId,
            email: $scope.email,
            password: $scope.password
        },
        {
          headers: { 'Content-Type': 'application/json; charset=UTF-8'}
        }).then(function(response) { 
            console.log(response) 
            $location.path('/login')
        }).catch(err => console.log(err))
    }
}])

.controller('loginCtrl',['$scope','$http','$location',function($scope, $http, $location){
    var currentUser = []
    $scope.submitLoginForm = function(){
        var url = 'http://localhost:8000/api/login'
        $http.get(url,{
            headers : {'Accept' : 'application/json; charset=UTF-8'},
            params: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function(response){ 
            console.log(response.data.userStatus)
            if(response.data.userStatus === null){
                console.log('youre logged in')
                localStorage.setItem('currentUser',
                    JSON.stringify({
                        token:"tokens",
                        email:response.data.email, 
                        userStatus:response.data.userStatus, 
                        ChamaId:response.data.ChamaId,
                        id:response.data.id
                    })
                )
                $location.url('/risk')
            }
            console.log(response.status)
        }).catch(err => console.log(err))
    }

    $scope.logout = function () {
        return localStorage.setItem('currentUser', null)
    }
}])

.controller('depositsCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.welcome = 'Welcome to the deposits page';
}])

.controller('withdrawalsCtrl', ['$scope', '$http', function ($scope, $http){ 
    $scope.welcome = 'Welcome to the withdrawals page';
}])

.controller('finesCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.welcome = 'Welcome to the fines page';
}])

.controller('loansCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.welcome = 'Welcome to the LOANS page';
}])

.controller('invitesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location){
    $scope.accept = function(){
        var url = 'http://localhost:8000/api/acceptinvite'

        $http.put(url, {
                firstName: $scope.acceptfirstName,
                lastName: $scope.acceptlastName,
                phoneNumber: $scope.acceptphoneNumber,
                nationalId: $scope.acceptnationalId,
                email: $scope.acceptemail,
                password: $scope.acceptpassword
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            $location.url('/risk')
        }).catch(err => console.log(err))
    }

     var form = document.getElementById('accept')
    form.addEventListener("submit", $scope.accept)
}])
.controller('membersCtrl', ['$scope', '$http', '$location', function ($scope, $http,$location){
  
    var user = JSON.parse(localStorage.getItem('currentUser'))
    
    $scope.sendInvite = function() {
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
    // var form = document.getElementById('inviteForm')
    // form.addEventListener("submit", $scope.sendInvite)
    
}])

.controller('portfolioCtrl', ['$scope', '$http' , '$location', function ($scope, $http, $location){
    var portfolioForm = function(){
        var url = 'http://localhost:8000/api/portfolio'

        $http.post(url, {
                name: $scope.assetName,
                category: $scope.assetCategory,
                assetFlag: $scope.assetFlag,
                description: $scope.assetDescription,
                amount: $scope.assetAmount,
                dateRecorded: $scope.dateRecorded,
                refDetails: $scope.refDetails,
                comment: $scope.comment
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            $location.url('/')
        }).catch(err => console.log(err))
    }

     var form = document.getElementById('portfolioForm')
    form.addEventListener("submit", portfolioForm)
}])


.controller('votesCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.welcome = 'Welcome to the votes page';
}])

.controller('reportsCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.welcome = 'Welcome to the reports page';
}])
.controller('pollCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.welcome = 'Welcome to the reports page';
}])

// Controller for the poll list
.controller('PollListCtrl', ['$scope' ,'$http',function ($scope, $http) {
    $http.get('http://localhost:8000/api/poll').then((response)=>{
        console.log(response.data)
        $scope.polls = response.data
    }).catch(err=>console.log(err))
}])

// Controller for an individual poll
.controller ('PollItemCtrl' , ['$scope', '$routeParams' , '$http' , function ($scope, $routeParams, $http) {	
    
    
	$http.get('http://localhost:8000/api/poll/'+$routeParams.id).then((response)=>{
        console.log(response.data)
        $scope.poll = response.data
    }).catch(err=>console.log(err))

	// socket.on('myvote', function(data) {
	// 	console.dir(data);
	// 	if(data._id === $routeParams.pollId) {
	// 		$scope.poll = data;
	// 	}
	// });
	
	// socket.on('vote', function(data) {
	// 	console.dir(data);
	// 	if(data._id === $routeParams.pollId) {
	// 		$scope.poll.choices = data.choices;
	// 		$scope.poll.totalVotes = data.totalVotes;
	// 	}		
	// });
	
	$scope.vote = function() {
		var pollId = $scope.poll.id,
				choiceId = $scope.poll.userVote;
		
		if(choiceId) {
			var voteObj = { poll_id: pollId, choice: choiceId };
			// socket.emit('send:vote', voteObj);
		} else {
			alert('You must select an option to vote for');
		}
	};
}])

// Controller for creating a new poll
.controller('PollNewCtrl' , [ '$scope', '$location','$http' ,function ($scope, $location,$http) {
	// Define an empty poll model object
	$scope.poll = {
		question: '',
		choices: [ { text: '' }, { text: '' }]
	};
	
	// Method to add an additional choice option
	$scope.addChoice = function() {
        $scope.poll.choices.push({ text: '' });
        
    };

    // Validate and save the new poll to the database
    $scope.createPoll = function() {
        var poll = $scope.poll;
        var getText = []
        // Check that a question was provided
        if(poll.question.length > 0) {
            var choiceCount = 0;
            
            // Loop through the choices, make sure at least two provided
            for(var i = 0, ln = poll.choices.length; i < ln; i++) {
                var choice = poll.choices[i];
                console.log(poll.choices[i].text)
                getText.push(poll.choices[i].text)
                
                if(choice.text.length > 0) {
                    choiceCount++
                }
            }
        
            if(choiceCount > 1) {
                // Create a new poll from the model
                // var newPoll = new Poll(poll);
                
                // Call API to save poll to the database - we need the group ID, User ID , question and choices and PollID for the Poll
               console.log(getText)
                       $http.post('http://localhost:8000/api/poll', {
                            question:poll.question,
                            choices:getText                       
                            },
                            {
                                headers: { 'Content-Type': 'application/json; charset=UTF-8'
                            }
                        }).then(function(response) { 
                            console.log(response) 
                            $location.url('/listpolls')
                        }).catch(err => console.log(err))
            
                    } else {
                        alert('You must enter at least two choices');
                    }
                } else {
                    alert('You must enter a question');
                }
            };

    
}]);