'use strict';

angular.module('httpMailWebClient')
  .controller('MainCtrl', function ($scope, Session, APIService, $state) {

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

    getDomainList();
  });
