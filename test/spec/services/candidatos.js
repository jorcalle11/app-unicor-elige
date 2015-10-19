'use strict';

describe('Service: Candidatos', function () {

  // load the service's module
  beforeEach(module('unicorEligeApp'));

  // instantiate service
  var Candidatos;
  beforeEach(inject(function (_Candidatos_) {
    Candidatos = _Candidatos_;
  }));

  it('should do something', function () {
    expect(!!Candidatos).toBe(true);
  });

});
