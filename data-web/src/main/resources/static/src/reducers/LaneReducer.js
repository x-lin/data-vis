import { ATTACH_TO_LANE, MOVE, INIT_LANE, SET_FILTER_VALUE } from "../actions/action-creators/LaneActions";

export const PRIORITIZED = "PRIORITIZED";
export const EXCLUDED = "EXCLUDED";
export const UNORDERED = "UNORDERED";

export default (
    state = {
        lanes: [],
        filters: {"upstream" : true, "downstream" : true, "limit" : 20}
    }, action
) => {
    switch (action.type) {
        case INIT_LANE:
            const array = [PRIORITIZED, EXCLUDED, UNORDERED];
            let unordered = [];
            let excluded = [];

            action.data.forEach(note => {
                if(note.key !== "FLD" && note.key !== "SET") {
                    unordered.push(note);
                } else {
                    excluded.push(note);
                }
            });

            const lanes2 = array.map((lane, index) => {
                switch (lane) {
                    case EXCLUDED:
                        return getInit(excluded, lane, index);
                    case UNORDERED:
                        return getInit(unordered, lane, index);
                    default:
                        return getInit([], lane, index);
                }
            });

            return Object.assign({}, state, {
                lanes: lanes2
            });
        case ATTACH_TO_LANE:
            const lanes1 = state.lanes.map(lane => {
                if(lane.notes.indexOf(action.note) >= 0) {
                    lane.notes = lane.notes.filter(note => note !== action.note);
                }

                if(lane.id === action.laneId) {
                    if(lane.notes.indexOf(action.note) >= 0) {
                        console.warn('Already attached note to lane', lane);
                    }
                    else {
                        lane.notes = [action.note, ...lane.notes];
                    }
                }

                return lane;
            });

            return Object.assign({}, state, {
                lanes: lanes1
            });
        case MOVE:
            const lanes = [...state.lanes];

            const sourceLane = lanes.filter(lane => lane.notes.indexOf(action.sourceNote) >= 0)[0];
            const targetLane = lanes.filter(lane => lane.notes.indexOf(action.targetNote) >= 0)[0];

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

            return Object.assign({}, state, {
                lanes: lanes
            });
        case SET_FILTER_VALUE:
            const filters = state.filters;
            filters[action.name] = action.value;

            return Object.assign({}, state, {
                filters
            });

        default:
            return state;
    }
};

function getInit(data, lane, index) {
    return {
        id: index,
        key: lane,
        notes: data
    }
}