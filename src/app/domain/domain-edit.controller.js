'use strict';

angular.module('httpMailWebClient')
  .controller('DomainEditCtrl', function($scope, Session, APIService, $modal, $state, $q, $stateParams) {
    var inviteCode = Session.code;

    var refreshUserList = function () {

      return APIService.users({
        code: inviteCode,
        id: $scope.currentDomain.id
      }).$promise
        .then(function(data) {
          $scope.users = data.result;
          return $scope.users;
        });
    };

    $scope.listPromise = APIService.getDomain({code: inviteCode, id: $stateParams.id}).$promise
      .then(function(data) {
        $scope.currentDomain = data.result[0];
        return $scope.currentDomain;
      })
      .then(function() {
        return refreshUserList();
      }, function() {
        console.log('error')
      });

    $scope.userQuery = {
      email: ''
    };



    $scope.deleteDomain = function () {
      $modal.open({
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
          },
          domainId: function() {
            return $scope.currentDomain.id;
          }
        }
      });

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
          }
        }
      });

      $scope.listPromise = modalInstance.result.then(function() {
        // delete user
        return APIService.deleteUser({
          id: $scope.currentDomain.id,
          uid: user.id,
          code: inviteCode
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
        animation: true,
        resolve: {
          domain: function() {
            return $scope.currentDomain;
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
            return $scope.currentDomain;
          }
        }
      });
      $scope.listPromise = modalInstance.result.then(function() {
        return refreshUserList();
      });
    };

  });
