datetimePicker.$inject = [];
function datetimePicker(){
  return {
    restrict: "A",
    link:function(scope, el, atts){
      var _this = this;
      var startDate = atts.datetimeStart;
      var endDate = atts.datetimeEnd;
      var element = $('#'+atts.id);
      var format = atts.datetimeFormat;
      var time = [];
      element.datetimepicker({
        lang:'en',
        inline:false,
        onShow:function( ct ){
          var end = $("input[datetime-end='true']");
          var ad = new Date(ct);
          var startDateVal = moment().format('YYYY/MM/DD');
          var newDate = moment(end.val(),'DD-MM-YYYY').format('YYYY/MM/DD');
          this.setOptions({
            // minDate : end.val() ? startDateVal : false,
            minDate : _.isEmpty(end.val()) ? startDateVal : end.val(),
            formatDate:'Y/m/d'
          })
        },
        onChangeDateTime:function(dp,$input){
          scope.$apply(function(){
            scope.model   = $input.val();
            scope.time    = []
            scope.ecall = false;
            var timeStart = parseInt(scope.model.split(' ')[1].split(':')[0]);
            scope.dateclick();
            time.length = 0;
          });
        },
        timepicker:false,
        format:atts.datetimeFormat,
      });

      $("input[datetime-end='true']").datetimepicker({
        lang:'en',
        inline:false,
        onShow:function( ct ){
          scope.time = [];
          scope.start = $("input[datetime-start='true']");
          var start = $("input[datetime-start='true']");
          var timeStart = _.isEmpty(start.val()) ? 0 : parseInt(start.val().split(' ')[1].split(':')[0]);
          scope.time.length = 0;
          for(var i=timeStart; i < 25; i++){
              var data = i+':00';
              scope.time.push(data);
          }
          this.setOptions({
            allowTimes:scope.time,
            minDate : start.val(),
            formatDate:format
          })
        },
        onChangeDateTime:function(dp,$input){
          scope.$apply(function(){
            scope.model = $input.val();
            var startDate = scope.start.val();
            var ddd = moment(startDate,'DD-MM-YYYY HH:mm')
            var xxx = moment(scope.model,'DD-MM-YYYY HH:mm');
            var endTime = [];
            endTime.length = 0;
            for(var i=0; i < 25; i++){
              var data = i+':00';
              endTime.push(data);
            }

            if(ddd.isBefore(xxx)){
              $("input[datetime-end='true']").datetimepicker({
                allowTimes : endTime
              });
            }else{
              $("input[datetime-end='true']").datetimepicker({
                allowTimes : scope.time
              });
            }
          });
        },
        format:atts.datetimeFormat,
      });
    },
    scope:{
      "model": '=',
      "dateclick" : "&ngClick"
    },
  }
};
module.exports = datetimePicker;
