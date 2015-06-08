'use strict';

angular.module('httpMailWebClient')
  .service('Session', function() {
    var self = this;
    self.code = null;
    self.updateInviteCode = function (code) {
      if(code) {
        this.code = code;
      }
    };
  })
  .run(function(Session, $rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if(toState.name !== 'login') {
        // check invite code
        if(!Session.code) {
          event.preventDefault();
          //event.stopPropagation();
          $state.go('login');
        }
      }
    });
  });
