'use strict';

RecommendationController.$inject = ['$rootScope','$http', '$state', '$scope','FileUploader'];
function RecommendationController($rootScope, $http, $state, $scope, FileUploader){
  var vm      = this;
  vm.hide     = true;
  vm.goDetail = goDetail;

  function goDetail(){
    $state.go('main.home.detail');
  }

  function convertDMSToDD(co) {
    var direction = co.match(/([A-Z])/g)[0];
    var degrees = Number(co.match(/[A-Z](.+)\°/)[1]);
    var minutes = Number(co.match(/\°(.)/)[1]);
    // var seconds = co.match(/([0-9][0-9][^\'])\d/g)[0];
    var seconds = Number(co.match(/'((?:\\.|[^"\\])*)"/)[1]);
    // console.info(direction, degrees, minutes, seconds);
          var dd = degrees + minutes/60 + seconds/(60*60);
          if (direction == "S" || direction == "W") {
            dd = dd * -1;
          } // Don't do anything for N or E
          return dd;
  }

  $http.get('/dist/json/list.json')
    .success(function(res){
      vm.listpantai = res;
        _.forEach(res, function(r){
          if(r.koordinat){
              var co = r.koordinat.split(" ");
              var lat = convertDMSToDD(co[0]);
              var lng = convertDMSToDD(co[1]);
              r.lat = lat;
              r.lng = lng;
          }
        })
      console.info('response pantai', res);
    });

  (function(){
  })();

}

module.exports = RecommendationController;

