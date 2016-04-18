import { test } from "tape";
import { mockAxios, mockStore } from "./MockSetup";

import { fetchNeighborsSingleStart, fetchNeighborsSingleSuccess } from "../../action-creators/SearchNeighborsSingleActions";
import { getNeighborsSingle } from "../promises/GETNeighborsSingleActions";

test("Testing GETNeighborsSingleActions", (assert) => {
    const node = {
        key: "TEST-KEY",
        name: "dummy",
        type: "Feature"
    };

    const data = [{ typeKey: "FEAT", type: "Feature", key: "TEST-KEY", name: "Name val" }];
    const store = mockStore({ data: [] });

    const expectedActions = [
        fetchNeighborsSingleStart(node),
        fetchNeighborsSingleSuccess(node, data)
    ];

    mockAxios.onGet(`/search/generalNodes/neighborsSingle/${node.key}`)
        .reply(200, data);

    store
        .dispatch(getNeighborsSingle(node))
        .then(() => {
            assert.deepEqual(store.getActions(), expectedActions);
            assert.end();
        });
});
