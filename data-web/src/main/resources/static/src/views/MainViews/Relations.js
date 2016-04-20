import React from "react";
import { connect } from "react-redux";

import SearchBarContainer from "../SearchBar/SearchBarContainer";
import GraphPanel from "../GraphPanel/GraphPanel";
import VerticalSplitView from "../widgets/VerticalSplitView";
import SidebarContainer from "../Sidebar/SidebarContainer";

const Relations = ({ sidebarVisible }) => {
    const height = "calc(100vh - 50px)";

    return (
        <div>
            <VerticalSplitView rightWidth={500} height={height}>
                <div style={{ height }}>
                    <SearchBarContainer />
                    <GraphPanel />
                </div>
                {sidebarVisible && <SidebarContainer />}

            </VerticalSplitView>
        </div>
    );
};

Relations.propTypes = {
    sidebarVisible: React.PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        sidebarVisible: state.layout.sidebar.visible
    };
};

export default connect(
    mapStateToProps,
    null
)(Relations);
