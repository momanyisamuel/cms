angular.module('pollService', ['ngResource'])
.factory('Poll', function($resource) {
    return $resource('http://localhost:8000/api/poll/:id', {id:'id'}, {
        // Use this method for getting a list of polls
        get: { method: 'GET'}
    })
})