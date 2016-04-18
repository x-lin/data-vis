import { test } from "tape";

import { createStore } from "../../../stores/ReduxStore";
import { searchTestCoverage } from "../SearchTestCoverageActions";
import { setTestCoverageVisibility } from "../../action-creators/LayoutActions";
import { getCoverage } from "../../aggregated/promises/GETTestCoverageActions";

test("Testing SearchTestCoverageActions", (assert) => {
    const withoutKeyNode = {
        type: "Feature",
        name: "dummy"
    };

    const node = Object.assign({}, withoutKeyNode, {
        key: "TEST-KEY"
    });

    assert.test("valid key should dispatch actions", (assert) => {
        const { getState } = createStore();

        assert.plan(2);

        const dispatch = (action) => {
            if ((action.toString() === getCoverage(node).toString()) ||
                (action.toString() === setTestCoverageVisibility(true).toString())) {
                assert.pass();
            } else {
                assert.fail(`unknown action dispatched ${action.toString()}`);
            }
        };

        searchTestCoverage(node)(dispatch, getState);
    });

    assert.test("empty key should trigger empty dispatch ", (assert) => {
        const { getState } = createStore();

        assert.plan(1);

        const dispatch = (action) => {
            assert.equal(action.toString(), (() => {}).toString());
        };

        searchTestCoverage(withoutKeyNode)(dispatch, getState);
    });
});
