import { test } from "tape";
import { mockAxios, mockStore } from "./MockSetup";

import { fetchSuccess, fetchStart } from "../../action-creators/FetchItemActions";
import { getItem } from "../promises/GETItemActions";

test("Testing GETItemActions", (assert) => {
    const key = "TEST-KEY";
    const category = "GeneralNode";
    const data = [{ typeKey: "FEAT", type: "Feature", key: "TEST-KEY", name: "Name val" }];
    const store = mockStore({ data: [] });

    const expectedActions = [
        fetchStart(category, key),
        fetchSuccess(category, key, data)
    ];

    mockAxios.onGet(`/search/generalNodes/startLike/${key}?limit=10`)
        .reply(200, data);

    store
        .dispatch(getItem(category, key))
        .then(() => {
            assert.deepEqual(store.getActions(), expectedActions);
            assert.end();
        });
});
