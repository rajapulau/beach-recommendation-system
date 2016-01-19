'use strict';

HomeController.$inject = ['$rootScope', '$http','$state', '$scope','FileUploader'];
function HomeController($rootScope, $http, $state, $scope, FileUploader){
  var vm      = this;
  vm.hide     = true;
  vm.goDetail   = goDetail;

  // function convertDMSToDD(co) {
  //   var direction = co.match(/([A-Z])/g)[0];
  //   var degrees = Number(co.match(/[A-Z](.+)\°/)[1]);
  //   var minutes = Number(co.match(/\°(.)/)[1]);
  //   // var seconds = co.match(/([0-9][0-9][^\'])\d/g)[0];
  //   var seconds = Number(co.match(/'((?:\\.|[^"\\])*)"/)[1]);
  //   console.info(direction, degrees, minutes, seconds);
  //         var dd = degrees + minutes/60 + seconds/(60*60);
  //         if (direction == "S" || direction == "W") {
  //           dd = dd * -1;
  //         } // Don't do anything for N or E
  //         return dd;
  // }

  $http.get('/dist/json/list.json')
    .success(function(res){
      vm.listpantai = res;
        // _.forEach(res, function(r){
        //   if(r.koordinat){
        //       var co = r.koordinat.split(" ");
        //       var lat = convertDMSToDD(co[0]);
        //       var lng = convertDMSToDD(co[1]);
        //       r.lat = lat;
        //       r.lng = lng;
        //       // var url = 'http://api.wunderground.com/api/d6a1255f06e279bf/conditions/forecast/alert/q/-8.024916666666668,110.03255555555556.json';
        //       // $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid=2de143494c0b295cca9337e1e96b00e0')
        //       //   .success(function(res){
        //       //     r.weather = res.weather[0].main;
        //       //     r.icon_weather = 'http://openweathermap.org/img/w/'+res.weather[0].icon+'.png';
        //       // })
        //   }
        // })
    })

  function goDetail(){
    console.info('go to details');
    $state.go('main.home.detail');
  }

  (function(){
  })();

}

module.exports = HomeController;

