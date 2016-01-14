'use strict';

HomeController.$inject = ['$rootScope', '$state', '$scope','FileUploader'];
function HomeController($rootScope, $state, $scope, FileUploader){
  var vm      = this;
  vm.hide     = true;
  vm.detail   = detail;

  function detail(){
    console.info('go to details');
    $state.go('main.home.detail');
  }

  (function(){
  })();

}

module.exports = HomeController;

