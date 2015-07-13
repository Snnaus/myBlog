'use strict';

angular.module('workspaceApp')
  .controller('EditorCtrl', function ($scope, Auth, $location) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    $scope.preview = false;
    $scope.typed = '';
    $scope.result = '';
    $scope.title = '';
    $scope.author = 'Glenn Nausley'
    /*if($scope.isLoggedIn === false){
      $location.path('/');
    }*/
    
    var converter = new showdown.Converter();
    
    $scope.convert = function(content){
      if(content){
        var date = new Date();
        date = date.getMonth()+ 1 +'/'+ date.getDate() +'/'+date.getFullYear();
        content = "##"+$scope.title + '\n' + '#####' + date + '\n' + content;
        $scope.result = converter.makeHtml(content);
        $scope.preview = true;
      }
    };
    
    $scope.goBack = function(){
      $scope.preview = false;
    };
  });
