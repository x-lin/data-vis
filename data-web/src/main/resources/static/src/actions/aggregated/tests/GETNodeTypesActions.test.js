import { test } from "tape";
import { mockAxios, mockStore } from "./MockSetup";

import { fetchNodeTypeStart, fetchNodeTypeSuccess } from "../../action-creators/FetchNodeTypeActions";
import { getNodeTypes } from "../promises/GETNodeTypesActions";

test("Testing GETNodeTypesActions", (assert) => {
    const data = [{ typeKey: "FEAT", type: "Feature", key: "TEST-KEY", name: "Name val" }];
    const store = mockStore({ data: [] });

    const expectedActions = [
        fetchNodeTypeStart(),
        fetchNodeTypeSuccess(data)
    ];

    mockAxios.onGet("/search/nodeTypes")
        .reply(200, data);

    store
        .dispatch(getNodeTypes())
        .then(() => {
            assert.deepEqual(store.getActions(), expectedActions);
            assert.end();
        });
});
