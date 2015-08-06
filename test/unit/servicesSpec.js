'use strict';

describe('services', function() {

  // load modules
  beforeEach(module('clubLeagueManager'));
  beforeEach(module('clubLeagueManagerConfiguration'));

  // Test service availability
  it('check the existence of LeaguesService factory', inject(function(LeaguesService) {
      expect(LeaguesService).toBeDefined();
    }));

  it('should implement an getAllTeamLeagues function', inject(function (LeaguesService, $httpBackend, config) {
    expect(LeaguesService.getAllTeamLeagues).toBeDefined();

    $httpBackend.expectGET(config.backend + "club-championships.xml" ).respond(200,'');
    LeaguesService.getAllTeamLeagues();
    $httpBackend.flush();
  }));

  it('should implement an getAllGames function', inject(function (LeaguesService, $httpBackend, config) {
    expect(LeaguesService.getAllGames).toBeDefined();

    $httpBackend.expectGET(config.backend + "gsp-1516.xml").respond(200,'');
    LeaguesService.getAllGames();
    $httpBackend.flush();
  }));

  it('should implement an getTabForLeague function', inject(function (LeaguesService, $httpBackend, config) {
    var league = 'no-league';
    expect(LeaguesService.getTabForLeague).toBeDefined();

    // non existing league won't return a valid response
    $httpBackend.expectGET(config.backend + "tab-"+league+".xml").respond(404,'');
    LeaguesService.getTabForLeague(league);
    $httpBackend.flush();
  }));
});