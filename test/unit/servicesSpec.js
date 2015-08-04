'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('clubLeagueManagerApp'));

  // Test service availability
  it('check the existence of Data factory', inject(function(Games) {
      expect(Games).toBeDefined();
    }));
});