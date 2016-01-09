d3Service.factory('ForceGraph',
    function (
        D3Utility
    ) {

        var currentGraph;
        var currentSvg;

        return {
            updateSize: function(width, height) {
                console.log("updating");
                currentSvg.attr("width", width).attr("height", height);
                currentGraph.size([width, height]).resume();

            },
            renderForceGraph: function(width, height) {
                console.log("rendering force graph");

                //var svg = D3Utility.getResponsiveSvg("#d3box", width, height).
                //    attr("class", "force-graph");
                console.log(width + ":"+height);

                var svg = d3.select("#d3box").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "force-graph");

                currentSvg = svg;

                var color = d3.scale.category20();

                var force = d3.layout.force()
                    .charge(-120)
                    .linkDistance(30)
                    .size([width, height]);

                d3.json("d3/miserables.json", function(error, graph) {
                    if (error) throw error;

                    force
                        .nodes(graph.nodes)
                        .links(graph.links)
                        .start();

                    var link = svg.selectAll(".link")
                        .data(graph.links)
                        .enter().append("line")
                        .attr("class", "link")
                        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

                    var node = svg.selectAll(".node")
                        .data(graph.nodes)
                        .enter().append("circle")
                        .attr("class", "node")
                        .attr("r", 5)
                        .style("fill", function(d) { return color(d.group); })
                        .call(force.drag);

                    node.append("title")
                        .text(function(d) { return d.name; });

                    force.on("tick", function() {
                        link.attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });

                        node.attr("cx", function(d) { return d.x; })
                            .attr("cy", function(d) { return d.y; });
                    });
                });

                currentGraph = force;
            }
        }
    }
);