'use strict';

angular.module('httpMailWebClient')
  .controller('DomainListCtrl', function($scope, Session, APIService, $modal) {
    var inviteCode = Session.code;

    var getDomainList = function() {
      $scope.domainsPromise = APIService.domains({
        code: inviteCode
      }).$promise
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
