'use strict';

angular.module('app.controllers', ['socketService','pollService', 'ngResource'])



.controller('HomeCtrl', ['$scope','$http','$location', function ($scope, $http, $location){
    
    $scope.authenticatedUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log($scope.authenticatedUser)

    if($scope.authenticatedUser.ChamaId === null) {

        let message = `<div class="alert alert-info" role="alert">Hey ${ $scope.authenticatedUser.firstName } You need to create a Chama <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
    

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

                var url = 'http://localhost:8000/api/user/editChamaId/'+$scope.authenticatedUser.id
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
        let message = `<div class="alert alert-warning">${ $scope.authenticatedUser.firstName } You already belong to  a chama <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
    
        document.getElementById('message').innerHTML = message
    }   
}])

.controller('riskCtrl', ['$scope','$http','$location', function ($scope, $http,$location){

    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.submitRiskForm = function(){
        console.log("clicked")
        var url = 'http://localhost:8000/api/user/editRiskAppetite/'+user.id
        
        var riskSum = parseInt($scope.answer1)+parseInt($scope.answer2)+parseInt($scope.answer3)+parseInt($scope.answer4)+parseInt($scope.answer5)+parseInt($scope.answer6)+parseInt($scope.answer7)+parseInt($scope.answer8)+parseInt($scope.answer9)+parseInt($scope.answer10)+parseInt($scope.answer11)

        var userRisk = riskSum/11
        console.log(userRisk)

        $http.put(url, {
                riskApetite: userRisk
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            var localstor = JSON.parse(localStorage.getItem('currentUser'))
            localstor.riskApetite = userRisk;
            localStorage.setItem('currentUser', JSON.stringify(localstor));
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
            if(response.data.userStatus === 0){
                console.log('youre logged in')
                localStorage.setItem('currentUser',
                    JSON.stringify({
                        token:"tokens",
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email:response.data.email, 
                        userStatus:response.data.userStatus, 
                        phoneNumber: response.data.phoneNumber,
                        ChamaId:response.data.ChamaId,
                        id:response.data.id,
                        riskApetite:response.data.riskApetite
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

    
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
    console.log(user.id)
    var contributionForm = function(){
        var url = 'http://localhost:8000/api/contribution'

        $http.post(url, {
            contributionDate: $scope.contributionDate,
            payRefNumber: $scope.payRefNumber,
            contributionAmount: $scope.contributionAmount,
            fundAssignment: $scope.fundAssignment,
            comment: $scope.comment,
            UserId: user.id
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            window.location.href = "http://localhost:8000/#/members"
        }).catch(err => console.log(err))
    }

     var form = document.getElementById('contributionForm')
    form.addEventListener("submit", contributionForm)

    

    $http.get('http://localhost:8000/api/contribution').then((response)=>{
        console.log(response.data)
        let contribute = response.data
        $scope.contributions = []
        contribute.forEach(element => {
            console.log(element)
            if(element.UserId === user.id)
            {
                $scope.contributions.push(element)
                console.log($scope.contributions)
            } else {
                console.log('No Contributions yet.')
            }
        });
        
    }).catch(err => console.log(err))
}
])

.controller('withdrawalsCtrl', ['$scope', '$http', function ($scope, $http){ 
     
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
    console.log(user.id)
    var withdrawalForm = function(){
        var url = 'http://localhost:8000/api/withdrawal'

        $http.post(url, {
            withdrawalDate: $scope.withdrawalDate,
            withdrawRefNumber: $scope.withdrawRefNumber,
            withdrawalAmount: $scope.withdrawalAmount,
            paymentPurpose: $scope.paymentPurpose,
            comment: $scope.comment,
            UserId: user.id
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            window.location.href = "http://localhost:8000/#/members"
        }).catch(err => console.log(err))
    }

     var form = document.getElementById('withdrawalForm')
    form.addEventListener("submit", withdrawalForm)

    

    $http.get('http://localhost:8000/api/withdrawal').then((response)=>{
        console.log(response.data)
        let withdrawn = response.data
        $scope.withdrawals = []
        withdrawn.forEach(element => {
            console.log(element)
            if(element.UserId === user.id)
            {
                $scope.withdrawals.push(element)
                console.log($scope.withdrawals)
            } else {
                console.log('No Withdrawals yet.')
            }
        });
        
    }).catch(err => console.log(err))
}
])


.controller('finesCtrl',  ['$scope','$http','$location', function ($scope, $http, $location){
    
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user

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

.controller('loansCtrl',['$scope', '$http', '$location', function ($scope, $http,$location){
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
    console.log(user.id)
    var loanForm = function(){
        var url = 'http://localhost:8000/api/loan'

        $http.post(url, {
            loanAmount: $scope.loanAmount,
            loanDuration: $scope.loanDuration,
            loanRate: $scope.loanRate,
            UserId: user.id
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            window.location.href = "http://localhost:8000/#/members"
        }).catch(err => console.log(err))
    }

     var form = document.getElementById('loanForm')
    form.addEventListener("submit", loanForm)

    $http.get('http://localhost:8000/api/loan').then((response)=>{
        console.log(response.data)
        let loansTaken = response.data
        $scope.loaned = []
        loansTaken.forEach(element => {
            console.log(element)
            if(element.UserId === user.id)
            {
                $scope.loaned.push(element)
                console.log($scope.loaned)
            } else {
                console.log('No Loans yet.')
            }
        })
    });
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
    $scope.user = user
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
    console.log(user.phoneNumber)
    if(user.riskApetite >0 && user.riskApetite<1.6 ){
        console.log(user.riskApetite)
        $scope.riskName = 'LOW'
    }else if(user.riskApetite >1.68 && user.riskApetite<2.35){
        console.log('medium')
        $scope.riskName = 'MEDIUM'   
    }else if(user.riskApetite>2.36 && user.riskApetite<=3){
        console.log('High')
        $scope.riskName = 'HIGH'

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




.controller('reportsCtrl', ['$scope', '$http', function ($scope, $http){
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
}])

.controller('votesCtrl', ['$scope', '$http','$location', function ($scope, $http, $location){

    $http.get('http://localhost:8000/api/poll').then((response)=>{
        console.log(response.data.choi)
        var questions = response.data
        $scope.choices = []
        questions.forEach(element => {
            console.log(element.choices)
            let options = element.choices
            options.forEach(element => {
                console.log(element)
                $scope.choices.push(element)
            })
        });
        
        $scope.votes = response.data
        console.log($scope.votes)
    }).catch(err=>console.log(err))

// Controller for an individual poll
.controller ('PollItemCtrl' , ['$scope', '$routeParams' , '$http','socket','Poll' , function ($scope, $routeParams, $http, socket, Poll) {	
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user



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
                            $location.url('/votes')
                        }).catch(err => console.log(err))
            
                    } else {
                        alert('You must enter at least two choices');
                    }
                } else {
                    alert('You must enter a question');
                }
            };

}])

.controller('reportsCtrl', ['$scope', '$http', function ($scope, $http){
    $scope.welcome = 'Welcome to the reports page';
}])


// Controller for an individual poll
.controller ('PollItemCtrl' , ['$scope', '$routeParams' , '$http','$location', function ($scope, $routeParams, $http,$location) {	
   
    $http.get('http://localhost:8000/api/poll/'+$routeParams.id).then((response)=>{
        console.log(response.data)
        $scope.poll = response.data
    }).catch(err=>console.log(err))

	
	
	$scope.vote = function() {
        console.log($scope.poll.answer)
        let url = 'http://localhost:8000/api/vote'
        $http.post(url, {
                ChoiceId: $scope.poll.answer,
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response) 
            $location.url('/votes')
        }).catch(err => console.log(err))
	};
}])

// Controller for the portfolio list
.controller('PortfolioListCtrl', ['$scope' ,'$http',function ($scope, $http) {
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
    $http.get('http://localhost:8000/api/portfolio').then((response)=>{
        console.log(response.data)
        $scope.portfolios = response.data
    }).catch(err=>console.log(err))

    var portfolioForm = function(){
        var user = JSON.parse(localStorage.getItem('currentUser'))
        $scope.user = user

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

}]);

