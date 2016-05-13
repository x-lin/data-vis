import React from "react";
import { connect } from "react-redux";
import { MenuItem, Dropdown, ButtonGroup, Modal, Button } from "react-bootstrap";

import { HIDE_CONTEXT, EXPAND_CONTEXT, STATS_CONTEXT,
    activateContext, deactivateContext} from "../../../actions/action-creators/ContextMenuActions";
import { searchTestCoverage, searchRelatedBugs } from "../../../actions/aggregated/SearchTestCoverageActions";
import { removeFromGraph } from "../../../actions/action-creators/GraphActions";
import ContextMenuBuilder from "./ContextMenuBuilder";
import GraphQueryBuilderContainer from "./GraphQueryBuilderContainer";
import SidebarBoxBody from "../../Sidebar/SidebarBoxBody";
import QueryBuilderQueries, { addRootNode } from "../../../config/QueryBuilderQueries";
import { updateQueryBuilder, reset } from "../../../actions/action-creators/QueryBuilderActions";
import QueryBuilderContainer from "../../QueryBuilderTable/QueryBuilderTableContainer";
import Spinner from "../../widgets/Spinner";

class ContextMenuButtonMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    showTestCoverage(d) {
        this.props.searchTestCoverage(d);
    }

    removeNode(key) {
        this.props.removeFromGraph(key);
        ContextMenuBuilder.removePopup();
    }

    render() {
        const { activateContext, context, d } = this.props;

        return <ButtonGroup justified>
            <a type="button" className={`btn btn-app ${context === EXPAND_CONTEXT && "active"}`} title="Expand node" onClick={() => activateContext(EXPAND_CONTEXT)}>
                <span className="fa fa-plus" />
                Expand
            </a>
            <a type="button" className="btn btn-app" title="Remove node from panel" onClick={() => this.removeNode(d.key)}>
                <span className="fa fa-remove" />
                Hide
            </a>
            <a type="button" className={`btn btn-app ${context === STATS_CONTEXT && "active"}`} title="QBuilder" onClick={() => this.openModal()}>
                <span className="fa fa-bar-chart" />
                QBuilder
            </a>

            <Dropdown id="more-options-menu">
                <a bsRole="toggle" className="btn btn-app dropdown-toggle" title="More options" dataToggle="dropdown">
                    <span className="fa fa-ellipsis-h" />
                    More
                </a>

                <Dropdown.Menu>
                    <MenuItem eventKey="1" onSelect={() => this.showTestCoverage(d)}><strong>TC</strong>&nbsp; Test Coverage</MenuItem>
                    <MenuItem eventKey="2" onSelect={() => this.props.searchRelatedBugs(d)}><strong>RT</strong>&nbsp; Related Open Tickets</MenuItem>
                    {/*<MenuItem eventKey="3" onSelect={() => {}}><strong>RF</strong>&nbsp; Related Features</MenuItem>*/}
                    {/*<MenuItem eventKey="3" onSelect={() => {}} className="disabled"><strong>RW</strong>&nbsp; Related Work Packages</MenuItem>*/}
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={this.state.showModal} onHide={() => this.closeModal()} bsSize="large" dialogClassName="modal-big" style={{ width: "95%" }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Query Builder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: "table", width: "100%" }}>
                        <div style={{ display: "table-cell", width: "15%", paddingRight: "10px" }}>
                            <ul className="nav nav-pills nav-stacked">
                                {
                                    QueryBuilderQueries().map((query, index) => {
                                        return <li key={index}><a href="#" style={{ whiteSpace: "nowrap" }} onClick={() => {
                                            this.props.updateQueryBuilder(addRootNode(this.props.builder.nodes[0], query.data));
                                        }}
                                      className="btn btn-flat">{query.name}</a></li>
                                    })
                                }
                                <li className="btn bg-navy btn-flat" onClick={() => this.props.updateQueryBuilder({
                                data: [],
                                edges: [],
                                nodes: [this.props.builder.nodes[0]]
                                })}>Custom</li>
                            </ul>
                        </div>
                        <GraphQueryBuilderContainer node={this.props.d} close={() => this.closeModal()} />
                        {this.props.builder.data &&
                        <div style={{ display: "table-cell", width: "40%", paddingLeft: "10px" }}>
                            {this.props.builder.data.status === "SUCCESS" &&
                            <QueryBuilderContainer data={this.props.builder.data.data}
                                                   status={this.props.builder.data.status}/>}
                            {this.props.builder.data.status === "ERROR" &&
                            <span className="bg-red">An error occured!</span>}
                            {this.props.builder.data.status === "START" && <Spinner />}
                        </div>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </ButtonGroup>
    }
}

const mapStateToProps = (state) => {
    return {
        builder: state.builder,
        context: state.contextmenu.context
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchTestCoverage: (node) => {
            dispatch(searchTestCoverage(node));
        },
        searchRelatedBugs: (node) => {
            dispatch(searchRelatedBugs(node));
        },
        activateContext: (context) => {
            dispatch(activateContext(context));
        },
        deactivateContext: () => {
            dispatch(deactivateContext());
        },
        removeFromGraph: (key) => {
            dispatch(removeFromGraph(key));
        },
        updateQueryBuilder: (data) => {
            dispatch(updateQueryBuilder(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ContextMenuButtonMenu);
