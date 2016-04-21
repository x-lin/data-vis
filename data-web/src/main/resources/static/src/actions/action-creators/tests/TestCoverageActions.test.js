import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    TEST_COVERAGE_FETCH_START, TEST_COVERAGE_FETCH_SUCCESS, TEST_COVERAGE_FETCH_ERROR, TEST_COVERAGE_CLEAR,
    fetchStart, fetchSuccess, fetchError, clear
} from "../TestCoverageActions";

test("Testing TestCoverageActions", (assert) => {
    executeTests(assert, fetchStart, TEST_COVERAGE_FETCH_START, ["node", "id"]);
    executeTests(assert, fetchSuccess, TEST_COVERAGE_FETCH_SUCCESS, ["key", "data", "id"]);
    executeTests(assert, fetchError, TEST_COVERAGE_FETCH_ERROR, ["key", "error", "id"]);
    executeTests(assert, clear, TEST_COVERAGE_CLEAR);
});
