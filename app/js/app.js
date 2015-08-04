'use strict';

/* App Module */

var gameScheduleApp = angular.module('clubLeagueManager', [
  'ngRoute',
  'LocalStorageModule',
  'clubLeagueManagerAnimations',
  'clubLeagueManagerControllers',
  'clubLeagueManagerFilters',
  'clubLeagueManagerServices',
  'clubLeagueManagerDirectives'
]).run(function($rootScope){
  $rootScope.favoriteClub = "TV Oyten";
});

gameScheduleApp.config(['$routeProvider', 'localStorageServiceProvider',
  function($routeProvider, localStorageServiceProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'partials/start.html',
        controller: 'HomeCtrl'
      }).
      when('/table', {
        templateUrl: 'partials/game-table.html',
        controller: 'TableCtrl'
      }).
      when('/games', {
        templateUrl: 'partials/game-schedule.html',
        controller: 'GamesCtrl'
      }).
      otherwise({
        redirectTo: '/start'
      });
    localStorageServiceProvider.setPrefix('clubLeagueManager');
  }]);
