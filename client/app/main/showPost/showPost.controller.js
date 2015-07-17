'use strict';

angular.module('workspaceApp')
  .controller('ShowPostCtrl', function ($scope, $routeParams, $http, $sce) {
    $scope.posts = [];
    
    $http.get('/api/posts/'+$routeParams.id).success(function(post){
      $scope.posts.push(post);
      console.log($routeParams, post);
    });
    
    
    
  });
