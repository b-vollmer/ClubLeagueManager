'use strict';

describe('services', function() {

  // load modules
  beforeEach(module('clubLeagueManager'));

  // Test service availability
  it('check the existence of LeaguesService factory', inject(function(LeaguesService) {
      expect(LeaguesService).toBeDefined();
    }));

  it('should implement an getAllTeamLeagues function', inject(function (LeaguesService, $httpBackend) {
    expect(LeaguesService.getAllTeamLeagues).toBeDefined();

    $httpBackend.expectGET("games/club-championships.xml" ).respond(200,'');
    LeaguesService.getAllTeamLeagues();
    $httpBackend.flush();
  }));

  it('should implement an getAllGames function', inject(function (LeaguesService, $httpBackend) {
    expect(LeaguesService.getAllGames).toBeDefined();

    $httpBackend.expectGET("games/gsp-1516.xml").respond(200,'');
    LeaguesService.getAllGames();
    $httpBackend.flush();
  }));

  it('should implement an getTabForLeague function', inject(function (LeaguesService, $httpBackend) {
    var league = 'no-league';
    expect(LeaguesService.getTabForLeague).toBeDefined();

    // non existing league won't return a valid response
    $httpBackend.expectGET("games/tab-"+league+".xml").respond(404,'');
    LeaguesService.getTabForLeague(league);
    $httpBackend.flush();
  }));
});