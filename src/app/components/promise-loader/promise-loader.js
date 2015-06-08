/**
 * An directive to create an loader base on promise
 */
'use strict';

angular.module('httpMailWebClient')
  .directive('promiseLoader', function() {
    return {
      restrict: 'EAC',
      scope: {
        promise: '='
      },
      templateUrl: 'app/components/promise-loader/promise-loader.html',
      link: function($scope, $element, $attrs) {

      }
    }
  });
