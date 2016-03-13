import { lanes, notes } from "../config/LaneData";
import { ATTACH_TO_LANE, MOVE } from "../actions/action-creators/LaneActions";

export default (
    state = init(), action
) => {
    switch (action.type) {
        case ATTACH_TO_LANE:
            return state.map(lane => {
                if(lane.notes.includes(action.note)) {
                    lane.notes = lane.notes.filter(note => note !== action.note);
                }

                if(lane.id === action.laneId) {
                    if(lane.notes.includes(action.note)) {
                        console.warn('Already attached note to lane', lanes);
                    }
                    else {
                        lane.notes = [action.note, ...lane.notes];
                    }
                }

                return lane;
            });
        case MOVE:
            const lanes = [...state];

            const sourceLane = lanes.filter(lane => lane.notes.includes(action.sourceNote))[0];
            const targetLane = lanes.filter(lane => lane.notes.includes(action.targetNote))[0];

            const sourceNoteIndex = sourceLane.notes.indexOf(action.sourceNote);
            const targetNoteIndex = targetLane.notes.indexOf(action.targetNote);

            //remove from source index
            sourceLane.notes = [
                ...sourceLane.notes.slice(0, sourceNoteIndex),
                ...sourceLane.notes.slice(sourceNoteIndex+1)
            ];

            //add at target index
            targetLane.notes = [
                ...targetLane.notes.slice(0, targetNoteIndex),
                action.sourceNote,
                ...targetLane.notes.slice(targetNoteIndex)
            ];

            return lanes;
        default:
            return state;
    }
};

function init() {
    return lanes.map((lane, index) => {
        return {
            id: index,
            key: lane,
            notes: lane === "UNORDERED" ? initNotes(notes) : []
        }
    });
}

function initNotes(notes) {
    return notes.map((note, index) => {
        return {
            id: index,
            key: note
        }
    })
}