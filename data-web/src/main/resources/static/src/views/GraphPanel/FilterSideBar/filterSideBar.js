import React from "react";

import SideBarHeader from "../../widgets/SideBarHeader";
import SideBarCollapsable from "../../widgets/SideBarCollapsable";
import LeftSideBar from "../../widgets/LeftSideBar";
import BasicOptionsComponent from "./BasicOptionsComponent";
import NeighborExpansionComponent from "./NeighborExpansionComponent";

export default class extends React.Component {
    render() {
        return (
            <LeftSideBar>
                <SideBarHeader title="Filters" iconClass="fa fa-filter" />

                <SideBarCollapsable title="Basic Options">
                    <BasicOptionsComponent />
                </SideBarCollapsable>

                <SideBarCollapsable title="Neighbor Expansion" collapsed={true}>
                    <NeighborExpansionComponent />
                </SideBarCollapsable>

                <SideBarCollapsable title="Graph Traversal" collapsed={true}>
                    Just some text to test me
                </SideBarCollapsable>
            </LeftSideBar>
        );
    };
}