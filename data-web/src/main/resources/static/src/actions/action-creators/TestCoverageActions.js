import createAction from "./createAction";

export const TEST_COVERAGE_FETCH_START = "TEST_COVERAGE_FETCH_START ";
export const TEST_COVERAGE_FETCH_SUCCESS = "TEST_COVERAGE_FETCH_SUCCESS";
export const TEST_COVERAGE_FETCH_ERROR = "TEST_COVERAGE_FETCH_ERROR";

export const TEST_COVERAGE_CLEAR = "TEST_COVERAGE_CLEAR";

export const fetchStart = (node, id) => createAction(
    TEST_COVERAGE_FETCH_START,
    { node, id }
);

export const fetchSuccess = (key, data, id) => createAction(
    TEST_COVERAGE_FETCH_SUCCESS,
    { key, data, id }
);

export const fetchError = (key, error, id) => createAction(
    TEST_COVERAGE_FETCH_ERROR,
    { key, error, id }
);

export const clear = () => createAction(
    TEST_COVERAGE_CLEAR
);
