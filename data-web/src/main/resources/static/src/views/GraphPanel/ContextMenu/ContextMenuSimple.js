import React from "react";
import ReactDOM from "react-dom";

import Constants from "../../../config/Constants";
import Group1 from "./ContextMenuGroupl1";
import Group2 from "./ContextMenuGroupl2";
import Group3 from "./ContextMenuGroupl3";
import ContextMenuTitle from "./ContextMenuTitle";

import { Popover, Overlay } from "react-bootstrap";

export default class extends React.Component {
    render() {
        return (
            <Overlay
                show={true}
                target={() => ReactDOM.findDOMNode(this.props.target)}
                placement="right"
                container={this}
            >
                <Popover title={<ContextMenuTitle d={this.props.d}/>}
                         id={this.props.d.key} style={{
                                borderRadius: "3px",
                                borderTop: "3px solid #d2d6de"}}
                >
                    <div className="btn-group-vertical">
                        <button type="button" className="btn btn-default">Top</button>
                        <button type="button" className="btn btn-default">Middle</button>
                        <button type="button" className="btn btn-default">Bottom</button>
                    </div>
                </Popover>
            </Overlay>
        )
    }
};