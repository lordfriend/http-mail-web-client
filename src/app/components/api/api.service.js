/**
 * manage all restful api
 */
'use strict';

angular.module('httpMailWebClient')
  .factory('APIService', function($resource){
    return $resource('/api/:resource/:id/:uid', {id: '@id', code: '@code', uid: '@uid'}, {
      validateToken: {method: 'GET', params: {resource: 'login'}, isArray: false},
      testInviteCode: {method: 'GET', params:{resource: 'invite'}, isArray: false},
      domains: {method: 'GET', params: {resource: 'domain'}, isArray: false},
      createDomain: {method: 'POST', params: {resource: 'domain'}, isArray: false},
      getDomain: {method: 'GET', params: {resource: 'domain'}, isArray: false},
      deleteDomain: {method: 'DELETE', params: {resource: 'domain'}, isArray: false},
      users: {method: 'GET', params: {resource: 'user'}, isArray: false},
      addUser: {method: 'POST', params: {resource: 'user'}, isArray: false},
      getUser: {method: 'GET', params: {resource: 'user'}, isArray: false},
      updateUser: {method: 'PUT', params: {resource: 'user'}, isArray: false},
      deleteUser: {method: 'DELETE', params: {resource: 'user'}, isArray: false}
    });
  });
