import { test } from "tape";
import { mockAxios, mockStore } from "./MockSetup";

import { fetchStart, fetchSuccess } from "../../action-creators/TestCoverageActions";
import { getCoverage } from "../promises/GETTestCoverageActions";

test("Testing GETNeighborsSingleActions", (assert) => {
    const node = {
        key: "TEST-KEY",
        name: "dummy",
        type: "Feature"
    };

    const data = [{ typeKey: "FEAT", type: "Feature", key: "TEST-KEY", name: "Name val" }];
    const store = mockStore({ data: [] });

    const expectedActions = [
        fetchStart(node),
        fetchSuccess(node.key, data)
    ];

    mockAxios.onGet(`/search/generalNodes/coverage/${node.key}`)
        .reply(200, data);

    store
        .dispatch(getCoverage(node))
        .then(() => {
            assert.deepEqual(store.getActions(), expectedActions);
            assert.end();
        });
});
