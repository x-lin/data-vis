'use strict';

/**
 used for highlighting current header link
 //TODO improve the way to get the default route and highlight the default, if nothing else was active
 */
app.directive('bsActiveLink', ['$location', function ($location) {

    var defaultLink = "Relationships";

    return {
        restrict: 'A', //use as attribute
        replace: false,
        link: function (scope, elem) {
            //after the route has changed
            scope.$on("$routeChangeSuccess", function () {
                var hrefs = ['/#' + $location.path(),
                    '#' + $location.path(), //html5: false
                    $location.path()]; //html5: true

                var foundLink = false;
                var defaultLinkA = {};

                angular.forEach(elem.find('a'), function (a) {
                    a = angular.element(a);
                    if (-1 !== hrefs.indexOf(a.attr('href'))) {
                        a.parent().addClass('active');
                        foundLink = true;
                    } else {
                        if(a.parent().text() === defaultLink) {
                            defaultLinkA = a;
                        }

                        a.parent().removeClass('active');
                    }
                });

                if(!foundLink) {
                    defaultLinkA.parent().addClass('active');
                }
            });
        }
    };
}]);