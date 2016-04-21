import { REHYDRATE } from "redux-persist/constants";

import { SET_SIDEBAR_PANEL, DELETE_BOX_FROM_SIDEBAR, TOGGLE_BOX_FROM_SIDEBAR }
    from "../actions/action-creators/SidebarActions";
import { TEST_COVERAGE_FETCH_ERROR, TEST_COVERAGE_FETCH_SUCCESS, TEST_COVERAGE_FETCH_START }
    from "../actions/action-creators/TestCoverageActions";
import { RELATED_BUGS_FETCH_START, RELATED_BUGS_FETCH_SUCCESS, RELATED_BUGS_FETCH_ERROR }
    from "../actions/action-creators/RelatedBugsActions";
import Constants from "../config/Constants";

const setSidebarVisibility = (state, action) => {
    if (state.sidebar.visible !== action.visible) {
        const newSidebar = Object.assign({}, state.sidebar, {
            visible: action.visible
        });

        return Object.assign({}, state, {
            sidebar: newSidebar
        });
    } else {
        return state;
    }
};

const createTestCoverage = (state, action) => {
    switch (action.type) {
        case TEST_COVERAGE_FETCH_START:
            const obj = {
                id: action.id,
                node: action.node,
                data: [],
                status: "START",
                title: action.node.name,
                labels: [action.node.type],
                type: "Test Coverage",
                isCollapsed: false
            };

            return Object.assign({}, state, {
                data: [obj, ...state.data]
            });
        case TEST_COVERAGE_FETCH_SUCCESS:
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.id) {
                    const obj = Object.assign({}, state.data[i]);

                    obj.data = action.data;
                    obj.status = "SUCCESS";

                    return Object.assign({}, state, {
                        data: [
                            ...state.data.slice(0, i),
                            obj,
                            ...state.data.slice(i+1)
                        ]
                    });
                }
            }

            return state;
        case TEST_COVERAGE_FETCH_ERROR:
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.id) {
                    const obj = Object.assign({}, state.data[i]);

                    obj.status = "ERROR";

                    return Object.assign({}, state, {
                        data: [
                            ...state.data.slice(0, i),
                            obj,
                            ...state.data.slice(i+1)
                        ]
                    });
                }
            }

            return state;
        default:
            return state;
    }
};

const createRelatedBugs = (state, action) => {
    switch (action.type) {
        case RELATED_BUGS_FETCH_START:
            const obj = {
                id: action.id,
                node: action.node,
                data: [],
                status: "START",
                title: action.node.name,
                labels: [action.node.type],
                type: "Related Open Tickets",
                isCollapsed: false
            };

            return Object.assign({}, state, {
                data: [obj, ...state.data]
            });
        case RELATED_BUGS_FETCH_SUCCESS:
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.id) {
                    const obj = Object.assign({}, state.data[i]);

                    obj.data = action.data.reduce((array, entry) => {
                        for(let j = 0; j < array.length; j++) {
                            if(array[j].bug.key === entry.bug.key) {
                                array[j].paths.push(entry.path);
                                return array;
                            }
                        }

                        array.push({
                            bug: entry.bug,
                            paths: [entry.path]
                        });

                        return array;
                    }, []);

                    obj.status = "SUCCESS";

                    return Object.assign({}, state, {
                        data: [
                            ...state.data.slice(0, i),
                            obj,
                            ...state.data.slice(i+1)
                        ]
                    });
                }
            }

            return state;
        case RELATED_BUGS_FETCH_ERROR:
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.id) {
                    const obj = Object.assign({}, state.data[i]);

                    obj.status = "ERROR";

                    return Object.assign({}, state, {
                        data: [
                            ...state.data.slice(0, i),
                            obj,
                            ...state.data.slice(i+1)
                        ]
                    });
                }
            }

            return state;
        default:
            return state;
    }
};

export default (
    state = {
        sidebar: {
            obj: null,
            visible: false,
            key: null,
            sidePanels: Constants.sidePanels
        },
        data: []
    }, action
) => {
    switch (action.type) {
        case DELETE_BOX_FROM_SIDEBAR:
            for (let i = 0; i < state.data.length; i++) {
                if(state.data[i].id === action.id) {
                    if(state.data.length - 1 === 0) {
                        state.sidebar.visible = false;
                    }

                    return Object.assign({}, state, {
                        data: [
                            ...state.data.slice(0, i),
                            ...state.data.slice(i + 1)
                        ],
                        sidebar: state.sidebar
                    });
                }
            }

            return state;
        case TOGGLE_BOX_FROM_SIDEBAR:
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.id) {
                    const toggleData = Object.assign({}, state.data[i], {
                        isCollapsed: !state.data[i].isCollapsed
                    });

                    return Object.assign({}, state, {
                        data: [
                            ...state.data.slice(0, i),
                            toggleData,
                            ...state.data.slice(i + 1)
                        ]
                    });
                }
            }

            return state;
        case SET_SIDEBAR_PANEL:
            return setSidebarVisibility(state, action);
        case TEST_COVERAGE_FETCH_START:
        case TEST_COVERAGE_FETCH_SUCCESS:
        case TEST_COVERAGE_FETCH_ERROR:
            return createTestCoverage(state, action);
        case RELATED_BUGS_FETCH_ERROR:
        case RELATED_BUGS_FETCH_START:
        case RELATED_BUGS_FETCH_SUCCESS:
            return createRelatedBugs(state, action);
        //case REHYDRATE:
        //    state.sidebar.sidePanels.forEach((sidePanel) => {
        //        if (action.payload.layout && action.payload.layout.sidebar.key === sidePanel.key) {
        //            state.sidebar = Object.assign({}, state.sidebar, {
        //                obj: sidePanel.obj,
        //                key: sidePanel.key,
        //                visible: action.payload.layout.sidebar.visible
        //            });
        //        }
        //    });
        //
        //    return Object.assign({}, state, {
        //        sidebar: state.sidebar
        //    });
        default:
            return state;
    }
};
