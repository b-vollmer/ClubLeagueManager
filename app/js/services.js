'use strict';

/* Services */

var clubLeagueManagerServices = angular.module('clubLeagueManagerServices', []);

clubLeagueManagerServices.factory('LeaguesService', function($http, $q){

	function getAllTeamLeagues() {
		return $http.get( 'games/club-championships.xml', {
		} ).then( function( response ) {
			var x2js = new X2JS();
			var json = x2js.xml_str2json( response.data );
			if(json != null) {
				return json.Gespanne;
			} else {
				$q.reject("Invalid Data.");
			}
		}, function( response ) {
			return $q.reject( response.status + " - " + response.statusText );
		} );
	}

	function getAllGames() {
		return $http.get( 'games/gsp-1516.xml', {
		} ).then( function( response ) {
			var x2js = new X2JS( {
				datetimeAccessFormPaths: ["AlleSpiele.Spiel.SpielDatum", "AlleSpiele.Spiel.SpielVon", "AlleSpiele.Spiel.SpielBis"]
			} );
			var json = x2js.xml_str2json( response.data );
			if(json != null) {
				return json.AlleSpiele.Spiel;
			} else {
				$q.reject("Invalid Data.");
			}
		}, function( response ) {
			return $q.reject( response.status + " - " + response.statusText );
		} );
	}

	function getTabForLeague(league) {
		return $http.get( "games/tab-"+league+".xml", {
		} ).then( function( response ) {
			var x2js = new X2JS();
			var json = x2js.xml_str2json( response.data );
			if(json != null) {
				return json.TabelleGesamtMitAK;
			} else {
				$q.reject("Invalid Data.");
			}
		}, function( response ) {
			return $q.reject( response.status + " - " + response.statusText );
		} );
	}
	// return public methods
	return {
		getAllTeamLeagues : getAllTeamLeagues,
		getAllGames : getAllGames,
		getTabForLeague : getTabForLeague
	}
});