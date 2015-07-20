'use strict';

angular.module('workspaceApp')
  .controller('SearchCtrl', function ($scope, $http, $routeParams) {
    var rawPosts = [];
    $http.get('/api/posts').success(function(posts){
      $scope.posts = posts;
      var thing = "\\b"+$routeParams.query+"\\b";
      var query = new RegExp(thing);
    
      $scope.posts = $scope.posts.filter(function(post){return query.test(post.body)});
      console.log(thing);
    });
    
    
  });
