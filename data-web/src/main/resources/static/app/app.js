'use strict';

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
    var items = ["Ticket", "Project", "Requirement"];
    var projects = [];
    var issues = [];

    //variable to be returned
    var factory = {};

    factory.getDataItems = function() {
        return items;
    };

    factory.getProjects = function() {
        return projects;
    };

    factory.getProjectsStartingWith = function(string) {
        return RestService.getProjectsStartingWith(string);
    };

    factory.getIssues = function(projectKey) {
        return RestService.getIssues(projectKey);
    };

    factory.getIssuesStartingWith = function(string) {
        console.log(string)
        return RestService.getIssuesStartingWith(string);
    };

    factory.getProject = function(key){
        return RestService.getProject(key);
    };

    factory.getIssue = function(key){
        return RestService.getIssue(key);
    };

    factory.reset = function() {
        projects = [];
        issues = [];
    };

    return factory;
});

app.factory('BrowserCache', function() {
    var graph,
        selectedItem,
        searchText;

    return {
        graph: graph,
        selectedItem: selectedItem,
        searchText: searchText
    }
})

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

    $scope.search = function() {
        if($scope.selectedItem === $scope.items[0]) {
            AppFactory.getIssue($scope.searchText).then(function(data) {
                var issue = data;
                var project = data.project;
                var d3graph = D3Utility.createD3ForGroupPair({data: [project], group:"project"}, {data: [issue], group:"issue"});
                ForceGraph.renderForceGraph(d3graph, $scope.d3Width, $scope.d3Height, $scope);
            });
        } else if($scope.selectedItem === $scope.items[1]) {
            AppFactory.getProject($scope.searchText).then(function(data) {
                var project = data;

                AppFactory.getIssues($scope.searchText).then(function(data1) {
                    var issues = data1;
                    var d3graph = D3Utility.createD3ForGroupPair({data: [project], group:"project"}, {data: issues, group:"issue"});
                    ForceGraph.renderForceGraph(d3graph, $scope.d3Width, $scope.d3Height, $scope);
                });
            });
        }
    }

    $scope.loadedData = true;

    var getStartingWith = function(factoryFunc, searchString) {
        return factoryFunc(searchString).then(function(results) {
            var hits = [];

            if(results.length > 10) {
                hits = results.splice(0, 10);
            } else {
                hits = results;
                console.log(hits);
            }

            if(hits.length === 0) {
                hits = [{key: "No results found"}];
            }

            $scope.loadedData = true;

            return hits;
        });
    };

    $scope.searchForField = function(searchString) {
        $scope.loadedData = false;

        if($scope.selectedItem === $scope.items[0]) {
            return getStartingWith(AppFactory.getIssuesStartingWith, searchString);
        } else if($scope.selectedItem === $scope.items[1]) {
            return getStartingWith(AppFactory.getProjectsStartingWith, searchString);
        }
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