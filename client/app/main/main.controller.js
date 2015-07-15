'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams) {
    $scope.posts = [];

    $http.get('/api/posts').success(function(posts) {
      $scope.posts = posts;
      console.log(posts);
    });

    
  });
