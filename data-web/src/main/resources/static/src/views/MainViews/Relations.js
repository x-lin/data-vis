import React from "react";
import { connect } from "react-redux";

import SearchBarComponent from "../SearchBar/SearchBarComponent";
import GraphPanel from "../GraphPanel/GraphPanel";
import ExportToImage from "../GraphPanel/ExportToImage"
import Draggable from "./Draggable";
import TestCoverageComponent from "../TestCoveragePanel/TestCoverageComponent";
import VerticalSplitView from "../widgets/VerticalSplitView";

const Relations = ( { sidebarObject } ) => {
    console.log("rerendering")

    return (
        <div>
            <VerticalSplitView rightWidth={500}>
                <div>
                    <SearchBarComponent />
                    <div style={{height: "100vh"}}>
                        <GraphPanel />
                    </div>
                </div>
                {sidebarObject}
            </VerticalSplitView>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        sidebarObject: state.layout.sidebar.object
    };
};

//const mapDispatchProps = (dispatch) => {
//    return {
//        getStats: (type, key) => {
//            dispatch(getStats(type, key));
//        },
//        getStatsCategory: (type, key) => {
//            dispatch(getStatsCategory(type, key));
//        }
//    };
//};

export default connect(
    mapStateToProps,
    null
)(Relations);