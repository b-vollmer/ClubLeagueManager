'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

	var  $rootScope, $scope, $location, $compile;

	// load modules
	beforeEach(module('clubLeagueManager'));

	beforeEach( inject( function(_$compile_, _$rootScope_, _$location_) {
		$compile = _$compile_;
		$location = _$location_;
		$rootScope = _$rootScope_;
		// create a new local child scope for this test
		$scope = _$rootScope_.$new();

	} ) );

	describe( 'bs-active-link: Set active class for active element depending on route', function() {

		var elementTpl = '<div><ul class="nav navbar-nav" bs-active-link><li><a href="/abc">ABC</a></li></ul></div>';

		it( 'link should be marked active after route changed event', inject(function() {
			spyOn($location, "path").and.returnValue("/abc");

			var element = $compile(elementTpl)($scope);
			$scope.$apply();

			expect( $location.path() ).toBe('/abc');
			expect( element.find( 'a' ).attr('href')).toBeDefined();
			expect( element.find( 'a' ).attr('href')).toBe("/abc");
			expect( element.find( 'li' ).attr('class')).not.toBeDefined();

			$rootScope.$broadcast('$routeChangeSuccess', {});

			expect( element.find( 'li' ).attr('class')).toBeDefined();
			expect( element.find( 'li' ).hasClass('active') ).toBe(true);
		}));

		it( 'link should not be marked active after route changed event', inject(function() {
			spyOn($location, "path").and.returnValue("/xyz");

			var element = $compile(elementTpl)($scope);
			$scope.$apply();

			$rootScope.$broadcast('$routeChangeSuccess', {});

			expect( element.find( 'li' ).hasClass('active') ).not.toBe(true);
		}));
	});
});
