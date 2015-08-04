'use strict';

/* Directives */
var directives = angular.module( 'clubLeagueManagerDirectives', [] );

directives.directive( 'bsActiveLink', ['$location', function( $location ) {
	return {
		restrict: 'A', //use as attribute
		replace : false,
		link    : function( scope, elem ) {
			//after the route has changed
			scope.$on( "$routeChangeSuccess", function() {
				var hrefs = ['/#' + $location.path(), '#' + $location.path(), //html5: false
										 $location.path()]; //html5: true
				angular.forEach( elem.find( 'a' ), function( a ) {
					a = angular.element( a );
					if ( -1 !== hrefs.indexOf( a.attr( 'href' ) ) ) {
						a.parent().addClass( 'active' );
					} else {
						a.parent().removeClass( 'active' );
					}
				} );
			} );
		}
	}
}] );

directives.directive( 'gameDetails', function() {
	return {
		restrict   : 'E',
		templateUrl: 'partials/game-details.html',
	}
} );

directives.directive('openGameDetails', function() {
		var openGameDetails = {
			restrict   : 'A',
			link :   function(scope, element, attrs) {
				function openGameDetails() {
					var element = angular.element('#gameDetailsModal');
					var ctrl = element.controller();
					ctrl.setModel(scope.game);
					element.modal('show');
				}
				element.bind('click', openGameDetails);
			}
		}
		return openGameDetails;
	});

directives.directive('updateFavoriteTeam', function() {
	return {
		restrict   : 'A',
		link :   function(scope, element, attrs) {
			function updateFavoriteTeam() {
				var element = angular.element('#teamSelectionModal');
				var ctrl = element.controller();
				ctrl.saveFavoriteTeam();
				element.modal('hide');
			}
			element.bind('click', updateFavoriteTeam);
		}
	}
});

directives.directive('resetFavoriteTeam', function() {
	return {
		restrict   : 'A',
		link :   function(scope, element, attrs) {
			function resetFavoriteTeam() {
				var element = angular.element('#teamSelectionModal');
				var ctrl = element.controller();
				ctrl.resetFavoriteTeam();
				element.modal('hide');
			}
			element.bind('click', resetFavoriteTeam);
		}
	}
});

directives.directive("spinner", function(){
	return {
		restrict: 'E',
		scope: {enabled:"="},
		template: '<div class="spinner" ng-show="enabled"><img class="loadingImage" src="img/spinner.gif" /></div>'
	}
});
