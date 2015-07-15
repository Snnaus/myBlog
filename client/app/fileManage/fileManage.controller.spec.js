'use strict';

describe('Controller: FileManageCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var FileManageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FileManageCtrl = $controller('FileManageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
