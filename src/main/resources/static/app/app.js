'use strict';

var app = angular.module('datavisApp',
    ['ngRoute', 'd3Service', 'rest']);

/**
 defines routing patterns
 */
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'relationships.html',
            controller: 'RelationshipsCtrl'
        })
        .when('/relationships', {
            templateUrl: 'relationships.html',
            controller: 'RelationshipsCtrl'
        })
        .when('/timeline', { templateUrl: 'timeline.html' })
        .otherwise({ redirectTo: '/' });
});

app.factory('RelationshipsFactory', function () {
    var items = ["Ticket", "Project", "Requirement"];

    return {
        getDataItems: function() {
            return items;
        },
    }
});

app.controller('RelationshipsCtrl', function (
    $scope,
    $sce,
    $timeout,
    $window,
    RelationshipsFactory,
    ForceGraph,
    RestService
) {
    //for the search box
    $scope.items = RelationshipsFactory.getDataItems();
    $scope.selectedItem = $scope.items[0];

    $scope.dropdownActive = function (item) {
        $scope.selectedItem = item;
    }

    //for D3
    $scope.d3Width = document.getElementById("d3box").clientWidth;
    $scope.d3Height = document.getElementById("d3box").clientHeight;

    ForceGraph.renderForceGraph($scope.d3Width, $scope.d3Height);

    angular.element($window).bind('resize', function() {
        $scope.d3Width = document.getElementById("d3box").clientWidth;
        $scope.d3Height = document.getElementById("d3box").clientHeight;
        ForceGraph.updateSize($scope.d3Width, $scope.d3Height);
        $scope.$apply();
    });

    //for REST
    RestService.getTestData();

});