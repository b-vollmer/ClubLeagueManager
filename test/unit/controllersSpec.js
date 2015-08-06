'use strict';

/* jasmine specs for controllers go here */
describe('clubLeagueManager controllers', function() {

  beforeEach(module('clubLeagueManager'));
  beforeEach(module('clubLeagueManagerServices'));

  describe('HomeCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('games/club-championships.xml').
        respond('<Gespanne><Mannschaften><Liganame>1. Bundesliga</Liganame><Vereinsname>SV Werder</Vereinsname></Mannschaften><Mannschaften><Liganame>2. Bundesliga</Liganame><Vereinsname>HSV</Vereinsname></Mannschaften></Gespanne>');

      scope = $rootScope.$new();
      ctrl = $controller('HomeCtrl', {$scope: scope});
    }));


    it('should create "teamLeagues" model with 2 teamleagues fetched from xhr', function() {
      expect(scope.teamLeagues).toEqualData([]);
      $httpBackend.flush();

      expect(scope.teamLeagues).toEqual(
        [{Liganame: '1. Bundesliga', Vereinsname: 'SV Werder'}, {Liganame: '2.' +
        ' Bundesliga', Vereinsname: 'HSV'}]);
    });


    it('should set the default value of favoriteTeam model', function() {
      expect(scope.favoriteClub).toBe('TV Oyten');
    });
  });
});
