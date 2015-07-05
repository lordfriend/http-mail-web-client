/**
 * Listen for token fail error when state transition
 */
'use strict';

angular.module('httpMailWebClient')
  .run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if(error == 'noTokenExist' || error === 'tokenInvalid') {
        event.preventDefault();
        $state.go('login');
      }
    });
  });
