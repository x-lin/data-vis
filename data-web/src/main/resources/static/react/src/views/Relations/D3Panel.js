import React from "react";

import d3 from "d3";

import D3ForceGraph from "./D3ForceGraph";
import D3Legend from "./D3Legend";

class D3Panel extends React.Component {
    render() {
        return (
            <div>
                <D3Legend />
                <D3ForceGraph divId={"d3box"} />
            </div>
        );
    };
}

export default D3Panel;