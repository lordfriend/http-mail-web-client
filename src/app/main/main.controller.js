'use strict';

angular.module('httpMailWebClient')
  .controller('MainCtrl', function ($scope, Session, APIService, $state) {
    var inviteCode = Session.code;
    //if(inviteCode && $state.is('home')) {
    //  $state.go('home.domain.list');
    //}
  });
