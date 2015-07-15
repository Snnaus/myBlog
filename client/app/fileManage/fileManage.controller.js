'use strict';

angular.module('workspaceApp')
  .controller('FileManageCtrl', function ($scope, $http, $location, Auth) {
    //This is the authentication of the view.
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    
    $scope.posts = [];
    $http.get('/api/posts').success(function(posts){
      $scope.posts = posts;
    });
    
    $scope.deletePost = function(post){
      var msg = "Sure you want to delete'" + post.name+ "'?";
      var result = window.confirm(msg);
      if(result){
        $http.delete('/api/posts/'+post._id);
        $location.path('/fileManage');
      }
    };
    
    $scope.createPostRe = function(){
      $location.path('/editor');
    };
  });
