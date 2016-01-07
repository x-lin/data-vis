var d3Service = angular.module('d3Service', []);

d3Service.factory('D3Utility', function() {
    return {
        /**
         * Makes the SVG element responsive
         *
         * @param parentEl
         * @param width
         * @param height
         */
        getResponsiveSvg : function(parentEl, width, height) {
            var svg = d3.select(parentEl)
                .append("div")
                .classed("svg-container", true) //container class to make it responsive
                .append("svg")
                //responsive SVG needs these 2 attributes and no width and height attr
                .attr("preserveAspectRatio", "xMidYMid meet")
                .attr("viewBox", "0 0 " + width + " "+ height)
                //class to make it responsive
                .classed("svg-content-responsive", true);

            return svg;
        }
    }
});

//TODO possibly inject D3 dynamically
//d3.factory('d3Service', [
//    '$document',
//    '$q',
//    '$rootScope',
//    function($document, $q, $rootScope) {
//        console.log("init d3 service")
//
//        var d = $q.defer();
//        function onScriptLoad() {
//            // Load client in the browser
//            $rootScope.$apply(function() { d.resolve(window.d3); });
//        }
//        // Create a script tag with d3 as the source
//        // and call our onScriptLoad callback when it
//        // has been loaded
//        var scriptTag = $document[0].createElement('script');
//        scriptTag.type = 'text/javascript';
//        scriptTag.async = true;
//        scriptTag.src = 'http://d3js.org/d3.v3.min.js';
//        scriptTag.onreadystatechange = function () {
//            if (this.readyState == 'complete') onScriptLoad();
//        }
//        scriptTag.onload = onScriptLoad;
//
//        var s = $document[0].getElementsByTagName('body')[0];
//        s.appendChild(scriptTag);
//
//        return {
//            d3: function() { return d.promise; }
//        };
//}]);