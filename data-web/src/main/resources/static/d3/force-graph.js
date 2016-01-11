d3Service.factory('ForceGraph',
    function (
        $compile,
        D3Utility
    ) {

        var currentGraph;
        var currentSvg;

        return {
            updateSize: function(width, height) {
                console.log("updating");
                currentSvg.attr("width", width).attr("height", height);
                currentGraph.size([width, height]).resume();

                //TODO improve
                d3.selectAll("g")
                    .each(function(d){d.fixed = false;})
                    .classed("fixed", false);
            },
            renderForceGraph: function(graph, width, height, scope) {
                console.log("rendering force graph");

                //var svg = D3Utility.getResponsiveSvg("#d3box", width, height).
                //    attr("class", "force-graph");
                d3.select("#d3box").select("svg").remove();
                var svg = d3.select("#d3box").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "force-graph");

                currentSvg = svg;

                var color = d3.scale.category20();

                var force = d3.layout.force()
                    .charge(-700)
                    .linkDistance(50)
                    .size([width, height])
                    .nodes(graph.nodes)
                    .links(graph.edges)
                    .start();

                var link = svg.selectAll(".link")
                    .data(graph.edges)
                    .enter().append("line")
                    .attr("class", "link")
                    //.style("stroke-width", function(d) { return Math.sqrt(d.value); })
                    ;

                //define drag events
                var drag = force.drag()
                    .on("dragstart", dragstart)
                    .on("drag", dragmove);

                var node = svg.selectAll(".node")
                    .data(graph.nodes)
                    .enter().append("g")
                    .attr("class", "g")
                    .style("fill", function(d) { return color(d.group); })
                    .attr("uib-popover", function(d) {
                        return d.key;
                    })
                    .attr("popover-trigger", "outsideClick")
                    .attr("popover-append-to-body", "true")
                    .on("click", mouseclick)
                    .on("contextmenu", rightclick)
                    .on("dblclick", doubleclick)
                    .call(drag)
                    ;

                node.append("circle")
                    .attr("class", "circle")
                    .attr("r", 20)
                    //.attr("uib-popover", "some test test test")
                    //.attr("popover-trigger", "focus")
                    //.attr("popover-append-to-body", "true")

                //uib-popover="I appeared on mouse enter!" popover-trigger="mouseenter"
                ;


                node.append("text")
                    .attr("class", "force-text")
                    .text(function(d) { return d.key; })
                    .call(function(){
                        console.log("doing something")
                        $compile(svg)(scope);
                    });

                force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"});

                        //.attr("cx", function(d) { return d.x; })
                        //.attr("cy", function(d) { return d.y; });
                });

                //fix position of node after dragged by user
                function dragstart(d) {
                    d3.select(this).classed("fixed", d.fixed = true);
                }

                //limit draggable area to canvas
                function dragmove(d) {
                    if (d.py > height) d.py = height;
                    if (d.py < 0) d.py = 0;

                    if (d.px > width) d.px = width;
                    if (d.px < 0) d.px = 0;
                }

                function mouseclick(d) {
                    console.log("clicked on me");
                }

                function rightclick(d) {
                    console.log(d);
                    //return false;
                    d3.event.preventDefault();
                }

                function doubleclick(d) {
                    console.log("double clicked");
                    d3.event.preventDefault();
                }

                currentGraph = force;
            }
        }
    }
);