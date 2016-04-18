import { test } from "tape";
import { mockAxios, mockStore } from "./MockSetup";

import { fetchNeighborTypesStart, fetchNeighborTypesSuccess } from "../../action-creators/SearchNeighborTypesActions";
import { getNeighborTypes } from "../promises/GETNeighborTypesActions";

test("Testing GETNeighborsTypesActions", (assert) => {
    const node = {
        key: "TEST-KEY",
        name: "dummy",
        type: "Feature"
    };

    const data = [{ typeKey: "FEAT", type: "Feature", key: "TEST-KEY", name: "Name val" }];
    const store = mockStore({ data: [] });

    const expectedActions = [
        fetchNeighborTypesStart(node),
        fetchNeighborTypesSuccess(data)
    ];

    mockAxios.onGet(`/search/generalNodes/neighborTypes/${node.key}`)
        .reply(200, data);

    store
        .dispatch(getNeighborTypes(node))
        .then(() => {
            assert.deepEqual(store.getActions(), expectedActions);
            assert.end();
        });
});
