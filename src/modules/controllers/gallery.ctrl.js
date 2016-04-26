'use strict';

GalleryController.$inject = ['$rootScope', '$state', '$scope','FileUploader'];
function GalleryController($rootScope, $state, $scope, FileUploader){
  var vm      = this;
  vm.hide     = true;
  $rootScope.loading = true;

  (function(){
    $rootScope.loading = false;
  })();

}

module.exports = GalleryController;

