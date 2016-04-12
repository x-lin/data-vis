import { getNeighborsSingle } from "../aggregated/GETNeighborsSingle";

export const searchNeighborsSingle = (node) => {
    return (dispatch, getState) => {
        if( !getState().contextmenu.searchNode.hasOwnProperty("key") ||
            (getState().contextmenu.searchNode.hasOwnProperty("key") && getState().contextmenu.searchNode.key !== node.key)) {
            return dispatch(getNeighborsSingle(node));
        } else {
            return dispatch(() => {});
        }
    }
};