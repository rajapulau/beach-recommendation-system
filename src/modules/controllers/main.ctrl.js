'use strict';

MainController.$inject = ['$rootScope', '$state', '$scope','FileUploader','Data'];
function MainController($rootScope, $state, $scope, FileUploader, Data){
  var vm      = this;
  vm.hide     = true;
  vm.openMenu = openMenu;
  vm.goRecommendation = goRecommendation;

  console.info('show Data', Data);

  function goRecommendation(){
    if(vm.form.search){
        var search = _.map(vm.form.search,'text');
        var data = Data.list;

        

        var dataTF = data.reduce(function (results, item) {
            var beachName = item.name.replace(/ /g, '-').toLowerCase();
            var tags = _.reduce(item.tags, function (res, tag) {
                  
            var ret = res.concat(tag.name.split('-'));
                return ret;
            }, [])

            var searchText = _.reduce(search, function(result, value, key){
                var search = result.concat(value.split('-'));
                    return search;
            }, [])

            var searchLength = searchText.length;
            var searchCount  = _.countBy(searchText);
            var tagsLength = tags.length;
            var tagsCount  = _.countBy(tags);

            var arrTF = []

            var tagsCount3 = _.reduce(tagsCount, function (res, value, key) {

                var sResults = _.reduce(searchCount, function(sRes, sValue, sKey){
                    
                    if (sKey === key) {
                        res[key] = sValue*value;
                        arrTF.push({[key]:sValue*value})
                    }else{
                        if (res[key] > 0) {
                            res[key] = res[key]
                        }else{
                            res[key] = 0;
                        }
                    }
                    return res;

                },{});

                return sResults;
            }, {});

            results[beachName] = {
                tags: tagsCount3,
            };

            var df = _.reduce(tagsCount3, function (dfRes, dfValue, dfKey) {
                var sizeTags = _.size(_.filter(results[beachName].tags, function(o) { return o>0; }));
                if (dfValue > 0) {
                    dfRes[dfKey] = sizeTags;
                }else{
                    dfRes[dfKey] = 0
                }
                return dfRes;
            }, {});

            var idf = _.reduce(tagsCount3, function (dfRes, dfValue, dfKey) {
                var total = Data.list.length+1;
                var sizeTags = _.size(_.filter(results[beachName].tags, function(o) { return o>0; }));
                if (dfValue > 0) {
                    dfRes[dfKey] = parseFloat(Math.log10(total/sizeTags).toFixed(3));
                }else{
                    dfRes[dfKey] = 0
                }
                return dfRes;
            }, {});

            results[beachName] = {
                tags: tagsCount3,
                df: df,
                idf: idf
            };

            var wdt = _.reduce(tagsCount3, function (wRes, wValue, wKey) {
                // console.info('reduce wdt', results)
                wRes[wKey] = results[beachName].df[wKey]*results[beachName].idf[wKey]
                return wRes;
            }, {});

            results[beachName] = {
                tags: tagsCount3,
                df: df,
                idf: idf,
                wdt: wdt
            };

            return results;
        }, {});
      console.log(JSON.stringify(dataTF, null, 2));
      $state.go('main.home.recommendation');
    }
  }

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

  vm.characters= [
    { value: "1", label: "Pasir Halus" },
    { value: "2", label: "Pasir Hitam" },
    { value: "3", label: "Berenang" },
    { value: "4", label: "Karang" },
    { value: "5", label: "Pemandangan" },
    { value: "5", label: "Berenang" }
  ];

  (function(){
    Data.loadData();
    Data.loadTags();
  })();

}

module.exports = MainController;

