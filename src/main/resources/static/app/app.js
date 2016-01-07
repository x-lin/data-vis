'use strict';

var app = angular.module('datavisApp',
    ['ngRoute', 'd3Service', 'rest', 'ngAnimate', 'ui.bootstrap']);

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
    var tickets = ["TIC1", "TEST2", "ABC", "DFD", "FGGF8", "ASDG4"];

    return {
        getDataItems: function() {
            return items;
        },
        getTickets: function() {
            return tickets;
        }
    }
});

app.controller('RelationshipsCtrl', function (
    $scope,
    $sce,
    $timeout,
    $window,
    $http,
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

    $scope.searchText = "";
    $scope.search = function() {
        console.log($scope.selectedItem + " " + $scope.searchText);
    }

    var input = document.getElementById("search");
    //new Awesomplete(input);

    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    $scope.tickets = RelationshipsFactory.getTickets();

    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(response){
            return response.data.results.map(function(item){
                return item.formatted_address;
            });
        });
    };

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