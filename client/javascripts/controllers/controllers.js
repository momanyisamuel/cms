'use strict';

angular.module('app.controllers', ['socketService','pollService', 'ngResource'])



.controller('HomeCtrl', ['$scope','$http','$location', function ($scope, $http, $location){
    
    $scope.authenticatedUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log($scope.authenticatedUser)

    if($scope.authenticatedUser.ChamaId === null) {

        let message = `<h4>Hey ${ $scope.authenticatedUser.firstName } You need to create a Chama <span><i class="fa fa-times"></i></span></h4>`
    

        document.getElementById('message').innerHTML = message

        var createChama = function(){
            var url = 'http://localhost:8000/api/chama'
    
            $http.post(url, {
                    name: $scope.name,
                    country: $scope.country,
                },
                {
                    headers: { 'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(function(response) { 
                console.log(response.data.id) 
                var localstor = JSON.parse(localStorage.getItem('currentUser'))
                localstor.ChamaId = response.data.id;
                console.log(localstor)
                localStorage.setItem('currentUser', JSON.stringify(localstor));

                var url = 'http://localhost:8000/api/user/edit/'+$scope.authenticatedUser.id
                $http.put(url, {
                        ChamaId: response.data.id,
                        admin: 1
                    },
                    {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8'
                    }
                }).then(function(response) { 
                    console.log(response)
                }).catch(err => console.log(err))
                $location.url('/members')
            }).catch(err => console.log(err))
        }
        var form = document.getElementById('createChama')
        form.addEventListener("submit", createChama)

    } else {    
        let message = `<h4>Hey ${ $scope.authenticatedUser.firstName } You already belong to  <span><i class="fa fa-times"></i></span></h4>`
    

        document.getElementById('message').innerHTML = message

    }
    



    
    
    
}])

.controller('riskCtrl', ['$scope','$http','$location', function ($scope, $http,$location){

    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.submitRiskForm = function(){
        console.log("clicked")
        var url = 'http://localhost:8000/api/user/edit/'+user.id
        
        var riskSum = parseInt($scope.answer1)+parseInt($scope.answer2)+parseInt($scope.answer3)+parseInt($scope.answer4)+parseInt($scope.answer5)+parseInt($scope.answer6)+parseInt($scope.answer7)+parseInt($scope.answer8)+parseInt($scope.answer9)+parseInt($scope.answer10)+parseInt($scope.answer11)

        var userRisk = riskSum/11
        console.log(userRisk)

        if(userRisk >0 && userRisk<1.6 ){
            console.log('low')
        }else if(userRisk >1.68 && userRisk<2.35){
            console.log('medium')
        }else if(userRisk>2.36 && userRisk<3){
            console.log('High')
        }

        $http.put(url, {
                riskApetite: userRisk,
                admin: 0
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
            console.log(response.data)
            if(response.data.userStatus === null){
                console.log('youre logged in')
                localStorage.setItem('currentUser',
                    JSON.stringify({
                        token:"tokens",
                        firstName: response.data.firstName,
                        email:response.data.email, 
                        userStatus:response.data.userStatus, 
                        ChamaId:response.data.ChamaId,
                        id:response.data.id
                    })
                )
                if(response.data.riskApetite === null)
                {
                    $location.url('/risk')
                } else {
                    $location.url('/')
                }
            }
            
            console.log(response.status)
        }).catch(err => console.log(err))
    }

    $scope.logout = function () {
        return localStorage.setItem('currentUser', null)
        
    }
}])

.controller('contributionCtrl',  ['$scope','$http','$location', function ($scope, $http, $location){
    var contributionForm = function(){
        var url = 'http://localhost:8000/api/contribution'

        $http.post(url, {
            contributionDate: $scope.contributionDate,
            payRefNumber: $scope.payRefNumber,
            contributionAmount: $scope.contributionAmount,
            fundAssignment: $scope.fundAssignment,
            comment: $scope.comment
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            $location.url('/members')
        }).catch(err => console.log(err))
    }

     var form = document.getElementById('contributionForm')
    form.addEventListener("submit", contributionForm)
}])

.controller('withdrawalsCtrl', ['$scope', '$http', function ($scope, $http){ 
    $scope.welcome = 'Welcome to the withdrawals page';
}])

.controller('finesCtrl',  ['$scope','$http','$location', function ($scope, $http, $location){
    var fineMember = function(){
        var url = 'http://localhost:8000/api/fine'

        $http.post(url, {
            fineDate: $scope.fineDate,
            fineCategory: $scope.fineCategory,
            fineAmount: $scope.fineAmount,
            comment: $scope.comment
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            $location.url('/members')
        }).catch(err => console.log(err))
    }

     var form = document.getElementById('fineMember')
    form.addEventListener("submit", fineMember)
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
            $location.url('/portfolioview')
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
.controller ('PollItemCtrl' , ['$scope', '$routeParams' , '$http','socket','Poll' , function ($scope, $routeParams, $http, socket, Poll) {	
    socket.on('init', function (data){
        console.log('hello')
    });

    $scope.poll = Poll.get({pollId: $routeParams.id});
	// $http.get('http://localhost:8000/api/poll/'+$routeParams.id).then((response)=>{
    //     console.log(response.data)
    //     $scope.poll = response.data
    // }).catch(err=>console.log(err))

	socket.on('myvote', function(data) {
		console.log(data);
		if(data.id === $routeParams.id) {
			$scope.poll = data;
		}
	});
	
	socket.on('vote', function(data) {
		console.dir(data);
		if(data.id === $routeParams.id) {
			$scope.poll.choices = data.choices;
			$scope.poll.totalVotes = data.totalVotes;
		}		
	});
	
	$scope.vote = function() {
		var pollId = $scope.poll.id,
				choiceId = $scope.poll.userVote;
		
		if(choiceId) {
			var voteObj = { poll_id: pollId, choice: choiceId };
			socket.emit('send:vote', voteObj);
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

    
}])

// Controller for the portfolio list
.controller('PortfolioListCtrl', ['$scope' ,'$http',function ($scope, $http) {
    $http.get('http://localhost:8000/api/portfolio').then((response)=>{
        console.log(response.data)
        $scope.portfolios = response.data
    }).catch(err=>console.log(err))

}]);
