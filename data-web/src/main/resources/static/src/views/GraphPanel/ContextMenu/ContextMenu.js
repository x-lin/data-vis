import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

import { store } from "../../../stores/ReduxStore";
import Constants from "../../../config/Constants";
import Group1 from "./ContextMenuGroupl1";
import Group2 from "./ContextMenuGroupl2";
import Group3 from "./ContextMenuGroupl3";
import ContextMenuTitle from "./ContextMenuTitle";
import "./ContextMenu.css";
import { connect } from "react-redux";
import TestCoverageComponent from "../../TestCoveragePanel/TestCoverageComponent";

import { getNeighbors } from "../../../actions/aggregated/GETNeighbors";
import { searchTestCoverage } from "../../../actions/aggregated/SearchTestCoverage";

import { OverlayTrigger, Popover, Button, Overlay } from "react-bootstrap";

export default class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    renderButtons(type, jiraId, jamaId, jamaProjectId) {
        const imgDir = "img/";
        const jiraAddress = Constants.getJiraAddress(type, jiraId);
        const jamaAddress = Constants.getJamaAddress(jamaId, jamaProjectId);

        return <div className="btn-group btn-group-justified" role="group" aria-label="Browse at source site">
            {jiraAddress &&
            <a type="button" className="btn btn-default" href={jiraAddress} target="_blank">
                <img src={`${imgDir}jira-logo.png`} height="20px" />
            </a>
            }
            {jamaAddress &&
            <a type="button" className="btn btn-default" href={jamaAddress} target="_blank">
                <img src={`${imgDir}jama-logo.png`} height="20px" />
            </a>
            }
        </div>;
    }

    renderMenu(key, type, d) {

        return <div className="dropdown">
            <div className="dropdown-content">

                <a onClick={() => this.showTestCoverage(key, type, d)}>Show Test Coverage</a>
                <a onClick={() => this.goUpstream(key, type)}>Show System Decomp. - Upstream</a>
                <a onClick={() => this.goDownstream(key, type)}>Show System Decomp. - Downstream</a>
                {/*<a onClick={() => this.showFeatures(key, type)}>Show Features</a>*/}
                <a onClick={() => this.showStats(key, type)}>Show Stats</a>
            </div>
        </div>
    }

    showTestCoverage(key, category, d) {
        store.dispatch(searchTestCoverage(category, key, d));
    }

    showFeatures(key, category) {
        const paramsString = "type=FEAT&limit=500";

        store.dispatch(getNeighbors(category, key, paramsString));
    }

    showStats(key, category) {
    }

    goUpstream(key, category) {
        const paramsString = "type=FEAT&type=SSS&type=SRS&type=PSRS&type=WP&downstream=false&limit=500";

        store.dispatch(getNeighbors(category, key, paramsString));
    }

    goDownstream(key, category) {
        const paramsString = "type=FEAT&type=SSS&type=SRS&type=PSRS&type=WP&upstream=false&limit=500";

        store.dispatch(getNeighbors(category, key, paramsString));
    }

    render() {
        let { jiraId, key, jamaId, projectId, type, name } = this.props.d;

        //TODO fix that for extraction -> add jiraId
        if(type === "User" || type === "Project") {
            jiraId = key;
        }

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
                        <ul className="nav nav-tabs ">
                            <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true" className="title-small space-smaller">Data</a></li>
                            <li className=""><a href="#tab_2" data-toggle="tab" aria-expanded="false" className="title-small space-smaller">Filter by</a></li>
                            <li className=""><a href="#tab_3" data-toggle="tab" aria-expanded="false" className="title-small space-smaller"> Advanced</a></li>
                        </ul>
                        <div className="tab-content overflow-scroll">

                            <div className="tab-pane active" id="tab_1">
                                {this.renderMenu(key, type, this.props.d)}
                            </div>
                            <div className="tab-pane" id="tab_2">
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            </div>
                            <div className="tab-pane" id="tab_3">
                                Some other text.
                            </div>
                        </div>
                    </div>
                    {/*<Group1 id="group1" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group1")} />
                        <Group2 id="group2" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group2")} />
                        <Group3 id="group3" openGroupId={this.state.openGroupId} clickHandler={(id) => this.setGroup("group3")} />*/}
                    <div className="row inpadding ">
                        {this.renderButtons(type, jiraId, jamaId, projectId)}
                    </div>
                </Popover>
            </Overlay>
        )
    }
};

//const mapStateToProps = (state) => {
//    return {
//        graph: state.schema,
//    };
//};
//
//const mapDispatchProps = (dispatch) => {
//    return {
//        searchNeighbors: (category, key, paramsString) => {
//            dispatch(getNeighbors(category, key, paramsString));
//        }
//    };
//};
//
//export default connect(
//    () => {},
//    mapDispatchProps
//)(ContextMenu);