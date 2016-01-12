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

app.factory('RelationshipsFactory', function (
    RestService,
    $q
) {
    var items = ["Ticket", "Project", "Requirement"];

    var projects = [];
    var issues = [];

    RestService.getProjects().get(function(response) {
        projects = response;
    });

    return {
        getDataItems: function() {
            return items;
        },
        getProjects: function() {
            return projects;
        },
        getIssues: function(projectKey) {
            var deferred = $q.defer();

            RestService.getIssues().get({projectKey: projectKey}, function(response) {
                return deferred.resolve(response);
            });

            return deferred.promise;
        },
        getIssuesStartingWith: function(string) {
            var deferred = $q.defer();

            RestService.getIssuesStartingWith().get({string: string}, function(response) {
                return deferred.resolve(response);
            });

            return deferred.promise;
        },
        getProject: function(key){
            var deferred = $q.defer();

            RestService.getProject().get({key: key}, function(response) {
                return deferred.resolve(response);
            });

            return deferred.promise;
        },
        getIssue: function(key){
            var deferred = $q.defer();

            RestService.getIssue().get({key: key}, function(response) {
                return deferred.resolve(response);
            });

            return deferred.promise;
        },
        reset: function() {
            projects = [];
            issues = [];
        }
    }
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
    $timeout,
    $window,
    $http,
    $q,
    $compile,
    RelationshipsFactory,
    ForceGraph,
    D3Utility
) {
    //for the search box
    $scope.items = RelationshipsFactory.getDataItems();
    $scope.selectedItem = $scope.items[0];

    $scope.dropdownActive = function (item) {
        $scope.selectedItem = item;
    }

    $scope.searchText = "";


    $scope.search = function() {
        $timeout(function() {
            if($scope.selectedItem === $scope.items[0]) {
                RelationshipsFactory.getIssue($scope.searchText).then(function(data) {
                    var issue = data;
                    var project = data.project;
                    var d3graph = D3Utility.createD3ForGroupPair([project], [issue]);
                    ForceGraph.renderForceGraph(d3graph, $scope.d3Width, $scope.d3Height, $scope);
                });
            } else if($scope.selectedItem === $scope.items[1]) {
                console.log("here")
                RelationshipsFactory.getProject($scope.searchText).then(function(data) {
                    var project = data;
                    console.log("here")
                    RelationshipsFactory.getIssues($scope.searchText).then(function(data1) {
                        var issues = data1;
                        var d3graph = D3Utility.createD3ForGroupPair([project], issues);
                        console.log("here")
                        ForceGraph.renderForceGraph(d3graph, $scope.d3Width, $scope.d3Height, $scope);
                    });
                });
            }
        });
    }

    var input = document.getElementById("search");

    $scope.loadedData = true;
    $scope.searchData = function(searchString) {
        return $timeout(function () {
            $scope.loadedData = false;

            if($scope.selectedItem === $scope.items[0]) {
                return RelationshipsFactory.getIssue(searchString).then(function(issue) {
                    $scope.loadedData = true;
                    if(typeof issue.key === 'undefined' || issue.key === null) {
                        return RelationshipsFactory.getIssue(searchString.toUpperCase()).then(function(issue) {
                            if(typeof issue.key === 'undefined' || issue.key === null) {
                                return ["No results found"];
                            } else {
                                return [issue.key];
                            }
                        });
                    } else {
                        return [issue.key];
                    }
                });
            } else if($scope.selectedItem === $scope.items[1]) {
                var size = 0;
                var hits = [];
                var projects = RelationshipsFactory.getProjects();
                for (var i = 0; i < projects.length; i++) {
                    var project = projects[i];

                    if(project.key.length >= searchString.length) {
                        if(project.key.substring(0, searchString.toUpperCase().length).toUpperCase() === searchString.toUpperCase()) {
                            hits.push(project.key);

                            if(size > 20) {
                                hits = ["Too many results"];
                            } else {
                                size++;
                            }
                        }
                    }
                }

                if(hits.length === 0) {
                    hits.push("No results found");
                }

                $scope.loadedData = true;

                return hits;
            }
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
});