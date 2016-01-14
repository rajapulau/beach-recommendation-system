'use strict';
var app      = require('angular').module('aadc');
var ngDatetimeDirective = require('./datetimepicker.directive.js');

app.directive('datetimePicker', ngDatetimeDirective);
