'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).when('/id/:id/:postID?',{
        templateUrl: 'app/main/main.html',
        controller: 'ShowPostCtrl'
      }).when('/cat/:cat/',{
        templateUrl: 'app/main/main.html',
        controller: 'ShowTagCtrl'
      }).when('/search/:query', {
        templateUrl: 'app/main/main.html',
        controller: 'SearchCtrl'
      });
  });