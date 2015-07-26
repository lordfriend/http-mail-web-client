'use strict';

angular.module('httpMailWebClient')
  .controller('MainCtrl', function ($scope, APIService, $state, $modal, SessionManager) {
    $scope.currentYear = new Date().getFullYear();
    if($scope.currentYear !== 2015) {
      $scope.currentYear = '2015 - ' + $scope.currentYear;
    }

    var getDomainList = function() {
      $scope.domainsPromise = APIService.domains({}).$promise
        .then(function(data) {
          return $scope.domains = data.result;
        });
    };


    $scope.domainQuery = {};

    $scope.addDomain = function() {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/add-domain-dialog/add-domain-dialog.html',
        controller: 'AddDomainDialogCtrl',
        controllerAs: 'vm',
        animation: true,
        backdrop: 'static'
      });

      modalInstance.result.then(function() {
        getDomainList();
      }, angular.noop);
    };

    $scope.username = localStorage.getItem('username');

    $scope.logout = SessionManager.logout;

    $scope.setActionBarTitle = function(title) {
      $scope.actionBarTitle = title;
    };

    getDomainList();
  });
