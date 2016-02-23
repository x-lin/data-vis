import React from "react";
import ReactDOM from "react-dom";

import Constants from "../../../config/Constants";
import Group1 from "./ContextMenuGroupl1";
import Group2 from "./ContextMenuGroupl2";
import Group3 from "./ContextMenuGroupl3";
import ContextMenuTitle from "./ContextMenuTitle";

import { OverlayTrigger, Popover, Button, Overlay } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {openGroupId: "group1"};
    }

    setGroup(id) {
        this.setState({openGroupId: id});
    }


    render() {
        const imgDir = "img/";

        return (
            <Overlay
                show={true}
                target={() => ReactDOM.findDOMNode(this.props.target)}
                placement="right"
                container={this}
            >
                <Popover title={<ContextMenuTitle d={this.props.d}/>} id={this.props.d.key}>
                    <div className="row inpadding">
                        <div className="btn-group btn-group-justified" role="group" aria-label="Browse at source site">
                            <a type="button" className="btn btn-default">
                                <img src={`${imgDir}jira-logo.png`} height="20px" />
                            </a>
                            <a type="button" className="btn btn-default">
                                <img src={`${imgDir}jama-logo.png`} height="20px" />
                            </a>
                        </div>
                    </div>

                    <div className="panel-group" id="accordion">
                        <Group1 id="group1" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group1")} />
                        <Group2 id="group2" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group2")} />
                        <Group3 id="group3" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group3")} />
                    </div>
                </Popover>
            </Overlay>
        )
    }
};