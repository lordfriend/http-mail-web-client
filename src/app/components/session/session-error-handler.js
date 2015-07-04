/**
 * handle token error or authentication failed, usually promote user to login
 */
'use strict';

angular.module('httpMailWebClient')
  .factory('SessionErrorHandler', function($q, $modal, $http) {

    var rule = /^(?:\/api\/)\S+/;

    var exclusion = [{
      url: '/api/register',
      method: 'POST'
    }, {
      url: '/api/login',
      method: 'POST'
    }, {
      url: '/api/login',
      method: 'HEAD'
    },{
      url: '/api/invite',
      method: 'GET'
    }];

    var showLoginDialog = function () {
      return $modal
        .open({
          controller: 'LoginDialogCtrl',
          templateUrl: 'app/components/login-dialog/login-dialog.html',
          animation: true
        })
        .result
    };

    return {
      responseError: function(reason) {
        var config = reason.config;
        if(rule.test(config.url)) {
          var toExclude = exclusion.some(function(entry) {
            return entry.url === config.url && entry.method === config.method;
          });
          if(!toExclude) {
            return showLoginDialog()
              .then(function() {
                // resend request.
                config.params.token = localStorage.getItem('token');
                return $http(config);
              }, function() {
                return $q.reject(reason);
              })
          }
        }

        return $q.reject(reason);
      }
    };
  });
