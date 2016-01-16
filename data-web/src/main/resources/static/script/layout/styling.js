'use strict';

/**
 used for highlighting current header link
 //TODO improve the way to get the default route and highlight the default, if nothing else was active
 */
app.directive('bsActiveLink', ['$location', function ($location) {
    return {
        restrict: 'A', //use as attribute
        replace: false,
        link: function (scope, elem) {
            //after the route has changed
            scope.$on("$routeChangeSuccess", function () {
                var hrefs = ['/#' + $location.path(),
                    '#' + $location.path(), //html5: false
                    $location.path()]; //html5: true

                angular.forEach(elem.find('a'), function (a) {
                    a = angular.element(a);

                    if (-1 !== hrefs.indexOf(a.attr('href'))) {
                        a.parent().addClass('active');
                    } else {
                        a.parent().removeClass('active');
                    }
                });
            });
        }
    };
}]);