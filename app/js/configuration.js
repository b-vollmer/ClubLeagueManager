'use strict';

/* Configuration */

var clubLeagueManagerConfiguration = angular.module( 'clubLeagueManagerConfiguration', [] )
    .constant('config', {
        'club': "TV Oyten",
        // base url for SIS-Handball XML Exporter API
        'backend': '../xml/'
    });
