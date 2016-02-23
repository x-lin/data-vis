import React from "react";
import ReactDOM from "react-dom";
import d3 from "d3";

import { spring, Motion } from "react-motion";
import { Popover, OverlayTrigger } from "react-bootstrap";

import Constants from "../../config/Constants";
import "./ForceGraph.css";

const i=0;

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            isStarted: false,
            width: "100%",
            height: "100%",
            resize: false
        }
    };

    render() {
        return (
            <div id={this.props.divId}>

                <svg width={this.state.width} height={this.state.height}
                     className="force-graph" style={{background: "grey"}}
                >
                    <g>

                        {/*<Motion defaultStyle={{x: 0}} style={{x: spring(360)}}>
                            {val => {
                                let style = {
                                    width: val.x,
                                    height: val.x,
                                    position: 'absolute',
                                    top: val.x*0.25,
                                    left: val.x*0.25,
                                    border: '1px solid red',
                                    transform: `rotate(${val.x}deg)`
                                }
                                return <div style={style}>{val.x}</div>
                            }}
                        </Motion>*/}

                        {this.renderLinks()}
                        {this.renderNodes()}
                    </g>
                </svg>
            </div>
        );
    };

    renderLinks() {
        return this.props.graph.edges.map((link, index) => {
            return <line key={index} className="link"

                         x1={link.source.x} y1={link.source.y}
                         x2={link.target.x} y2={link.target.y}
                         key={link.key} />
        });
    }

    renderPopups() {

    }

    renderNodes() {
        return this.props.graph.nodes.map((node, index) => {
            const transform = `transform=(${node.x},${node.y})`;
            return <g key={index} className="g"
                      transform={node.x ? `translate(${node.x},${node.y})` : "translate(0,0)"}
                      fill={this.determineNodeColor(node)} key={node.key}
                      id={"g"+index} title="the svg canvas" data-content="my test">
                     <circle className="circle" r="20"
                            visibility="visible"
                            onClick={(e) => {
                            console.log(e)
                            return <div style={{ height: 120 }}>
    <Popover placement="right" positionLeft={200} positionTop={50} title="Popover right" id={"pop"+id++}>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover>
  </div>
                            }}
                            onDragOver={() => console.log("dragged over")}
                            onDrag={() => console.log("drag")}
                            onDragEnter={() => console.log("onDragEnter")}
                    />
                    <text className="force-text unselectable">{node.key}</text>
            </g>
        });
    }

    componentWillMount() {
        this.state.force = d3.layout.force()
            .charge(-500)
            .linkDistance(50)
            //.chargeDistance(300)
            //.friction(0.5)
            //.gravity(0.2)
            .size([800, 600]);
    }

    componentDidMount() {
        window.addEventListener('resize', (e) => this.resizePanel(e));
        this.setState({width: this.getWidth(), height: this.getHeight()});

        const { force } = this.state;

        force
            .nodes(this.props.graph.nodes)
            .links(this.props.graph.edges);

        const render = () => {
            for (var i = 0; i < 40; i++) {
                force.tick();
            }

            if (force.alpha() > 0) {
                this.forceUpdate();
                requestAnimationFrame(render);
            } else {
                this.state.isStarted = false;
            }
        };

        force.on("start", () => {
            requestAnimationFrame(render);
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizePanel);
    }

    componentDidUpdate() {
        console.log("resizing?", this.state.resize);
        if(this.props.graph.nodes.length > 0 && !this.state.isStarted && !this.state.resize) {
            console.log("starting  force");
            this.state.isStarted = true;
            this.state.force.start();
        }

        //$('#g0').popover({
        //    'trigger':'click'
        //    ,'container': 'body'
        //    ,'placement': 'top'
        //    ,'white-space': 'nowrap'
        //    ,'html':'true'
        //});
    }

    setElementToFixed(d) {
        console.log("d", d);
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("fixed", d.fixed = true);
    }

    resizePanel(e) {
        if (document.getElementById(this.props.divId)) {
            const width = this.getWidth(this.props.divId);
            const height = this.getHeight(this.props.divId);

            this.setState({resize: true, width: width, height: height});
            this.state.force.size([width, height]).resume();

            this.state.resize = false;
        }
    }
    
    getWidth() {
        return document.getElementById(this.props.divId).clientWidth;
    }

    getHeight() {
        return document.getElementById(this.props.divId).clientHeight;
    }
    
    determineNodeColor(d){
        const { colorMap } = Constants;
        return colorMap[d.category] ? colorMap[d.category] : colorMap["Other"];
    }

    searchForNeighbors(d) {
        d3.event.stopPropagation();
        this.props.searchNeighbors(d.category, d.key, false);
    };
}