import { connect } from "react-redux";

import { addNode, removeNode, setDirection, setMaxPathLength, setMinPathLength, toggleOptional, toggleOutput, reset,
    setNodeType, addFilter, removeFilter, addSubFilter, removeSubFilter, updateSubFilter, updateFilterOperator,
    updateSubFilterOperator }
    from "../../../actions/action-creators/QueryBuilderActions";
import { searchByQueryBuilder }
    from "../../../actions/aggregated/SearchTestCoverageActions";

import GraphQueryBuilder from "./GraphQueryBuilder1";


const mapStateToProps = (state) => {
    return {
        nodes: state.builder.nodes,
        edges: state.builder.edges,
        nodeTypes: state.nodeTypes.data
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        addNode: (sourceId, node) => {
            dispatch(addNode(sourceId, node));
        },
        removeNode: (nodeId) => {
            dispatch(removeNode(nodeId));
        },
        setDirection: (sourceId, targetId, direction) => {
            dispatch(setDirection(sourceId, targetId, direction));
        },
        setMinPathLength: (sourceId, targetId, length) => {
            dispatch(setMinPathLength(sourceId, targetId, length));
        },
        setMaxPathLength: (sourceId, targetId, length) => {
            dispatch(setMaxPathLength(sourceId, targetId, length));
        },
        toggleOutput: (nodeId) => {
            dispatch(toggleOutput(nodeId));
        },
        toggleOptional: (nodeId) => {
            dispatch(toggleOptional(nodeId));
        },
        reset: () => {
            dispatch(reset());
        },
        setNodeType: (nodeId, node) => {
            dispatch(setNodeType(nodeId, node));
        },
        searchByQueryBuilder: (data) => {
            dispatch(searchByQueryBuilder(data));
        },
        addFilter: (nodeId) => {
            dispatch(addFilter(nodeId));
        },
        removeFilter: (nodeId, filterId) => {
            dispatch(removeFilter(nodeId, filterId));
        },
        addSubFilter: (nodeId, filterId) => {
            dispatch(addSubFilter(nodeId, filterId));
        },
        removeSubFilter: (nodeId, filterId, subFilterId) => {
            dispatch(removeSubFilter(nodeId, filterId, subFilterId));
        },
        updateSubFilter: (nodeId, filterId, subFilterId, data) => {
            dispatch(updateSubFilter(nodeId, filterId, subFilterId, data));
        },
        updateSubFilterOperator: (nodeId, filterId, operator) => {
            dispatch(updateSubFilterOperator(nodeId, filterId, operator));
        },
        updateFilterOperator: (nodeId, operator) => {
            dispatch(updateFilterOperator(nodeId, operator));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchProps
)(GraphQueryBuilder);
