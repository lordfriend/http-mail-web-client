/**
 * A factory create an promise which will stay resolved whenever token is be validated.
 */
'use strict';

angular.module('httpWebMailClient')
  .factory('TokenValidator', function(APIService, $q) {
    return function () {
      var token = localStorage.getItem('token');
      if(token) {
        return APIService.validateToken({token: token}).$promise
          .then(function() {
            return token;
          }, function() {
            return $q.reject('tokenInvalid');
          });
      } else {
        return $q.reject('noTokenExist');
      }

    }
  });
