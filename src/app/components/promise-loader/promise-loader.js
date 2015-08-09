/**
 * An directive to create an loader base on promise
 */
'use strict';

angular.module('httpMailWebClient')
  .directive('promiseLoader', function($q) {
    return {
      restrict: 'E',
      compile: function promiseLoaderCompile (tElement) {

        var template = '<div class="promise-loader">' +
                          '<div class="content-wrapper"></div>' +
                          '<div class="loader-backdrop">' +
                            '<div class="loader sk-spinner sk-spinner-three-bounce">' +
                              '<div class="sk-bounce1"></div>' +
                              '<div class="sk-bounce2"></div>' +
                              '<div class="sk-bounce3"></div>' +
                            '</div>' +
                          '</div>' +
                          '<div class="error-wrapper">' +
                            '<div class="error-toast">' +
                              '<span class="error-text"></span>' +
                            '</div>' +
                          '</div>' +
                        '</div>';
        if(template) {
          var content = tElement.children().detach();
          var templateObj = $(template);
          tElement.append(templateObj);
          templateObj.children('.content-wrapper').append(content);

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
