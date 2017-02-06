'use strict';
/**
 * Created by bob on 7/26/15.
 */
angular.module('httpMailWebClient')
  .service('SessionManager', function(APIService, $state, $q) {

    this.logout = function () {
      return APIService.logout({}).$promise
        .then(function(){
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('level');
          $state.go('login');
        }, function(reason) {
          return $q.reject(reason);
        });
    };

  });
