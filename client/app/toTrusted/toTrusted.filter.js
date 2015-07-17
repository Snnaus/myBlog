'use strict';

angular.module('workspaceApp')
  .filter('toTrusted', ['$sce', function ($sce) {
    return function (input) {
      return $sce.trustAsHtml(input);
    };
  }]);
