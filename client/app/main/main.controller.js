'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams) {
    $scope.awesomeThings = [];

    $http.get('/api/posts').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      console.log(awesomeThings);
    });

    
  });
