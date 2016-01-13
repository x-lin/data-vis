d3Service.factory('ForceGraph',
    function (
        $compile,
        D3Utility
    ) {

        var currentGraph = null;
        var currentSvg = null;

        return {
            updateSize: function(width, height) {
                if(currentGraph === null) {
                    return;
                }

                currentGraph.size([width, height]).resume();

                //TODO improve
                d3.selectAll("g")
                    .each(function(d){d.fixed = false;})
                    .classed("fixed", false);
            },
            renderForceGraph: function(data, width, height, scope) {
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
                    .charge(-750)
                    .linkDistance(50)
                    .gravity(0.2)
                    .size([width, height])
                    .nodes(data.nodes)
                    .links(data.edges)
                    .on('start', animation);

                //define drag events
                var drag = force.drag()
                    .on("dragstart", dragstart)
                    .on("drag", dragmove);

                var link = svg.selectAll(".link");
                var node = svg.selectAll(".node");

                //force.on("tick", function() {
                //    link.attr("x1", function(d) { return d.source.x; })
                //        .attr("y1", function(d) { return d.source.y; })
                //        .attr("x2", function(d) { return d.target.x; })
                //        .attr("y2", function(d) { return d.target.y; });
                //
                //    node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"});
                //});


                var restart = function(){
                    console.log("restarting");
                    console.log(data);

                    link = link.data(data.edges);
                    link.enter().append("line")
                    .attr("class", "link")
                    //.style("stroke-width", function(d) { return Math.sqrt(d.value); })
                    ;

                    node = node.data(data.nodes);
                    node.enter().append("g")
                    .attr("class", "g")
                    .style("fill", function(d) { return color(d.group); })
                    //.attr("uib-popover", function(d) {
                    //    return d.key;
                    //})
                    //.attr("popover-trigger", "outsideClick")
                    //.attr("popover-append-to-body", "true")
                    //.attr("uib-popover-template", "dynamicPopover.templateUrl")
                    //.attr("popover-title", "{{dynamicPopover.title}}")
                    .on("click", mouseclick)
                    .on("contextmenu", rightclick)
                    .on("dblclick", doubleclick)
                    .call(drag)
                    ;

                    node.append("circle")
                        .attr("class", "circle")
                        .attr("r", 20);

                    node.append("text")
                        .attr("class", "force-text unselectable")
                        .text(function(d) { return d.key; })
                        .call(function(){
                            $compile($("#d3box"))(scope);
                        });

                    console.log("starting force")
                    force.start();
                }

                restart();

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

                }

                function rightclick(d) {
                    //d3.event.preventDefault();
                }

                function doubleclick(d) {
                    var nr = 5;

                    for(var i = 0; i<nr; i++) {
                        var n = {};
                        n.key = "testing node";
                        n.group = 3;
                        var point = d3.mouse(this);
                        n.x = point[0];
                        n.y = point[1];

                        data.nodes.push(n);

                        var e = {
                            source: d.index,
                            target: data.nodes.length - 1
                        };
                        data.edges.push(e);
                    }

                    restart();

                    force.start();
                }

                //speed up animation by 10
                function animation() {
                    var ticksPerRender = 10;
                    requestAnimationFrame(function render() {
                        console.log("rendering");
                        for (var i = 0; i < ticksPerRender; i++) {
                            force.tick();
                        }

                        link
                            .attr('x1', function(d) { return d.source.x; })
                            .attr('y1', function(d) { return d.source.y; })
                            .attr('x2', function(d) { return d.target.x; })
                            .attr('y2', function(d) { return d.target.y; });

                        node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"});

                        if (force.alpha() > 0) {
                            requestAnimationFrame(render);
                        }
                    })
                }

                currentGraph = force;
            }
        }
    }
);