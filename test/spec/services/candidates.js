'use strict';

describe('Service: Candidates', function () {

  // load the service's module
  beforeEach(module('unicorEligeApp'));

  // instantiate service
  var Candidates;
  beforeEach(inject(function (_Candidates_) {
    Candidates = _Candidates_;
  }));

  it('should do something', function () {
    expect(!!Candidates).toBe(true);
  });

});
