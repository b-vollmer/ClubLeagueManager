'use strict';

/* jasmine specs for controllers go here */
describe('clubLeagueManager controllers', function() {

  beforeEach(module('clubLeagueManager'));
  beforeEach(module('clubLeagueManagerServices'));
  beforeEach(module('clubLeagueManagerConfiguration'));

  describe('HomeCtrl', function(){
    var scope, ctrl, $httpBackend, localStorage;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, config, localStorageService) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET(config.backend + 'club-championships.xml').
        respond('<Gespanne><Mannschaften><Liganame>1. Bundesliga</Liganame><Vereinsname>SV Werder</Vereinsname></Mannschaften><Mannschaften><Liganame>2. Bundesliga</Liganame><Vereinsname>HSV</Vereinsname></Mannschaften></Gespanne>');

      scope = $rootScope.$new();
      ctrl = $controller('HomeCtrl', {$scope: scope});
			localStorage = localStorageService;

    }));

    it('should create "teamLeagues" model with 2 teamleagues fetched from xhr', function() {
      expect(scope.teamLeagues).not.toBeDefined();
      $httpBackend.flush();

      expect(scope.teamLeagues).toEqual(
        [{Liganame: '1. Bundesliga', Vereinsname: 'SV Werder'}, {Liganame: '2.' +
        ' Bundesliga', Vereinsname: 'HSV'}]);
    });

    it('should set the default value of favoriteClub model', function() {
      expect(scope.favoriteClub).toBe('TV Oyten');
    });

		it('should set and reset favoriteTeam in sync with localstorage model entry', function() {
			$httpBackend.flush();
			scope.favoriteTeam = scope.teamLeagues[1];
			ctrl.saveFavoriteTeam();
			expect(localStorage.get('favoriteTeam') ).toEqual(scope.favoriteTeam);
			scope.favoriteTeam = scope.teamLeagues[0];
			ctrl.resetFavoriteTeam();
			expect(scope.favoriteTeam ).not.toEqual(scope.teamLeagues[0]);
		});
  });

	describe('GameCtrl', function(){
		var scope, ctrl, $httpBackend, localStorage;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, config, localStorageService) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET(config.backend + 'gsp-1516.xml').
				respond('<AlleSpiele>' +
					'<Spiel><Heim>SV Werder</Heim><Gast>HSV</Gast><LigaName>1. Bundesliga</LigaName></Spiel>' +
					'<Spiel><Heim>FC Koeln</Heim><Gast>SV Werder</Gast><LigaName>1. Bundesliga</LigaName></Spiel>' +
					'</AlleSpiele>');

			scope = $rootScope.$new();
			ctrl = $controller('GamesCtrl', {$scope: scope});
			localStorage = localStorageService;

		}));


		it('should create "games" model with 2 game entries fetched from xhr', function() {
			expect(scope.games).not.toBeDefined();
			$httpBackend.flush();

			expect(scope.games).toEqual(
				[ { Heim: 'SV Werder', Gast: 'HSV', LigaName: '1. Bundesliga'}, { Heim: 'FC Koeln', Gast: 'SV Werder', LigaName: '1. Bundesliga'}]);
		});
	});
});
