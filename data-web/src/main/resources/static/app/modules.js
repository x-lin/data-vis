var app = angular.module('datavisApp',
    ['ngRoute', 'd3Service', 'rest', 'ngAnimate', 'ui.bootstrap']);

var d3Service = angular.module('d3Service', ['ui.bootstrap']);

var rest = angular.module('rest', ['ngResource']);