'use strict';

angular.module('httpMailWebClient', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'ncy-angular-breadcrumb',
  'ngPasswordComplexify',
  'validation.match'])
  .config(function ($stateProvider, $urlRouterProvider) {
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
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('home.domain', {
        url: '/domain',
        template: '<ui-view />',
        abstract: true
      })
      .state('home.domain.list', {
        url: '',
        templateUrl: 'app/domain/domain-list.html',
        controller: 'DomainListCtrl',
        ncyBreadcrumb: {
          label: 'Domains',
          parent: 'home'
        }
      })
      .state('home.domain.edit', {
        url: '/:id',
        templateUrl: 'app/domain/domain-edit.html',
        controller: 'DomainEditCtrl',
        ncyBreadcrumb: {
          label: 'Domain: {{domainId}}',
          parent: 'home.domain.list'
        }
      });

    //$urlRouterProvider.when('/', '/domain');
    $urlRouterProvider.otherwise('/domain');
  })
;
