/**
 * Users Panel Controller
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('UsersCtrl', function($scope, APIService, $modal) {
    var refreshUserList = function () {

      return APIService.users({
        id: $scope.domain.id
      }).$promise
        .then(function(data) {
          $scope.users = data.result;
          return $scope.users;
        });
    };

    $scope.listPromise = refreshUserList();

    $scope.userQuery = {
      email: ''
    };

    $scope.deleteUser = function(user) {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/delete-confirm-dialog/delete-confirm-dialog.html',
        controller: 'DeleteConfirmDialogCtrl',
        animation: true,
        resolve: {
          content: function() {
            return 'This action <strong>CANNOT</strong> be undone. This will permanently delete the user <strong>' +
              user.email + '</strong> and all emails associated with the user.';
          },
          confirmText: function() {
            return {
              name: 'user',
              text: user.email
            };
          },
          title: function() {
            return 'Are you ABSOLUTELY sure?';
          }
        }
      });

      $scope.listPromise = modalInstance.result
        .then(function() {
          // delete user
          return APIService.deleteUser({
            id: $scope.domain.id,
            uid: user.id
          }).$promise;
        })
        .then(function() {
          return refreshUserList();
        });
    };

    $scope.addUser = function () {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/add-user-dialog/add-user-dialog.html',
        controller: 'AddUserDialogCtrl',
        controllerAs: 'vm',
        animation: true,
        backdrop: 'static',
        resolve: {
          domain: function() {
            return $scope.domain;
          }
        }
      });

      $scope.listPromise = modalInstance.result.then(function() {
        return refreshUserList();
      });
    };

    $scope.editUser = function(user) {
      var modalInstance = $modal.open({
        templateUrl: 'app/components/edit-user-dialog/edit-user-dialog.html',
        controller: 'EditUserDialogCtrl',
        animation: true,
        resolve: {
          user: function() {
            return user;
          },
          domain: function() {
            return $scope.domain;
          }
        }
      });
      $scope.listPromise = modalInstance.result.then(function() {
        return refreshUserList();
      });
    };
  });
