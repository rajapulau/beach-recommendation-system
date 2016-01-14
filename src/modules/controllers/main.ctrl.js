'use strict';

MainController.$inject = ['$rootScope', '$state', '$scope','FileUploader'];
function MainController($rootScope, $state, $scope, FileUploader){
  var vm      = this;
  vm.hide     = true;
  vm.openMenu = openMenu;

  function openMenu(menu){
    if(menu != vm.listMenu){
      vm.hide = false;
    }else{
      vm.hide = !vm.hide;
    }

    if(menu == 'poster'){
      vm.menu = ['menu 1','menu 2']
    }

    if(menu == 'foto'){
      vm.menu = ['foto 1','foto 2']
    }

    if(menu == 'quote'){
      vm.menu = ['quote 1','quote 2']
    }
    vm.listMenu = menu;
  }

  (function(){
  })();

}

module.exports = MainController;

