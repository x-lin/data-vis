import { TOGGLE_FILTER_ITEM_CATEGORY, INIT_GRAPH_FILTER } from "../actions/action-creators/GraphFilterActions";

export default (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_FILTER_ITEM_CATEGORY:
            if (state.hasOwnProperty(action.category)) {
                return (Object.assign({}, state, {
                    [action.category]: !state[action.category]
                }));
            } else {
                return (Object.assign({}, state, {
                    [action.category]: false
                }));
            }
        case INIT_GRAPH_FILTER:
            return action.data.reduce((previous, currentVal) => {
                previous[currentVal.name] = true;
                return previous;
            }, {});
        default:
            return state;
    }
};
