'use strict';

angular.module('workspaceApp')
  .controller('ShowPostCtrl', function ($scope, $routeParams, $http) {
    $scope.awesomeThings = [];
    
    $http.get('/api/posts/'+$routeParams.id).success(function(post){
      $scope.awesomeThings.push(post);
      console.log($routeParams, post);
    });
    
    
    
  });
