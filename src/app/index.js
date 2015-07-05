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
  'ngMockE2E',
  'validation.match'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegisterCtrl'
      })
      .state('home', {
        url: '/',
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
        template: 'app/domain/domain.html',
        controller: 'DomainCtrl'
      });

    //$urlRouterProvider.when('/', '/domain');
    //$urlRouterProvider.otherwise('/domain');

    $httpProvider.interceptors.push('SessionInterceptor');
  })
;
