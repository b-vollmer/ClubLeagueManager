'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('clubLeagueManager'));

  // Test service availability
  it('check the existence of LeaguesService factory', inject(function(LeaguesService) {
      expect(LeaguesService).toBeDefined();
    }));
});