'use strict';

angular.module('httpMailWebClient')
  .controller('MainCtrl', function ($scope, APIService, $state, $modal, SessionManager) {
    $scope.currentYear = new Date().getFullYear();
    if($scope.currentYear !== 2015) {
      $scope.currentYear = '2015 - ' + $scope.currentYear;
    }

    var getDomainList = function() {
      return APIService.domains({}).$promise
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

    $scope.deleteDomain = function (domain) {
      $scope.domainsPromise = $modal.open({
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
          return APIService.deleteDomain({
            id: domain.id
          });
        }, angular.noop)
        .then(function () {
          $state.go('home.overview');
        })
        .then(function () {
          return getDomainList();
        });
    };

    $scope.setActionBarTitle = function(title) {
      $scope.actionBarTitle = title;
    };

    $scope.setActionMenu = function (menu) {
      $scope.actionMenu = menu;
    };

    $scope.domainsPromise = getDomainList();
  });
