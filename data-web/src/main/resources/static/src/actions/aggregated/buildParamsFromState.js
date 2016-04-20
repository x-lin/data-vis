import { createParams } from "./SearchNeighborsParams";
import { PRIORITIZED, EXCLUDED } from "../../reducers/laneReducer";

export const buildParamsFromState = (state) => {
    const paramsFunc = createParams();
    const { lanes, filters } = state.lanes;

    lanes.forEach((lane) => {
        if (lane.key === PRIORITIZED) {
            const priority = lane.notes.map(currentVal => currentVal.key);
            paramsFunc.setPriorities(priority);
        } else if (lane.key === EXCLUDED) {
            const excluded = lane.notes.map(currentVal => currentVal.key);
            paramsFunc.setExcluded(excluded);
        }
    });

    paramsFunc
        .setUpstream(filters.upstream)
        .setDownstream(filters.downstream)
        .setLimit(filters.limit);

    return paramsFunc.getParams();
};
