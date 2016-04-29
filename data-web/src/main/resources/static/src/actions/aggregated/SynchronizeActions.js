import { synchronize } from "./promises/GETSynchronizeActions";

export const synchronizeGraph = () => {
    return (dispatch, getState) => {
        const nodes = getState().graph.present.nodes;

        return dispatch(synchronize(nodes));
    };
};
