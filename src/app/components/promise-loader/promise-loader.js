/**
 * An directive to create an loader base on promise
 */
'use strict';

angular.module('httpMailWebClient')
  .run(function($http, $templateCache) {
    $http.get('app/components/promise-loader/promise-loader.html')
      .then(function(result) {
        $templateCache.put('app/components/promise-loader/promise-loader.html', result.data);
      }, angular.noop);
  })
  .directive('promiseLoader', function($q, $templateCache) {
    return {
      restrict: 'E',
      compile: function promiseLoaderCompile (tElement) {

        var template = $templateCache.get('app/components/promise-loader/promise-loader.html');
        if(template) {
          var content = tElement.children().detach();
          var templateObj = $(template);
          tElement.append(templateObj);
          templateObj.children('.content-wrapper').append(content);
          return function promiseLoaderLink ($scope, $element, $attrs) {
            var loaderBackdrop = $element.find('.loader-backdrop');
            var minHeight = $attrs.minHeight || '300px';
            loaderBackdrop.css({'min-height': minHeight});

            if($attrs.backdrop === 'true') {
              loaderBackdrop.addClass('show-backdrop');
            }

            $scope.$watch($attrs.promise, function(newValue) {
              if(newValue) {
                loaderBackdrop.show();
                newValue
                  .then(function(result) {
                    loaderBackdrop.hide();
                    return result;
                  }, function(reason){
                    loaderBackdrop.hide();
                    return $q.reject(reason);
                  });
              }
            });
          }
        } else {
          return angular.noop;
        }
      }
    }
  });
