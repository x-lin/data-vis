import React from "react";
import { connect } from "react-redux";

import SearchBarComponent from "../SearchBar/SearchBarContainer";
import GraphPanel from "../GraphPanel/GraphPanel";
import VerticalSplitView from "../widgets/VerticalSplitView";

const Relations = ({ sidebarObject, sidebarVisible }) => {
    const height = "calc(100vh - 50px)";

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
};

Relations.propTypes = {
    sidebarObject: React.PropTypes.object,
    sidebarVisible: React.PropTypes.bool.isRequired
};

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
