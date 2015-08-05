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
  'validation.match',
  'nya.bootstrap.select'
])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
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
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          token: function(TokenValidator) {
            return TokenValidator();
          }
        }
      })
      .state('home.account', {
        url: '/account',
        templateUrl: 'app/account/account.html',
        controller: 'AccountCtrl'
      })
      .state('home.overview', {
        url: '/',
        templateUrl: 'app/overview/overview.html',
        controller: 'OverviewCtrl'
      })
      .state('home.domain', {
        url: '/domain/:id',
        templateUrl: 'app/domain/domain.html',
        controller: 'DomainCtrl',
        resolve: {
          domain: function(APIService, $stateParams) {
            return APIService.getDomain({id: $stateParams.id}).$promise
              .then(function(data) {
                return data.result;
              })
          }
        }
      });
    $locationProvider.html5Mode(true);
    //$urlRouterProvider.when('/', '/domain');
    //$urlRouterProvider.otherwise('/domain');

    $httpProvider.interceptors.push('SessionInterceptor');
  })
;
