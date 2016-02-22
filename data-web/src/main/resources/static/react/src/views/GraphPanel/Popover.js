import React from "react";
import d3 from "d3";

import Constants from "../../config/Constants";
import "./ForceGraph.css";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            nodes: {},
            links: {}
        }
    };

    render() {
        return (
            <div id={this.props.divId}>
            </div>
        );
    };

    componentDidMount() {
        this.renderGraph(this.props.graph);
        window.addEventListener('resize', this.resizePanel.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizePanel);
    }

    componentDidUpdate() {
        d3.selectAll(".g")
            .attr("title", function(d) {console.log("my title " + d.key); return d.key})
            .attr("data-content", function(d) {return "Some content to " + d.key})
            .attr("data-toggle", "popover");

        $(".g").popover({
            'trigger':'click'
            ,'container': 'body'
            ,'placement': 'right'
            ,'white-space': 'nowrap'
            ,'html':'true'
        });
    }
}