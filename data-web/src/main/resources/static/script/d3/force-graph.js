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
                var colorMap = {
                    Project : "rgb(31, 119, 180)",
                    Issue : "rgb(174, 199, 232)",
                    Requirement : "rgb(44, 160, 44)",
                    User : "rgb(255, 127, 14)",
                    //Other : "rgb(150, 150, 150)"
                };

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
                    .charge(-500)
                    .linkDistance(50)
                    //.gravity(0.2)
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

                var restart = function(data){
                    link = link.data(data.edges);
                    link.enter().append("line")
                    .attr("class", "link")
                    //.style("stroke-width", function(d) { return Math.sqrt(d.value); })
                    ;

                    node = node.data(data.nodes);
                    var g = node.enter().append("g")
                    .attr("class", "g")
                    .style("fill", function(d) { return colorMap[d.group] ? colorMap[d.group] : colorMap["Other"]; })
                    //.attr("uib-popover", function(d) {
                    //    return d.key;
                    //})
                    //.attr("popover-trigger", "outsideClick")
                    //.attr("popover-append-to-body", "true")
                    //.attr("uib-popover-template", "dynamicPopover.templateUrl")
                    //.attr("popover-title", "{{dynamicPopover.title}}")

                    ;

                    g.append("circle")
                        .attr("class", "circle")
                        .attr("r", 20);

                    g.append("text")
                        .attr("class", "force-text unselectable")
                        .text(function(d) {return d.key;})
                        .call(function(){
                            $compile($("#d3box"))(scope);
                        });

                    node.on("click", mouseclick)
                        .on("contextmenu", rightclick)
                        .on("dblclick", doubleclick)
                        .call(drag)

                    node.exit().remove();

                    force.start();
                }

                restart(data);

                //////////////////////////////////777
                d3.select("#d3legend").select("svg").remove();
                var svg1 = d3.select("#d3legend").append("svg")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    //.attr("class", "force-graph");

                var dataset = [ 0, 5, 10, 15, 20, 25 ];

                var colorArray = [];
                var i = 0;
                for(var color in colorMap) {
                    colorArray.push({
                        name : color,
                        color : colorMap[color],
                        index : i++
                    })
                }

                svg1.selectAll("g")
                    .data(colorArray)
                    .enter()
                    .append("g")
                    .attr("transform", function(d) {return "translate(10," + (d.index*25+10) + ")";})
                    .append("circle")
                    .attr("r", 10)
                    .attr("fill", function(d) {return d.color});

                var g = svg1.selectAll("g")
                    .append("text")
                    .attr("x", 20)
                    .attr("alignment-baseline", "middle")
                    .text(function(d){return d.name});

                var bbox = svg1.node().getBBox();

                svg1.attr("width", bbox.width)
                    .attr("height", bbox.height);
                //////////////////////////////////777

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
                    scope.getNeighbors(d.group, d.key).then(function(d1) {
                        data = D3Utility.updateDataWithNodes(data, d1, d.index);

                        restart(data);

                        force.start();
                    });
                }

                //speed up animation by 10
                function animation() {
                    var ticksPerRender = 10;
                    requestAnimationFrame(function render() {
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