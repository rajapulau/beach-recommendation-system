'use strict';

DetailController.$inject = ['$rootScope', '$state', '$scope','FileUploader'];
function DetailController($rootScope, $state, $scope, FileUploader){
  var vm      = this;
  vm.hide     = true;
  vm.detail   = detail;

  function detail(){
    console.info('go to details');
  }

  (function(){
  })();

}

module.exports = DetailController;

