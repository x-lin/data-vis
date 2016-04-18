import { test } from "tape";

import { getNeighborsSingle } from "../promises/GETNeighborsSingleActions";
import { searchNeighborsSingle } from "../SearchNeighborsSingleActions";
import { createStore } from "../../../stores/ReduxStore";

test("Testing SearchNeighborsSingleActions", (assert) => {
    const withoutKeyNode = {
        type: "Feature",
        name: "dummy"
    };

    const node = Object.assign({}, withoutKeyNode, {
        key: "TEST-KEY"
    });

    assert.test("valid key should dispatch getNeighborsSingle", (assert) => {
        const { getState } = createStore();

        assert.plan(1);

        const dispatch = (action) => {
            if (action.toString() === getNeighborsSingle(node).toString()) {
                assert.pass();
            } else {
                assert.fail(`unknown action dispatched ${action.toString()}`);
            }
        };

        searchNeighborsSingle(node)(dispatch, getState);
    });

    assert.test("empty key should dispatch empty function", (assert) => {
        const { getState } = createStore();

        assert.plan(1);

        const dispatch = (action) => {
            if (action.toString() === (() => {}).toString()) {
                assert.pass();
            } else {
                assert.fail(`unknown action dispatched ${action.toString()}`);
            }
        };

        searchNeighborsSingle(withoutKeyNode)(dispatch, getState);
    });
});
