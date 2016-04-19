import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    ITEM_FETCH_START, ITEM_FETCH_ERROR, ITEM_FETCH_SUCCESS, ITEMS_CLEAR,
    fetchStart, fetchSuccess, fetchError, clearItems
} from "../FetchItemActions";

test("Testing FetchItemActions", (assert) => {
    executeTests(assert, fetchStart, ITEM_FETCH_START, ["category", "key"]);
    executeTests(assert, fetchSuccess, ITEM_FETCH_SUCCESS, ["category", "key", "data"]);
    executeTests(assert, fetchError, ITEM_FETCH_ERROR, ["category", "key", "error"]);
    executeTests(assert, clearItems, ITEMS_CLEAR);
});
