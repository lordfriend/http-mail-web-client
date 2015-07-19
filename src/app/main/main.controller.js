'use strict';

angular.module('httpMailWebClient')
  .controller('MainCtrl', function ($scope, APIService, $state) {
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
        animation: true
      });

      modalInstance.result.then(function() {
        getDomainList();
      }, angular.noop);
    };

    $scope.username = localStorage.getItem('username');

    $scope.logout = function () {
      APIService.logout({}).$promise
        .then(function(){
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('level');
          $state.go('login');
        }, function(reason) {
          return $q.reject(reason);
        });

    };

    getDomainList();
  });
