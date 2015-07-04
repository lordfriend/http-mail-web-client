'use strict';

angular.module('httpMailWebClient', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'ngPasswordComplexify',
  'validation.match'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('home', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          token: function(TokenValidator) {
            return TokenValidator();
          }
        }
      })
      .state('home.domain', {
        url: '/domain',
        template: '<ui-view />',
        abstract: true
      })
      .state('home.domain.user', {
        url: '',
        templateUrl: 'app/domain/domain-list.html',
        controller: 'DomainListCtrl',
        resolve: {
          token: function(TokenValidator) {
            return TokenValidator();
          }
        },
        ncyBreadcrumb: {
          label: 'Domains',
          parent: 'home'
        }
      })
      .state('home.domain.edit', {
        url: '/:id',
        templateUrl: 'app/domain/domain-edit.html',
        controller: 'DomainEditCtrl',
        resolve: {
          token: function(TokenValidator) {
            return TokenValidator();
          }
        },
        ncyBreadcrumb: {
          label: 'Domain: {{domainId}}',
          parent: 'home.domain.list'
        }
      });

    //$urlRouterProvider.when('/', '/domain');
    $urlRouterProvider.otherwise('/domain');

    $httpProvider.interceptors.push('SessionInterceptor');
    $httpProvider.interceptors.push('SessionErrorHandler');
  })
;
