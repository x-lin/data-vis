import { test } from "tape";
import { mockAxios, mockStore } from "./MockSetup";

import { fetchNeighborsStart, fetchNeighborsSuccess } from "../../action-creators/SearchNeighborsActions";
import { getNeighbors } from "../promises/GETNeighborsActions";
import { buildHttpParams } from "../../../utils/buildHttpParams";

test("Testing GETNeighborsActions", (assert) => {
    const key = "TEST-KEY";
    const category = "GeneralNode";
    const params = { limit: 50, type: "A" };
    const data = [{ typeKey: "FEAT", type: "Feature", key: "TEST-KEY", name: "Name val" }];

    assert.test("should dispatch an action", (assert) => {
        const store = mockStore({
            data: [],
            lanes: { lanes: [], filters: {} } });

        const expectedActions = [
            fetchNeighborsStart(category, key),
            fetchNeighborsSuccess(category, key, data)
        ];

        mockAxios.onGet(`/search/generalNodes/neighbors/${key}?`)
            .reply(200, data);

        store
            .dispatch(getNeighbors(category, key))
            .then(() => {
                assert.deepEqual(store.getActions(), expectedActions);
                assert.end();
            });
    });

    assert.test("should dispatch actions when parameters are specified", (assert) => {
        const store = mockStore({ data: [] });

        const expectedActions = [
            fetchNeighborsStart(category, key, params),
            fetchNeighborsSuccess(category, key, data)
        ];

        mockAxios.onGet(`/search/generalNodes/neighbors/${key}?${buildHttpParams(params)}`)
            .reply(200, data);

        store
            .dispatch(getNeighbors(category, key, params))
            .then(() => {
                assert.deepEqual(store.getActions(), expectedActions);
                assert.end();
            });
    });
});
