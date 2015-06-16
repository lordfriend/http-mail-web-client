'use strict';

angular.module('httpMailWebClient')
  .controller('DomainEditCtrl', function($scope, Session, APIService, currentDomain, $modal, $state) {
    var inviteCode = Session.code;

    $scope.currentDomain = currentDomain.result[0];

    $scope.userQuery = {
      email: ''
    };


    var refreshUserList = function () {

      APIService.users({
        code: inviteCode,
        id: $scope.currentDomain.id
      }).$promise
        .then(function(data) {
          $scope.users = data.result;
        });

    };


    $scope.deleteDomain = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/delete-confirm-dialog/delete-confirm-dialog.html',
        controller: 'DeleteConfirmDialogCtrl',
        animation: true,
        resolve: {
          content: function() {
            return 'This action <strong>CANNOT</strong> be undone. This will permanently delete the domain <strong>' +
                    $scope.currentDomain.name + '</strong> and all users, emails under the domain.';
          },
          confirmText: function() {
            return {
              name: 'domain',
              text: $scope.currentDomain.name
            };
          }
        }
      });

      modalInstance.result.then(function() {
        // delete domain
        APIService.deleteDomain({
          id: $scope.currentDomain.id,
          code: inviteCode
        }).$promise
          .then(function() {
            $state.go('home.domain.list');
          });
      }, angular.noop);
    };

    $scope.deleteUser = function(user) {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/delete-confirm-dialog/delete-confirm-dialog.html',
        controller: 'DeleteConfirmDialogCtrl',
        animation: true,
        resolve: {
          content: function() {
            return 'This action <strong>CANNOT</strong> be undone. This will permanently delete the user <strong>' +
              user.email + '</strong> and all emails under associated with the user.';
          },
          confirmText: function() {
            return {
              name: 'user',
              text: user.email
            };
          }
        }
      });

      modalInstance.result.then(function() {
        // delete user
        refreshUserList();
      }, angular.noop);
    };

    $scope.addUser = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/add-user-dialog/add-user-dialog.html',
        controller: 'AddUserDialogCtrl',
        animation: true,
        resolve: {
          domain: function() {
            return $scope.currentDomain;
          }
        }
      });

      modalInstance.result.then(function() {
        refreshUserList();
      }, angular.noop);
    };

    refreshUserList();
  });
