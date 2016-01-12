

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
        },
        /**
         * Connects the data between each entry of a data group and returns it in a
         * format suitable for force graphs. The function expects each entry to
         * contain a "key" attribute.
         *
         * @param dataGroups
         * @returns {{}}
         */
        createD3ForGroupPair : function(group1, group2) {
            var nodes = [],
                edges = [],
                graph = {};

            for(var i = 0 ; i < group1.length; i++) {
                var node = {};
                node.key = group1[i].key;
                node.group = 1;
                nodes.push(node);
            }

            for(var j = 0; j < group2.length; j++) {
                var node = {};
                node.key = group2[j].key;
                node.group = 2;
                nodes.push(node);
            }

            for(i = 0; i < group1.length; i++) {
                for(j = 0; j < group2.length; j++) {
                    var edge = {};
                    //we know that group1 was initialized before group2, therefore we can use the length of the
                    //group1 array to determine the placement of the element of group2
                    edge.source = i;
                    edge.target = j + group1.length;
                    edges.push(edge);
                }
            }

            graph.edges = edges;
            graph.nodes = nodes;

            return graph;
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