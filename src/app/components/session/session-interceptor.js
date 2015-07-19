'use strict';

angular.module('httpMailWebClient')
  .factory('SessionInterceptor', function() {

    var exclusion = [
      {
        url: '/api/login',
        method: 'POST'
      },
      {
        url: '/api/login',
        method: 'PUT'
      },
      {
        url: '/api/register',
        method: 'POST'
      },
      {
        url: '/api/invite',
        method: 'GET'
      }
    ];

    var urlPattern = /^(?:\/api)\/\S+/;
    return {
      // get token from localStorage and append query params into request config
      request: function (request) {
        var isExcluded = exclusion.some(function(entry){
          return entry.url === request.url && entry.method === request.method;
        });
        if(isExcluded || !urlPattern.test(request.url)) {
          return request;
        }
        var token = localStorage.getItem('token');
        if(token) {
          var params = request.params || {};
          params.token = token;
          request.params = params;
        }
        return request;
      }
    }
  });
