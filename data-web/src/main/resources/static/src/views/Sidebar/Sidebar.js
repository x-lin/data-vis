import React from "react";

import SidebarBox from "./SidebarBox";
import TestCoverageTableContainer from "../TestCoverageTable/TestCoverageTableContainer";
import RelatedBugsTableContainer from "./../RelatedBugsTable/RelatedBugsTableContainer";

class Sidebar extends React.Component {
    removeBox(id) {
        this.props.deleteBox(id);
    }

    toggleBox(id) {
        this.props.toggleBox(id);
    }

    render() {
        const { data } = this.props;

        const entries = data.map((entry) => {
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
                key={entry.id}
                onClose={() => this.removeBox(entry.id)}
                onCollapse={() => this.toggleBox(entry.id)}
                isCollapsed={entry.isCollapsed}
            />;

            return box;
        });

        return (
            <div style={{ padding: "10px", height: "100%" }}> {entries}</div>

        );
    }
}

Sidebar.propTypes = {
    data: React.PropTypes.array.isRequired,
    deleteBox: React.PropTypes.func.isRequired,
    toggleBox: React.PropTypes.func.isRequired
};

export default Sidebar;
