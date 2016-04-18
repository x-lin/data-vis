import { getNeighborsSingle } from "./promises/GETNeighborsSingleActions";

export const searchNeighborsSingle = (node) => {
    return (dispatch, getState) => {
        const searchNode = getState().contextmenu.searchNode;

        if (node.key && (!searchNode.hasOwnProperty("key") ||
            (searchNode.hasOwnProperty("key") && searchNode.key !== node.key))) {
            return dispatch(getNeighborsSingle(node));
        } else {
            return dispatch(() => {});
        }
    };
};
