'use strict';

HowController.$inject = ['$rootScope', '$state', '$scope','FileUploader'];
function HowController($rootScope, $state, $scope, FileUploader){
  var vm      = this;
  vm.hide     = true;
  $rootScope.loading = true;

  (function(){
    $rootScope.loading = false;
  })();

}

module.exports = HowController;

