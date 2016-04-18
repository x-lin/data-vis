import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    NEIGHBORS_FETCH_ERROR, NEIGHBORS_FETCH_START, NEIGHBORS_FETCH_SUCCESS,
    fetchNeighborsError, fetchNeighborsStart, fetchNeighborsSuccess
} from "../SearchNeighborsActions";

test("Testing FetchNeighborsActions", (assert) => {
    executeTests(assert, fetchNeighborsStart, NEIGHBORS_FETCH_START, ["category", "key"]);
    executeTests(assert, fetchNeighborsSuccess, NEIGHBORS_FETCH_SUCCESS, ["category", "key", "neighbors"]);
    executeTests(assert, fetchNeighborsError, NEIGHBORS_FETCH_ERROR, ["category", "key", "error"]);
});