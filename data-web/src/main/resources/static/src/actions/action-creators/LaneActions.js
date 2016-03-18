export const ATTACH_TO_LANE = "ATTACH_TO_LANE";
export const MOVE = "MOVE_NOTE";
export const INIT_LANE = "INIT_LANE";
export const SET_FILTER_VALUE ="SET_FILTER_VALUE";

export const attachToLane = (laneId, note) => {
    return {
        type: ATTACH_TO_LANE,
        laneId,
        note
    }
};

export const move = (sourceNote, targetNote) => {
    return {
        type: MOVE,
        sourceNote,
        targetNote
    }
};

export const initLane = (data) => {
    return {
        type: INIT_LANE,
        data
    }
}

export const setFilterValue = (name, value) => {
    return {
        type: SET_FILTER_VALUE,
        name,
        value
    }
}