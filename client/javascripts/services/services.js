'use strict';

// Angular service module for connecting to JSON APIs
angular.module('app.services', ['app','ngResource']).
	service('Poll', ['$resource',function($resource) {
		return $resource('http://localhost:8000/api/poll', {}, {
			// Use this method for getting a list of polls
			query: { method: 'GET', isArray: true }
		})
	}])
