'use strict';

DetailController.$inject = ['$rootScope', '$state', '$scope','FileUploader','leafletData','Lightbox'];
function DetailController($rootScope, $state, $scope, FileUploader, leafletData, Lightbox){
  var vm      = this;
  vm.hide     = true;
  vm.detail   = detail;

  $http.get('/dist/json/list.json')
    .success(function(res){
      vm.listpantai = res;
  });

  $http.get('/dist/json/hasil2.json')
  .success(function(res){
      vm.rekomendasi = res;
  })
  .error(function(err){
    console.info('error', err);
  });

  $scope.images = [
  {
    'url': 'https://farm6.staticflickr.com/5830/20552523531_e1efec8d49_k.jpg',
    'thumbUrl': 'https://farm6.staticflickr.com/5830/20552523531_ef720cd2f1_s.jpg',
    'caption': 'This image has dimensions 2048x1519 and the img element is scaled to fit inside the window.'
  },
  {
    'url': 'https://farm8.staticflickr.com/7300/12807911134_ff56d1fb3b_b.jpg',
    'thumbUrl': 'https://farm8.staticflickr.com/7300/12807911134_ff56d1fb3b_s.jpg'
  },
  {
    'url': 'https://farm1.staticflickr.com/400/20228789791_52fb84917f_b.jpg',
    'thumbUrl': 'https://farm1.staticflickr.com/400/20228789791_52fb84917f_s.jpg',
    'caption': 'The left and right arrow keys are binded for navigation. The escape key for closing the modal is binded by AngularUI Bootstrap.'
  },
  {
    'url': 'https://farm1.staticflickr.com/260/20185156095_912c2714ef_b.jpg',
    'thumbUrl': 'https://farm1.staticflickr.com/260/20185156095_912c2714ef_s.jpg'
  },
  {
    'url': 'https://farm6.staticflickr.com/5757/20359334789_57316968ed_m.jpg',
    'thumbUrl': 'https://farm6.staticflickr.com/5757/20359334789_57316968ed_s.jpg',
    'caption': 'Default minimum modal dimensions (400x200) apply for this image (240x95).'
  },
  {
    'url': 'https://farm1.staticflickr.com/359/18741723375_28c89372d7_c.jpg',
    'thumbUrl': 'https://farm1.staticflickr.com/359/18741723375_28c89372d7_s.jpg'
  },
  {
    'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
    'thumbUrl': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc_s.jpg'
  }];

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };

  var mainMarker = {
    lat: -8.015688,
    lng: 110.29992700000003,
    focus: true,
    message: "Pantai Depok",
    draggable: true
  };

  angular.extend($scope, {
    center: {
      lat: -8.015688,
      lng: 110.29992700000003,
      zoom: 14,
    },
    markers: {
      mainMarker: angular.copy(mainMarker)
    },
    tiles: {
      name: 'Mapbox Park',
      url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
      type: 'xyz',
      options: {
        apikey: 'pk.eyJ1IjoicmFqYXB1bGF1IiwiYSI6IkFtdzYtanMifQ.kjDE091qu3CQPFnPkUxDGA',
        mapid: 'rajapulau.jfj9m19c'
      }
    }
  })

  function detail(){
    console.info('go to details');
  }

  (function(){
  })();

}

module.exports = DetailController;

