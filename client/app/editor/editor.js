'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editor', {
        templateUrl: 'app/editor/editor.html',
        controller: 'EditorCtrl'
      }).when('/editor/:id', {
        templateUrl: 'app/editor/editor.html',
        controller: 'EditPostCtrl'
      });
  });
