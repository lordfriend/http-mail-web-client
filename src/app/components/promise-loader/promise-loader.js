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
          templateObj.children('.content-wrapper').append(content)

          return function promiseLoaderLink ($scope, $element, $attrs) {
            var loaderBackdrop = $element.find('.loader-backdrop');
            var errorWrapper = $element.find('.error-wrapper');
            var errorToast = errorWrapper.find('.error-toast');
            var errorText = errorWrapper.find('.error-text');
            var minHeight = $attrs.minHeight || '300px';

            var showErrorToast = !!$attrs.showErrorToast;

            loaderBackdrop.css({'min-height': minHeight});

            if($attrs.backdrop === 'true') {
              loaderBackdrop.addClass('show-backdrop');
            }
            if(showErrorToast) {
              errorToast.on('click', function (event) {
                errorWrapper.hide();
              });
            }

            $scope.$watch($attrs.promise, function(newPromise) {
              if(newPromise && newPromise.then) {
                if(showErrorToast) {
                  errorWrapper.hide();
                  errorText.empty();
                }
                loaderBackdrop.show();
                newPromise
                  .then(function(result) {
                    loaderBackdrop.hide();
                    return result;
                  }, function(reason){
                    loaderBackdrop.hide();
                    console.log(reason);
                    if(reason && showErrorToast) {
                      if(reason.data && reason.data.title) {
                        errorText.text(reason.data.title);
                      } else if(reason.status !== 0) {
                        errorText.text(reason.statusText);
                      } else {
                        errorText.text('Connection Error!');
                      }

                      errorWrapper.show();
                    }

                    return $q.reject(reason);
                  });
              }
            });

            $scope.$on('destroy', function () {
              if(showErrorToast) {
                errorToast.off('click');
              }
            });
          }
        } else {
          return angular.noop;
        }
      }
    }
  });
