import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    NEIGHBORS_SINGLE_FETCH_ERROR, NEIGHBORS_SINGLE_FETCH_START, NEIGHBORS_SINGLE_FETCH_SUCCESS,
    fetchNeighborsSingleError, fetchNeighborsSingleSuccess, fetchNeighborsSingleStart
} from "../SearchNeighborsSingleActions";

test("Testing SearchNeighborsSingleActions", (assert) => {
    executeTests(assert, fetchNeighborsSingleStart, NEIGHBORS_SINGLE_FETCH_START, ["node"]);
    executeTests(assert, fetchNeighborsSingleSuccess, NEIGHBORS_SINGLE_FETCH_SUCCESS, ["node", "data"]);
    executeTests(assert, fetchNeighborsSingleError, NEIGHBORS_SINGLE_FETCH_ERROR, ["node", "error"]);
});
