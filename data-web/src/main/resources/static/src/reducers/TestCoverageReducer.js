import { TEST_COVERAGE_FETCH_ERROR, TEST_COVERAGE_FETCH_SUCCESS, TEST_COVERAGE_FETCH_START }
    from "../actions/action-creators/TestCoverageActions";

export default (state = {data: []}, action) => {
    switch (action.type) {
        case TEST_COVERAGE_FETCH_START:
            return Object.assign({}, state, {
                status: TEST_COVERAGE_FETCH_START
            });
        case TEST_COVERAGE_FETCH_SUCCESS:
            console.log()

            return Object.assign({}, state, {
                data: action.data,
                error: {},
                status: TEST_COVERAGE_FETCH_SUCCESS
            });
        case TEST_COVERAGE_FETCH_ERROR:
            return Object.assign({}, state, {
                data: [],
                error: action.error,
                status: TEST_COVERAGE_FETCH_ERROR
            });
        default:
            return state;
    }
};