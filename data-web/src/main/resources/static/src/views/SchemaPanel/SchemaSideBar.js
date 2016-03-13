import React from "react";

import LeftSideBar from "../widgets/LeftSideBar";
import SideBarCollapsable from "../widgets/SideBarCollapsable";

export default class extends React.Component {
    onClick(project) {
        this.props.searchSchema(project);
    }

    render() {
        return (
            <LeftSideBar>
                <SideBarCollapsable title="Projects">
                    <a href="http://localhost:8081/src/index.html#/schema/QCUBE" onClick={(project) => this.onClick("QCUBE")}>QCUBE</a><br/>
                    <a href="http://localhost:8081/src/index.html#/schema/CTASDERTC" onClick={(project) => this.onClick("CTASDERTC")}>CTASDERTC</a><br/>
                    <a href="http://localhost:8081/src/index.html#/schema/QPCOB" onClick={(project) => this.onClick("QPCOB")}>QPCOB</a><br/>
                    <a href="http://localhost:8081/src/index.html#/schema/PVCSB" onClick={(project) => this.onClick("PVCSB")}>PVCSB</a><br/>
                    <a href="http://localhost:8081/src/index.html#/schema/PVCSC" onClick={(project) => this.onClick("PVCSC")}>PVCSC</a><br/>

                    <div style={{paddingBottom: "10px"}} />
                </SideBarCollapsable>


            </LeftSideBar>
        );
    };
}