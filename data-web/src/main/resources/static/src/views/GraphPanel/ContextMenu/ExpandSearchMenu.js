import React from "react";
import { connect } from "react-redux";

import Constants from "../../../config/Constants";
import Label from "../../widgets/Label";
import DataTable from "../../widgets/DataTable";
import { createMapping } from "../../../utils/TableMapping";
import { searchNeighborsSingle } from "../../../actions/aggregated/SearchNeighborsSingleActions";
import { expandNode } from "../../../actions/action-creators/GraphActions";
import { NEIGHBORS_SINGLE_FETCH_ERROR, NEIGHBORS_SINGLE_FETCH_START, NEIGHBORS_SINGLE_FETCH_SUCCESS }
    from "../../../actions/action-creators/SearchNeighborsSingleActions";
import { START, SUCCESS, ERROR } from "../../../config/Settings";
import { DOWNSTREAM, UPSTREAM } from "../../../config/Defaults";

class ExpandSearchMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: null
        };
    }

    componentWillMount() {
        this.props.searchNeighborsSingle(this.props.d);
    }

    onClick(key, toNode) {
        this.props.expandNode(key, toNode);
    }

    setClicked(direction) {
        this.setState({ clicked: direction });
    }

    getStatus() {
        switch (this.props.status) {
            case NEIGHBORS_SINGLE_FETCH_START:
                return START;
            case NEIGHBORS_SINGLE_FETCH_SUCCESS:
                return SUCCESS;
            case NEIGHBORS_SINGLE_FETCH_ERROR:
                return ERROR;
            default:
                return START;
        }
    }

    render() {
        let data = this.props.data;

        if (this.state.clicked !== null) {
            data = data.filter((node) => {
                return !node.direction || node.direction === this.state.clicked;
            });
        }

        const mapper = createMapping()
            .setProperty("name")
            .setColumnHeader("Name")
            .setContentMapping((node) => {
                return (
                    <a onClick={() => this.onClick(this.props.d.key, node)}>
                        {node.name} <Label bgColor={Constants.getColor(node.type)}>{node.type}</Label>
                    </a>
                );
            })
            .getMapping();

        const filter = [
            { onClick: () => this.setClicked(null), body: <span className="fa fa-arrows-v" /> },
            { onClick: () => this.setClicked(UPSTREAM), body: <span className="fa fa-long-arrow-up" /> },
            { onClick: () => this.setClicked(DOWNSTREAM), body: <span className="fa fa-long-arrow-down" /> }
        ];

        return (
            <div className="dropdown-content-item">
                <DataTable
                  filter={filter}
                  data={data}
                  tableClass="table table-sm table-hover contextmenu-table"
                  itemsPerPage={10}
                  pageButtonLimit={5}
                  mapper={[mapper]}
                  status={this.getStatus()}
                />
            </div>
        );
    }
}

ExpandSearchMenu.propTypes = {
    d: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
    status: React.PropTypes.string,
    searchNeighborsSingle: React.PropTypes.func.isRequired,
    expandNode: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        data: state.contextmenu.search,
        status: state.contextmenu.searchStatus
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        searchNeighborsSingle: (node) => {
            dispatch(searchNeighborsSingle(node));
        },
        expandNode: (key, toNode) => {
            dispatch(expandNode(key, toNode));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(ExpandSearchMenu);
