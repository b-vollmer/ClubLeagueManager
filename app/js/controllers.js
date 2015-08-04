'use strict';

/* Controllers */

var clubLeagueManagerControllers = angular.module( 'clubLeagueManagerControllers', [] );

clubLeagueManagerControllers.controller( 'HeaderCtrl', ['$scope', '$location', function( $scope, $location ) {
	$scope.isActive = function( viewLocation ) {
		return viewLocation === $location.path();
	};
}] );

clubLeagueManagerControllers.controller( 'HomeCtrl', ['$scope', '$rootScope', 'localStorageService', 'LeaguesService', function( $scope, $rootScope, localStorageService, LeaguesService) {

	if(localStorageService.get('favoriteTeam') === null) {
		console.log("No favorite Team selected!");
		var element = angular.element('#teamSelectionModal');
		element.modal('show');
	} else {
		$scope.favoriteTeam = localStorageService.get('favoriteTeam');
	}

	LeaguesService.getAllTeamLeagues().then(function(data) {
		$scope.teamLeagues = data.Mannschaften;
	}, function(data) {
		$scope.teamsFailed = true;
		console.log("Failed to retrieve team data. Reason: " + data);
	});

	this.saveFavoriteTeam = function() {
		localStorageService.set('favoriteTeam', $scope.favoriteTeam);
	}

	this.resetFavoriteTeam = function() {
		$scope.favoriteTeam = localStorageService.get('favoriteTeam');
	}
}] );

clubLeagueManagerControllers.controller( 'TableCtrl', ['$scope', '$rootScope', 'localStorageService', 'LeaguesService', function( $scope, $rootScope, localStorageService, LeaguesService ) {
	$scope.leagueName = localStorageService.get('favoriteTeam').Liganame;
	$scope.spinnerEnabled = true;

	LeaguesService.getTabForLeague(localStorageService.get('favoriteTeam' ).Liga).then(function(data) {
		$scope.table = data.Platzierung;
		$scope.leagueData = data.Spielklasse;
		$scope.spinnerEnabled = false;
	}, function(data) {
		$scope.failedTable = true;
		$scope.spinnerEnabled = false;
		console.log("Failed to retrieve table data. Reason: " + data);
	});

}] );

clubLeagueManagerControllers.controller( 'GamesCtrl', ['$scope', '$rootScope', 'localStorageService', 'LeaguesService', function( $scope, $rootScope, localStorageService, LeaguesService ) {
	$scope.leagueName = localStorageService.get('favoriteTeam').Liganame;
	$scope.spinnerEnabled = true;

	LeaguesService.getAllGames().then(function(data) {
			$scope.games = data;
			$scope.spinnerEnabled = false;
		}, function(data) {
			$scope.failedGames = true;
			$scope.spinnerEnabled = false;
			console.log("Failed to retrieve game data. Reason: " + data);
		});

	$scope.sort = {
		column    : 'SpielVon',
		descending: false
	};

	$scope.changeSorting = function() {

		var sort = $scope.sort;
		sort.descending = !sort.descending;
	};
}] );

clubLeagueManagerControllers.controller( 'GameDetailsCtrl', ['$scope', function( $scope ) {

	this.setModel = function(data) {
		$scope.$apply( function() {
			$scope.game = data;
		});
	}
	$scope.setModel = this.setModel;
}] );