'use strict';

describe('Service: Proposals', function () {

  // load the service's module
  beforeEach(module('unicorEligeApp'));

  // instantiate service
  var Proposals;
  beforeEach(inject(function (_Proposals_) {
    Proposals = _Proposals_;
  }));

  it('should do something', function () {
    expect(!!Proposals).toBe(true);
  });

});
