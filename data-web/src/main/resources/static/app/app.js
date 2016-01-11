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
        .otherwise({ redirectTo: '/' });
});

app.factory('RelationshipsFactory', function (
    RestService,
    $q
) {
    var items = ["Ticket", "Project", "Requirement"];
    var tickets = ["TIC1", "TEST2", "ABC", "DFD", "FGGF8", "ASDG4"];

    var projects = [];
    var issues = [];

    RestService.getProjects().get(function(response) {
        projects = response;
    });

    return {
        getDataItems: function() {
            return items;
        },
        getTickets: function() {
            return tickets;
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
        getProject: function(key){
            var deferred = $q.defer();

            RestService.getProject().get({key: key}, function(response) {
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
            if($scope.selectedItem === $scope.items[1]) {
                RelationshipsFactory.getProject($scope.searchText).then(function(data) {
                    var project = data;
                    RelationshipsFactory.getIssues($scope.searchText).then(function(data1) {
                        var issues = data1;
                        var d3graph = D3Utility.createD3ForGroupPair([project], issues);
                        ForceGraph.renderForceGraph(d3graph, $scope.d3Width, $scope.d3Height, $scope);
                        $compile(document.getElementById("d3box"))($scope);
                    });
                });
            }
        });
    }

    var input = document.getElementById("search");

    $scope.searchData = function(searchString) {
        return $timeout(function () {
            if($scope.selectedItem === $scope.items[0]) {

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
                                return ["Too many results"];
                            } else {
                                size++;
                            }
                        }
                    }
                }

                if(hits.length === 0) {
                    hits.push("No results found");
                }

                return hits;
            }
        });
    };

    //for D3
    $scope.d3Width = document.getElementById("d3box").clientWidth;
    $scope.d3Height = document.getElementById("d3box").clientHeight;

    //ForceGraph.renderForceGraph($scope.d3Width, $scope.d3Height);

    angular.element($window).bind('resize', function() {
        $scope.d3Width = document.getElementById("d3box").clientWidth;
        $scope.d3Height = document.getElementById("d3box").clientHeight;
        ForceGraph.updateSize($scope.d3Width, $scope.d3Height);
        $scope.$apply();
    });
});