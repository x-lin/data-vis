import React from "react";
import { DropTarget } from "react-dnd";

import Notes from "./Notes";
import ItemTypes from "../../config/itemTypes";
import SideBarCollapsable from "../widgets/SideBarCollapsable";

const Lane = ({ connectDropTarget, lane, notes, onMove }) => {
    return connectDropTarget(
        <div> {/* wrapper because of restriction with DnD only recognizing native elements */}
            <SideBarCollapsable title={lane.key} >
                <Notes notes={notes} onMove={onMove} />
            </SideBarCollapsable>
        </div>
    );
};

Lane.propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    lane: React.PropTypes.object.isRequired,
    notes: React.PropTypes.array.isRequired,
    onMove: React.PropTypes.func.isRequired
};

const noteTarget = {
    hover(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const sourceNote = sourceProps.note;

        if (!targetProps.lane.notes.length) {
            targetProps.attachToLane(targetProps.lane.id, sourceNote);
        }
    }
};

export default DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))(Lane);
