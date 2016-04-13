import createAction from "./createAction";

export const TEST_COVERAGE_FETCH_START = "TEST_COVERAGE_FETCH_START ";
export const TEST_COVERAGE_FETCH_SUCCESS = "TEST_COVERAGE_FETCH_SUCCESS";
export const TEST_COVERAGE_FETCH_ERROR = "TEST_COVERAGE_FETCH_ERROR";

export const TEST_COVERAGE_CLEAR = "TEST_COVERAGE_CLEAR";

export const fetchStart = (key, name) => createAction(
    TEST_COVERAGE_FETCH_START,
    { key, name }
);

export const fetchSuccess = (key, data) => createAction(
    TEST_COVERAGE_FETCH_SUCCESS,
    { key, data }
);

export const fetchError = (key, error) => createAction(
    TEST_COVERAGE_FETCH_ERROR,
    { key, error }
);

export const clear = () => createAction(
    TEST_COVERAGE_CLEAR
);
