'use strict';

angular.module('workspaceApp')
  .controller('FileManageCtrl', function ($scope, $http, $location, Auth, $route) {
    //This is the authentication of the view.
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    
    
    $scope.posts = [];
    $http.get('/api/posts').success(function(posts){
      console.log($scope.isLoggedIn);
      $scope.posts = posts;
    });
    
    $scope.deletePost = function(post){
      var msg = "Sure you want to delete'" + post.name+ "'?";
      var result = window.confirm(msg);
      if(result){
        $http.delete('/api/posts/'+post._id);
        $route.reload();
      }
    };
    
    $scope.createPostRe = function(){
      $location.path('/editor');
    };
    
    $scope.editPostRe = function(id){
      $location.path('/editor/'+id);
    };
    
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
    
    
    if($scope.isLoggedIn === false){
      $location.path('/login');
    }
  });
