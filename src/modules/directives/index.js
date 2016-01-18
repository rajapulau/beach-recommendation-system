'use strict';
var app      = require('angular').module('aadc');
var ngDatetimeDirective = require('./datetimepicker.directive.js');
var ngReadmoreDirective = require('./readmore.js');

app.directive('datetimePicker', ngDatetimeDirective);
app.directive('hmReadMore', ngReadmoreDirective);
