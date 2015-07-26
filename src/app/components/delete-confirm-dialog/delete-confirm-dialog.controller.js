/**
 * Created by bob on 6/9/15.
 */
'use strict';

angular.module('httpMailWebClient')
  .controller('DeleteConfirmDialogCtrl', function($scope, content, confirmText, title) {
    $scope.content = content;
    $scope.title = title;
    /**
     * Confirm text is object used for check user input to confirm operation
     * @type {name,text}
     */
    $scope.confirmText = confirmText;
  });
