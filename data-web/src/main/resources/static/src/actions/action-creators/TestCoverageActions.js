export const TEST_COVERAGE_FETCH_START = "TEST_COVERAGE_FETCH_START ";
export const TEST_COVERAGE_FETCH_SUCCESS = "TEST_COVERAGE_FETCH_SUCCESS";
export const TEST_COVERAGE_FETCH_ERROR = "TEST_COVERAGE_FETCH_ERROR";

export const TEST_COVERAGE_CLEAR = "TEST_COVERAGE_CLEAR";

export const fetchStart = (key) => {
    return {
        type: TEST_COVERAGE_FETCH_START,
        key
    }
};

export const fetchSuccess = (key, data) => {
    return {
        type: TEST_COVERAGE_FETCH_SUCCESS,
        data
    }
};

export const fetchError = (key, error) => {
    return {
        type: TEST_COVERAGE_FETCH_ERROR,
        key,
        error
    }
};

export const clear = () => {
    return {
        type: TEST_COVERAGE_CLEAR
    }
};
