import React from "react";

import SidebarBox from "./SidebarBox";
import TestCoverageTableContainer from "../TestCoveragePanel/TestCoverageTableContainer";
import RelatedBugsTableContainer from "./RelatedBugsTableContainer";

class Sidebar extends React.Component {

    componentDidUpdate() {
        // TODO cache rendered components with status SUCCESS
        //this.props.addReactComponent(0, "dfas");
    }

    render() {
        const { data } = this.props;

        const entries = data.map((entry, index) => {
            if (entry.object) {
                return entry.object;
            } else {
                let body;

                if (entry.type === "Test Coverage") {
                    body = <TestCoverageTableContainer data={entry.data} status={entry.status} />;
                } else if (entry.type === "Related Open Tickets") {
                    body = <RelatedBugsTableContainer data={entry.data} status={entry.status} />;
                }

                const box = <SidebarBox
                    title={entry.title}
                    labels={entry.labels}
                    type={entry.type}
                    body={body}
                    status={entry.status}
                    isOpen={entry.isOpen}
                    key={index}
                    onClose={() => {
                        this.props.deleteBox(entry.id);
                    }
                    }
                />;


                return box;
            }

        });

        return (
            <div style={{padding: "10px", height: "100%"}}> {entries}</div>

        );
    }
}

Sidebar.propTypes = {
    data: React.PropTypes.array.isRequired,
    addReactComponent: React.PropTypes.func.isRequired,
    deleteBox: React.PropTypes.func.isRequired
};

export default Sidebar;
