'use strict';

HomeController.$inject = ['$rootScope', '$http','$state', '$scope','FileUploader', 'Data'];
function HomeController($rootScope, $http, $state, $scope, FileUploader, Data){
  var vm      = this;
  vm.hide     = true;
  vm.goDetail   = goDetail;
  $rootScope.loading = true;

  function convertDMSToDD(co) {
    var direction = co.match(/([A-Z])/g)[0];
    var degrees = parseFloat(co.match(/[A-Z](.+)\°/)[1]);
    var minutes = parseFloat(co.match(/\°[0-9]*/)[0].slice(1));
    var seconds = parseFloat(co.match(/'((?:\\.|[^"\\])*)"/)[1]);
    console.info(direction, degrees, minutes, seconds);
          var dd = degrees + minutes/60 + seconds/(60*60);
          if (direction == "S" || direction == "W") {
            dd = dd * -1;
          } // Don't do anything for N or E
          return dd;
  }

  Data.loadData()
  .then(function(res){
    vm.listpantai = res;
    $rootScope.loading = false;
    _.forEach(res, function(r){
        if(r.coordinat){
            var co = r.coordinat.split(" ");
            var lat = convertDMSToDD(co[0]);
            var lng = convertDMSToDD(co[1]);
            r.lat = lat;
            r.lng = lng;
            var url = 'http://api.wunderground.com/api/d6a1255f06e279bf/conditions/forecast/alert/q/'+lat+','+lng+'.json';
            // $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid=2de143494c0b295cca9337e1e96b00e0')
            $http.get(url)
              .success(function(res){
                r.weather = res.current_observation.weather;
                r.icon_weather = res.current_observation.icon_url;
            })
        }
      })
  })

  function goDetail(id){
    $state.go('main.home.detail',{idPantai:id});
  }

  (function(){
  })();

}

module.exports = HomeController;

