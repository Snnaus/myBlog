'use strict';

describe('Controller: ShowPostCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var ShowPostCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowPostCtrl = $controller('ShowPostCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
