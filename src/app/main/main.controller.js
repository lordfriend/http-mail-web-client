'use strict';

angular.module('httpMailWebClient')
  .controller('MainCtrl', function ($scope, APIService, $state, $modal, SessionManager, DomainService, PromiseErrorHandler) {
    $scope.currentYear = new Date().getFullYear();
    if($scope.currentYear !== 2015) {
      $scope.currentYear = '2015 - ' + $scope.currentYear;
    }

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
        $scope.domainsPromise = DomainService.getDomainList(true)
          .then(function(domains) {
            $scope.domains = domains;
          })
          .catch(PromiseErrorHandler.network);
      }, angular.noop);
    };

    $scope.username = localStorage.getItem('username');

    $scope.logout = SessionManager.logout;

    $scope.deleteDomain = function (domain) {
      $modal.open({
        templateUrl: 'app/components/delete-confirm-dialog/delete-confirm-dialog.html',
        controller: 'DeleteConfirmDialogCtrl',
        animation: true,
        resolve: {
          title: function () {
            return 'Are you ABSOLUTELY Sure?'
          },
          content: function() {
            return 'This action <strong>CANNOT</strong> be undone. This will permanently delete the domain <strong>' +
              domain.name + '</strong> and all users, emails under the domain.';
          },
          confirmText: function() {
            return {
              name: 'domain',
              text: domain.name
            };
          }
        }
      }).result
        .then(function () {
          $scope.domainsPromise = APIService.deleteDomain({
            id: domain.id
          }).$promise
            .then(function () {
              $state.go('home.overview');
              return DomainService.getDomainList(true);
            })
            .then(function (domains) {
              $scope.domains = domains;
            }, PromiseErrorHandler.network);
        });
    };

    $scope.setActionBarTitle = function(title) {
      $scope.actionBarTitle = title;
    };

    $scope.setActionMenu = function (menu) {
      $scope.actionMenu = menu;
    };

    $scope.domainsPromise = DomainService.getDomainList(false)
      .then(function(domains) {
        $scope.domains = domains;
      })
      .catch(PromiseErrorHandler.network);
  });
