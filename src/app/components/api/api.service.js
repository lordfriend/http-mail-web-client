/**
 * manage all restful api
 */
'use strict';

angular.module('httpMailWebClient')
  .factory('APIService', function($resource){
    return $resource('/api/:resource/:id/:uid', {id: '@id', code: '@code', uid: '@uid'}, {

      // invite code
      testInviteCode: {method: 'GET', params:{resource: 'invite'}, isArray: false},

      // register
      register: {method: 'POST', params: {resource: 'register'}, isArray: false},

      // login
      validateToken: {method: 'GET', params: {resource: 'login'}, isArray: false},
      login: {method: 'POST', params: {resource: 'login'}, isArray: false},
      logout: {method: 'POST', params: {resource: 'login'}, isArray: false},
      updatePassword: {method: 'PUT', params: {resource: 'login'}, isArray: false},

      // domains
      domains: {method: 'GET', params: {resource: 'domain'}, isArray: false},
      createDomain: {method: 'POST', params: {resource: 'domain'}, isArray: false},
      getDomain: {method: 'GET', params: {resource: 'domain'}, isArray: false},
      deleteDomain: {method: 'DELETE', params: {resource: 'domain'}, isArray: false},

      // users
      users: {method: 'GET', params: {resource: 'user'}, isArray: false},
      addUser: {method: 'POST', params: {resource: 'user'}, isArray: false},
      getUser: {method: 'GET', params: {resource: 'user'}, isArray: false},
      updateUser: {method: 'PUT', params: {resource: 'user'}, isArray: false},
      deleteUser: {method: 'DELETE', params: {resource: 'user'}, isArray: false},

      // servers
      servers: {method: 'GET', params: {resource: 'server'}, isArray: false, cache: true},

      // DKIM settings
      getDKIM: {method: 'GET', params: {resource: 'dkim'}, isArray: false},
      updateDKIM: {method: 'PUT', params: {resource: 'dkim'}, isArray: false},

      // BCC Settings
      listBCC: {method: 'GET', params: {resource: 'bcc'}, isArray: false},
      addBCC: {method: 'POST', params: {resource: 'bcc'}, isArray: false},
      getBCC: {method: 'GET', params: {resource: 'bcc'}, isArray: false},
      deleteBCC: {method: 'DELETE', params: {resource: 'bcc'}, isArray: false},

      // Alias Settings
      listAlias: {method: 'GET', params: {resource: 'alias'}, isArray: false},
      addAlias: {method: 'POST', params: {resource: 'alias'}, isArray: false},
      getAlias: {method: 'GET', params: {resource: 'alias'}, isArray: false},
      deleteAlias: {method: 'DELETE', params: {resource: 'alias'}, isArray: false},

      // Transport Settings
      listTransport: {method: 'GET', params: {resource: 'transport'}, isArray: false},
      addTransport: {method: 'POST', params: {resource: 'transport'}, isArray: false},
      getTransport: {method: 'GET', params: {resource: 'transport'}, isArray: false},
      deleteTransport: {method: 'DELETE', params: {resource: 'transport'}, isArray: false}
    });
  });
