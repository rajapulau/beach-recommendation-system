'use strict';

QuestionerController.$inject = ['$rootScope', '$state', '$scope','$http'];
function QuestionerController($rootScope, $state, $scope, $http){
  var vm      = this;
  vm.hide     = true;
  vm.listResults = listResults;

  function listResults(){
    // $http.get('http://localhost:3000/api/v1/list_data')
    // .success(function(res){
    //   console.info('response ',res);
    //   vm.results = res;
    //   var kategori = [];
    //   for(var i=0, j=0;i<res.length;i++,j=10){
    //     for(var j=0; j<20; j++){
    //       for(var k=0; k<10; k++){
    //       var name = res[i].answer[j].kategori[k].name;
    //       var value = res[i].answer[j].kategori[k].value;
    //       kategori.push({name:name, value:value});
    //       }
    //     }
    //   }
    //
    //   var kategoriGroup = _.groupBy(kategori,'name');
    //   // vm.kategori = _.sortBy(_.keysIn(kategoriGroup));
    //   vm.kategori = _.keysIn(kategoriGroup);
    //
    //   for(var i=0, j=0;i<res.length;i++,j=10){
    //     for(var j=0; j<20; j++){
    //       for(var k=0; k<10; k++){
    //         for(var h=0; h < vm.kategori.length; h++){
    //           // console.info('nilai h', h);
    //           var name = res[i].answer[j].kategori[k].name;
    //           var value = res[i].answer[j].kategori[k].value;
    //           if(name == vm.kategori[h] && value > 0){
    //             console.info('nilai k', k);
    //             res[i].answer[j].kategori[k].choosed = true;
    //             if(k < 9){
    //               if(name == ''){
    //                 res[i].answer[j].kategori.splice(k, 1);
    //               }
    //               var namex = res[i].answer[j].kategori[k+1].name;
    //               var valuex = res[i].answer[j].kategori[k+1].value;
    //             }else{
    //               res[i-1].answer[j].kategori.push({name: vm.kategori[h]});
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   console.info('list of results', vm.results);
    // })
    // .error(function(err,status) {
    //   console.info('error');
    // });
  }

  (function(){
    listResults();
  })();

}

module.exports = QuestionerController;

