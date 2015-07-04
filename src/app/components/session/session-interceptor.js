'use strict';

angular.module('httpMailWebClient')
  .factory('SessionInterceptor', function() {
    return {
      // get token from localStorage and append query params into request config
      request: function (request) {
        var token = localStorage.getItem('token');
        if(token) {
          var params = request.config.params || {};
          params.token = token;
          request.config.params = params;
        }
        return request;
      }
    }
  });
