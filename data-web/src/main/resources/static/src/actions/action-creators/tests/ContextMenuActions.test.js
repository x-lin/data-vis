import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";
import { UPSTREAM, DOWNSTREAM } from "../../../config/Defaults";

import {
    FILTER_NEIGHBOR_TYPES, ACTIVATE_CONTEXT, DEACTIVATE_CONTEXT, CLEAR_STATE,
    filterNeighborTypes, activateContext, deactivateContext, clearState
} from "../ContextMenuActions";

test("Testing ContextMenuActions", (assert) => {
    executeTests(assert, activateContext, ACTIVATE_CONTEXT, ["context"]);
    executeTests(assert, deactivateContext, DEACTIVATE_CONTEXT);
    executeTests(assert, clearState, CLEAR_STATE);

    assert.test("Testing filterNeighborTypes", assert => {
        assert.test("should create an action with a null filter direction", (assert) => {
            const expected = {type: FILTER_NEIGHBOR_TYPES, filterDirection: null};
            const actual1 = filterNeighborTypes(null);
            const actual2 = filterNeighborTypes();
            const actual3 = filterNeighborTypes("somethign else");

            assert.deepEqual(actual1, expected);
            assert.deepEqual(actual2, expected);
            assert.deepEqual(actual3, expected);
            assert.end();
        });

        assert.test("should create an action with an upstream filter direction", (assert) => {
            const expected = {type: FILTER_NEIGHBOR_TYPES, filterDirection: UPSTREAM};
            const actual = filterNeighborTypes(expected.filterDirection);

            assert.deepEqual(actual, expected);
            assert.end();
        });

        assert.test("should create an action with an upstream filter direction", (assert) => {
            const expected = {type: FILTER_NEIGHBOR_TYPES, filterDirection: DOWNSTREAM};
            const actual = filterNeighborTypes(expected.filterDirection);

            assert.deepEqual(actual, expected);
            assert.end();
        });
    });
});