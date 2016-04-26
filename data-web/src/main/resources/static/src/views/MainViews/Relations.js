import React from "react";
import { connect } from "react-redux";

import SearchBarContainer from "../SearchBar/SearchBarContainer";
import GraphPanel from "../GraphPanel/GraphPanel";
import VerticalSplitView from "../widgets/VerticalSplitView";
import SidebarContainer from "../Sidebar/SidebarContainer";
import DOMSelector from "../../utils/DOMSelector";

class Relations extends React.Component {
    // TODO move logic to a more sensible place and merge with resizePanel method of ForceGraph
    resizePanel(e) {
        const selector = "#force-graph-component";

        if ($(selector)) {
            const width = DOMSelector.getWidth(selector);
            const height = DOMSelector.getHeight(selector);

            d3.select(selector)
                .select("svg")
                .attr("width", DOMSelector.getWidth(selector))
                .attr("height", DOMSelector.getHeight(selector));
        }
    }

    componentDidUpdate() {
        if (this.props.sidebarVisible === false) {
            this.resizePanel();
        }
    }

    render() {
        const height = "calc(100vh - 50px)";

        return (
            <div>
                <VerticalSplitView rightWidth={500} height={height}>
                    <div style={{ height }}>
                        <SearchBarContainer />
                        <GraphPanel />
                    </div>
                    {this.props.sidebarVisible && <SidebarContainer />}

                </VerticalSplitView>
            </div>
        );
    }
}
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
