'use strict';

describe('Controller: ShowTagCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var ShowTagCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowTagCtrl = $controller('ShowTagCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
