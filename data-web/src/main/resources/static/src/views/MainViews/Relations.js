import React from "react";
import { connect } from "react-redux";

import SearchBarComponent from "../SearchBar/SearchBarComponent";
import GraphPanel from "../GraphPanel/GraphPanel";
import ExportToImage from "../GraphPanel/ExportToImage"
import TestCoverageComponent from "../TestCoveragePanel/TestCoverageComponent";
import VerticalSplitView from "../widgets/VerticalSplitView";

const Relations = ( { sidebarObject, sidebarVisible } ) => {
    const height = "calc(100vh - 50px)"

    return (
        <div>
            <VerticalSplitView rightWidth={500} height={height}>
                <div style={{height: height}}>
                    <SearchBarComponent />
                    <GraphPanel />
                </div>
                {sidebarVisible && sidebarObject}

            </VerticalSplitView>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        sidebarObject: state.layout.sidebar.obj,
        sidebarVisible: state.layout.sidebar.visible
    };
};

export default connect(
    mapStateToProps,
    null
)(Relations);