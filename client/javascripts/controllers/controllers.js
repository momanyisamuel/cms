'use strict';

angular.module('app.controllers', ['socketService','pollService', 'ngResource','ngSanitize'])



.controller('HomeCtrl', ['$scope','$http','$location', function ($scope, $http, $location){
    let user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.authenticatedUser = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = $scope.authenticatedUser
    console.log($scope.authenticatedUser)

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

    // coontribution totals
    $http.get('http://localhost:8000/api/chama').then(response => {
        let contribute = response.data
        var total = 0
        Object.keys(contribute).forEach(function(key){
            let contributionTotals = []
            let amount = contribute[key].contributions
            for(let i=0;i<amount.length; i++){
                if(user.ChamaId === amount[i].ChamaId){
                    contributionTotals.push(amount[i].contributionAmount)
                }
            }
            for(let j =0;j<contributionTotals.length; j++){
                console.log(contributionTotals[j])
                total += contributionTotals[j]
            }
        })
        console.log(total)
        $scope.totals = total
    }).catch(err=>console.log(err))

    // total withdrawals
    $http.get('http://localhost:8000/api/chama').then(response => {
        let withdraw = response.data
        var totalWithdrawn = 0
        Object.keys(withdraw).forEach(function(key){
            let withdrawalTotals = []
            let withdrew = withdraw[key].withdrawals
            for(let i=0;i<withdrew.length; i++){
                if(user.ChamaId === withdrew[i].ChamaId){
                    withdrawalTotals.push(withdrew[i].withdrawalAmount)
                }
            }
            for(let j =0;j<withdrawalTotals.length; j++){
                console.log(withdrawalTotals[j])
                total += withdrawalTotals[j]
            }
        })
        console.log(totalWithdrawn)
        $scope.withdrawTotal = totalWithdrawn
    }).catch(err=>console.log(err))

    // total assets or liabilities
    $http.get('http://localhost:8000/api/chama').then(response => {
        let data = response.data
        var totalAssets = 0
        var totalLiabilities = 0
        Object.keys(data).forEach(function(key){
            let assetTotals = []
            let liabilityTotals = []
            let passData = data[key].portfolioes
            for(let i=0;i<passData.length; i++){
                // console.log(passData[i].amount)
                if(user.ChamaId === passData[i].ChamaId && passData[i].assetFlag === 1){
                    console.log(passData[i].amount)
                    assetTotals.push(passData[i].amount)
                } else if (user.ChamaId === passData[i].ChamaId && passData[i].assetFlag === 2 ){
                    liabilityTotals.push(passData[i].amount)
                    console.log(passData[i].amount)
                }
            }
            for(let j =0;j<liabilityTotals.length; j++){
                console.log(liabilityTotals[j])
                totalLiabilities += liabilityTotals[j]
            }

            for(let j =0;j<assetTotals.length; j++){
                console.log(assetTotals[j])
                totalAssets += assetTotals[j]
            }
        })
        console.log(totalAssets)
        $scope.liabilityTotal = totalLiabilities
        $scope.assetTotal = totalAssets
    }).catch(err=>console.log(err))
   
    var self = this;
    
    self.showBoxOne = false;
    self.showBoxTwo = false;
    if($scope.authenticatedUser.ChamaId === null) {

        let message = `<div class="alert alert-info" role="alert"><p>Hey ${ $scope.authenticatedUser.firstName } You need to create a Chama </p><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
    

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
        let message = `<div class="alert alert-warning">${ $scope.authenticatedUser.firstName } You  belong to  a chama Karibu Sana!<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`
    
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
            password: $scope.password,
            userStatus: 1
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
            if(response.data.userStatus === 0 || response.data.userStatus === 1 ){
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
    console.log(user.ChamaId)
    var contributionForm = function(){
        var url = 'http://localhost:8000/api/contribution'

        $http.post(url, {
            contributionDate: $scope.contributionDate,
            payRefNumber: $scope.payRefNumber,
            contributionAmount: $scope.contributionAmount,
            fundAssignment: $scope.fundAssignment,
            comment: $scope.comment,
            UserId: user.id,
            ChamaId:user.ChamaId
            },
            {
                headers: { 'Content-Type': 'application/json; charset=UTF-8'
            }
        }).then(function(response) { 
            console.log(response.data) 
            
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
            UserId: user.id,
            ChamaId: user.ChamaId
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
            $location.url('/login')
        }).catch(err => console.log(err))
    }

     var form = document.getElementById('accept')
    form.addEventListener("submit", $scope.accept)
}])
.controller('membersCtrl', ['$scope', '$http', '$location', function ($scope, $http,$location){
  
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
    $scope.members = []
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
    $http.get('http://localhost:8000/api/user').then(response => {
        console.log(response.data)
        let member = response.data
        Object.keys(member).forEach(function(key){
            
            console.log(member[key].userStatus)
            let state = member[key].userStatus
            let email = member[key].email
            let chama = member[key].chama
            let status = ''
            if(state === 0 ) {
                status = 'Invited'
            } else if (state === 1) {
                status = 'Active'
            } else if (state === 2) {
                status = 'Revoked'
            }
            
            if(user.ChamaId === chama.id){
                $scope.members.push({email:email,chama:chama.name,ChamaId:chama.id,status:status})
            }
        })
        console.log($scope.members)
        
    }).catch(err=>console.log(err))

    var user = JSON.parse(localStorage.getItem('currentUser'))

    
    
}])

.controller('portfolioCtrl', ['$scope', '$http' , '$location', function ($scope, $http, $location){
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
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
    // coontribution totals
    $http.get('http://localhost:8000/api/chama').then(response => {
        let contribute = response.data
        // console.log(response.data)
        var total = 0
        Object.keys(contribute).forEach(function(key){
            let contributionTotals = []
            let amount = contribute[key].contributions
            // console.log(amount)
            $scope.contributions = amount
            for(let i=0;i<amount.length; i++){
                if(user.ChamaId === amount[i].ChamaId){
                    contributionTotals.push(amount[i].contributionAmount)
                }
            }
            for(let j =0;j<contributionTotals.length; j++){
                // console.log(contributionTotals[j])
                total += contributionTotals[j]
            }
        })
        // console.log(total)
        $scope.totals = total
    }).catch(err=>console.log(err))

    // total withdrawals
    $http.get('http://localhost:8000/api/chama').then(response => {
        let withdraw = response.data
        var totalWithdrawn = 0
        Object.keys(withdraw).forEach(function(key){
            let withdrawalTotals = []
            let withdrew = withdraw[key].withdrawals
            for(let i=0;i<withdrew.length; i++){
                if(user.ChamaId === withdrew[i].ChamaId){
                    withdrawalTotals.push(withdrew[i].withdrawalAmount)
                }
            }
            for(let j =0;j<withdrawalTotals.length; j++){
                // console.log(withdrawalTotals[j])
                total += withdrawalTotals[j]
            }
        })
        // console.log(totalWithdrawn)
        $scope.withdrawTotal = totalWithdrawn
    }).catch(err=>console.log(err))

    // total assets or liabilities
    $http.get('http://localhost:8000/api/chama').then(response => {
        let data = response.data
        var totalAssets = 0
        var totalLiabilities = 0
        $scope.assets = []
        Object.keys(data).forEach(function(key){
            let assetTotals = []
            let liabilityTotals = []
            let passData = data[key].portfolioes
            
            
            for(let i=0;i<passData.length; i++){
                $scope.assets.push(passData[i])
                // console.log(passData[i].amount)
                if(user.ChamaId === passData[i].ChamaId && passData[i].assetFlag === 1){
                    // console.log(passData[i].amount)
                    assetTotals.push(passData[i].amount)
                } else if (user.ChamaId === passData[i].ChamaId && passData[i].assetFlag === 2 ){
                    liabilityTotals.push(passData[i].amount)
                    // console.log(passData[i].amount)
                }
            }
            for(let j =0;j<liabilityTotals.length; j++){
                // console.log(liabilityTotals[j])
                totalLiabilities += liabilityTotals[j]
            }

            for(let j =0;j<assetTotals.length; j++){
                // console.log(assetTotals[j])
                totalAssets += assetTotals[j]
            }
        })
        // console.log(totalAssets)
        $scope.liabilityTotal = totalLiabilities
        $scope.assetTotal = totalAssets
    }).catch(err=>console.log(err))

    $http.get('http://localhost:8000/api/user').then(response => {
        console.log(response.data)
        let member = response.data
        $scope.members = []
        Object.keys(member).forEach(function(key){
            
            console.log(member[key].userStatus)
            let state = member[key].userStatus
            let email = member[key].email
            let firstName = member[key].firstName
            let lastName = member[key].lastName
            let chama = member[key].chama
            let status = ''
            if(state === 0 ) {
                status = 'Invited'
            } else if (state === 1) {
                status = 'Active'
            } else if (state === 2) {
                status = 'Revoked'
            }
            $scope.members.push({firstName:firstName,lastName:lastName,email:email,chama:chama.name,ChamaId:chama.id,status:status})
            
        })
        console.log($scope.members)
        
    }).catch(err=>console.log(err))

   
}])

.controller('votesCtrl', ['$scope', '$http','$location', function ($scope, $http, $location){
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
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
// Controller for an individual poll
.controller ('PollItemCtrl' , ['$scope', '$routeParams' , '$http','$location', function ($scope, $routeParams, $http,$location) {	
    var user = JSON.parse(localStorage.getItem('currentUser'))
    $scope.user = user
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
.controller('PortfolioListCtrl', ['$scope' ,'$http','$location',function ($scope, $http, $location) {
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
                comment: $scope.comment,
                ChamaId: user.ChamaId
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

