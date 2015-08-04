'use strict';

/* jasmine specs for controllers go here */
describe('clubLeagueManager controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('clubLeagueManager'));
  beforeEach(module('clubLeagueManagerServices'));
});
