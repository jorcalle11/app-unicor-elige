'use strict';

describe('Service: Unicor', function () {

  // load the service's module
  beforeEach(module('unicorEligeApp'));

  // instantiate service
  var Unicor;
  beforeEach(inject(function (_Unicor_) {
    Unicor = _Unicor_;
  }));

  it('should do something', function () {
    expect(!!Unicor).toBe(true);
  });

});
