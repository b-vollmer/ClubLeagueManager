'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

	var $scope;
	var $location;

	// load modules
	beforeEach(module('clubLeagueManagerApp'));

	beforeEach( inject( function( _$rootScope_, _$location_) {
		// create a new local scope for this test
		$scope = _$rootScope_.$new();
		$location = _$location_;
		spyOn($location, 'path').andReturn('#/abc');
	} ) );

	describe( 'bs-active-link: Set active class for active element depending on route', function() {
		var element;
		var elementTemplate;

		beforeEach(function() {
			elementTemplate = '<ul class="nav navbar-nav" bs-active-link><li><a href="#/abc" class="abc">ABC</a></li></ul>';
			element = angular.element(elementTemplate);
		});

		beforeEach( inject( function( _$compile_, $location ) {
			element = _$compile_( element )( $scope );
			$scope.$digest();
		} ) );

		it( 'should be active', function() {
			expect( element.find( 'a' )).toBe(true);
			//expect( element.find('ol' ).find( 'a' ).hasClass('active') ).toBe(false);
		} );
	});
});
