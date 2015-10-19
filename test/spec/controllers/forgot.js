'use strict';

describe('Controller: ForgotCtrl', function () {

  // load the controller's module
  beforeEach(module('unicorEligeApp'));

  var ForgotCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForgotCtrl = $controller('ForgotCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ForgotCtrl.awesomeThings.length).toBe(3);
  });
});
