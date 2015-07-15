'use strict';

angular.module('workspaceApp')
  .controller('ShowTagCtrl', function ($scope, $http, $routeParams, $location) {
    $scope.posts = [];
    
    $http.get('/api/posts/').success(function(posts){
      $scope.posts = posts.filter(function(post){return post.category.indexOf($routeParams.cat) !== -1});
      if($scope.posts.length < 1){
        $location.path('/');
      }
    });
  });
