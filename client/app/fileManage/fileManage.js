'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/fileManage', {
        templateUrl: 'app/fileManage/fileManage.html',
        controller: 'FileManageCtrl'
      });
  });
