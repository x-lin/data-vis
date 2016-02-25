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
                <Popover title={<ContextMenuTitle d={this.props.d}/>}
                         id={this.props.d.key} style={{
                                borderRadius: "3px",
                                borderTop: "3px solid #d2d6de"}}
                        >

                    <div className="nav-tabs-custom">
                        <ul className="nav nav-tabs">
                            <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true" className="title-small space-smaller">Data</a></li>
                            <li className=""><a href="#tab_2" data-toggle="tab" aria-expanded="false" className="title-small space-smaller">Filter by</a></li>
                            <li className=""><a href="#tab_3" data-toggle="tab" aria-expanded="false" className="title-small space-smaller"> Advanced</a></li>
                        </ul>
                        <div className="tab-content overflow-scroll">
                            <div className="tab-pane active" id="tab_1">
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

                                <b>How to use:</b>
                                <p>Exactly like the original bootstrap tabs except you should use
                                    the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>
                                A wonderful serenity has taken possession of my entire soul,
                                like these sweet mornings of spring which I enjoy with my whole heart.
                                I am alone, and feel the charm of existence in this spot,
                                which was created for the bliss of souls like mine. I am so happy,
                                my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
                                that I neglect my talents. I should be incapable of drawing a single stroke
                                at the present moment; and yet I feel that I never was a greater artist than now.
                            </div>
                            <div className="tab-pane" id="tab_2">
                                The European languages are members of the same family. Their separate existence is a myth.
                                For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ
                                in their grammar, their pronunciation and their most common words. Everyone realizes why a
                                new common language would be desirable: one could refuse to pay expensive translators. To
                                achieve this, it would be necessary to have uniform grammar, pronunciation and more common
                                words. If several languages coalesce, the grammar of the resulting language is more simple
                                and regular than that of the individual languages.
                            </div>
                            <div className="tab-pane" id="tab_3">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                                sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                                like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                        </div>
                    </div>
                    {/*<Group1 id="group1" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group1")} />
                        <Group2 id="group2" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group2")} />
                        <Group3 id="group3" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group3")} />*/}

                </Popover>
            </Overlay>
        )
    }
};