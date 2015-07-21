'use strict';

angular.module('workspaceApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'About',
      'link': '#'
    }, {
      'title': 'Archive',
      'link': '#'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.query = '';

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    
    $scope.searchSite = function(query){
      if(query){
        $location.path('/search/'+query);
      } else{
        $location.path('/');
      }
    };
  });