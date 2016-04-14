import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    NEIGHBORTYPES_FETCH_START, NEIGHBORTYPES_FETCH_SUCCESS, NEIGHBORTYPES_FETCH_ERROR,
    fetchNeighborTypesStart, fetchNeighborTypesSuccess, fetchNeighborTypesError
} from "../SearchNeighborTypesActions";

test("Testing SearchNeighborTypesActions", (assert) => {
    executeTests(assert, fetchNeighborTypesStart, NEIGHBORTYPES_FETCH_START, ["node"]);
    executeTests(assert, fetchNeighborTypesSuccess, NEIGHBORTYPES_FETCH_SUCCESS, ["data"]);
    executeTests(assert, fetchNeighborTypesError, NEIGHBORTYPES_FETCH_ERROR, ["error"]);
});