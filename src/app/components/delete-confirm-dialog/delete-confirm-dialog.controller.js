/**
 * Created by bob on 6/9/15.
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DeleteConfirmDialogCtrl', function($scope, content, confirmText) {

    $scope.content = content;

    /**
     * Confirm text is object used for check user input to confirm operation
     * @type {name,text}
     */
    $scope.confirmText = confirmText;
  });
