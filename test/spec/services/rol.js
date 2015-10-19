'use strict';

describe('Service: Rol', function () {

  // load the service's module
  beforeEach(module('unicorEligeApp'));

  // instantiate service
  var Rol;
  beforeEach(inject(function (_Rol_) {
    Rol = _Rol_;
  }));

  it('should do something', function () {
    expect(!!Rol).toBe(true);
  });

});
