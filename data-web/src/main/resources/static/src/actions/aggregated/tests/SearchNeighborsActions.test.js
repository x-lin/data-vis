import { test } from "tape";

import { getNeighbors } from "../promises/GETNeighborsActions";
import { searchNeighbors, expandNeighbors } from "../SearchNeighborsActions";
import { clearGraph } from "../../action-creators/GraphActions";
import { createStore } from "../../../stores/ReduxStore";

test("Testing SearchNeighborsActions", (assert) => {
    const category = "Feature";
    const key = "TEST-KEY";

    assert.test("Testing expandNeighbors", (assert) => {
        const { getState } = createStore();

        expandNeighbors(category, key)((func) => {
            assert.equal(func.toString(), getNeighbors(category, key).toString());
            assert.end();
        }, getState);
    });

    assert.test("Testing searchNeighbors", (assert) => {
        assert.test("valid key should dispatch getNeighbors", (assert) => {
            const { getState } = createStore();

            assert.plan(2);

            const dispatch = (action) => {
                if ((action.toString() === getNeighbors(category, key).toString()) ||
                    (action.toString() === clearGraph().toString())) {
                    assert.pass();
                } else {
                    assert.fail(`unknown action dispatched ${action.toString()}`);
                }
            };

            searchNeighbors(category, key)(dispatch, getState);
        });

        assert.test("empty key should trigger empty dispatch ", (assert) => {
            const { getState } = createStore();

            assert.plan(1);

            const dispatch = (action) => {
                assert.equal(action.toString(), (() => {}).toString());
            };

            searchNeighbors(category)(dispatch, getState);
        });
    });
});
