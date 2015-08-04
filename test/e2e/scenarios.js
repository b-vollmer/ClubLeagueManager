'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('GameScheduler App', function() {

  it('should redirect index.html to index.html#/start', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url).toEqual('/start');
      });
  });

});
