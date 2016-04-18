import React from "react";

import RightToggableSideBar from "../widgets/RightToggableSideBar";

export default () => {
    return (
        <RightToggableSideBar hasPadding>
            <div className="box box-default" style={{ color: "#000000" }}>
                <div className="box-body">
                    <p>
                        <strong>General graph panel behaviors</strong><br />
                    </p>

                    <p>
                        <code>MOUSE WHEEL</code>: Zooming. <br />
                        <code>LEFT CLICK</code> or <code>MOUSE WHEEL</code> + <code>MOUSE MOVE</code>: Panning. <br />
                    </p>
                    <p>
                        <strong>Custom node behaviors</strong><br />
                    </p>
                    <p>
                        <code>MOUSE HOVER</code>: Tooltip. <br />
                        <code>RIGHT CLICK</code>: Custom context menu. <br />
                        <code>DOUBLE LEFT CLICK/</code>: Node expansion. <br />
                        <code>CTRL + LEFT CLICK</code>: Marking connected nodes. To release: <code>LEFT CLICK</code> on any node. <br />
                    </p>
                </div>
            </div>
            <div className="box box-default" style={{ color: "#000000" }}>
                <div className="box-body">
                    <p>
                        <strong>About the data</strong>
                    </p>

                    <ul style={{ paddingLeft: "1.2em" }}>
                        <li>Pulled from Jama and JIRA.</li>
                        <li>Items with status "Deleted" in Jama or status "Closed" in JIRA are not stored / will be deleted.</li>
                        <li>Relationships from Jama are stored as unidirectional edges, relationships from JIRA as bidirectional edges. Relationships that exist in both use Jama mappings.</li>
                        <li>Parent/children relationships are treated equally to upstream/downstream relationships (i.e., no difference in querying).</li>
                    </ul>
                </div>
            </div>
        </RightToggableSideBar>
    );
};
