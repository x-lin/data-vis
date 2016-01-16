'use strict';

var app = angular.module('datavisApp',
    ['ngRoute', 'd3Service', 'rest', 'ngAnimate', 'ui.bootstrap']);

/**
 defines routing patterns
 */
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            //templateUrl: 'relationships.html',
            //controller: 'RelationshipsCtrl',
            redirectTo: '/relationships'
        })
        .when('/relationships', {
            templateUrl: 'relationships.html',
            controller: 'RelationshipsCtrl'
        })
        .when('/timeline', { templateUrl: 'timeline.html' })
        .when('/editor', { templateUrl: 'graph-editor.html' })
        .when('/stats', { templateUrl: 'stats.html' })
        .otherwise({ redirectTo: '/' });
});

app.factory('AppFactory', function (
    RestService
) {
    //private variables
    var items = ["Ticket", "Project", "Requirement", "User"];
    var projects = [];
    var issues = [];

    //variable to be returned
    var factory = {};

    factory.getDataItems = function() {
        return items;
    };

    //search box has some issues handling a functions for autocomplete, thus either keep the keys as key and name
    //or, if you want an entity to have another attribute as key, add it in the html file
    factory.keyMap = {
        Project : "key",
        Issue : "key",
        User : "name",
        Requirement : "key"
    }

    factory.propertyMap = {
        Ticket : "Issue",
        Project : "Project",
        User : "User",
        Requirement : "Requirement"
    }

    factory.getNeighbors = function(type, key) {
        return RestService.getNeighbors(type, key);
    };

    factory.getEntity = function(type, key) {
        return RestService.getEntity(type, key);
    };

    factory.getEntityStartingWith = function(type, key) {
        return RestService.getEntityStartingWith(type, key);
    }

    factory.reset = function() {
        projects = [];
        issues = [];
    };

    return factory;
});

app.controller('RelationshipsCtrl', function (
    $scope,
    $sce,
    $window,
    $http,
    $compile,
    AppFactory,
    ForceGraph,
    D3Utility
) {
    //for the search box
    $scope.items = AppFactory.getDataItems();
    $scope.selectedItem = $scope.items[0];

    $scope.dropdownActive = function (item) {
        $scope.selectedItem = item;
    }

    $scope.searchText = "";

    $scope.getNeighbors = AppFactory.getNeighbors;

    $scope.keyField = function(data) {
        return data[AppFactory.keyMap[AppFactory.propertyMap[$scope.selectedItem]]];
    }

    $scope.search = function() {
        var dbProperty = AppFactory.propertyMap[$scope.selectedItem];

        AppFactory.getEntity(dbProperty, $scope.searchText).then(function(node) {
            var keyName = AppFactory.keyMap[dbProperty];
            var nodeWrapper = {};
            nodeWrapper[AppFactory.propertyMap[$scope.selectedItem]] = node;

            AppFactory.getNeighbors(dbProperty, node[keyName]).then(function(data) {
                var d3graph = D3Utility.createNeighborGraph(nodeWrapper, data);
                ForceGraph.renderForceGraph(d3graph, $scope.d3Width, $scope.d3Height, $scope);
            });
        });
    }

    $scope.loadedData = true;

    $scope.searchForField = function(searchString) {
        $scope.loadedData = false;

        return AppFactory.getEntityStartingWith(AppFactory.propertyMap[$scope.selectedItem], searchString).then(function(results) {
            var hits = results;

            if(hits.length === 0) {
                hits = [{key: "No results found"}];
            }

            $scope.loadedData = true;

            return hits;
        });
    };

    //for D3
    $scope.d3Width = document.getElementById("d3box").clientWidth;
    $scope.d3Height = document.getElementById("d3box").clientHeight;

    angular.element($window).bind('resize', function() {
        $scope.d3Width = document.getElementById("d3box").clientWidth;
        $scope.d3Height = document.getElementById("d3box").clientHeight;
        ForceGraph.updateSize($scope.d3Width, $scope.d3Height);
        $scope.$apply();
    });

    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'd3/popoverTemplate.html',
        title: 'Title'
    };
});