import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    SET_SEARCH_CATEGORY, SET_SEARCH_INPUT_VALUE, SET_SEARCH_SELECTED_INDEX,
    setSearchCategory, setSearchInputValue, setSearchSelectedIndex
} from "../SearchBarActions";

test("Testing SearchBarActions", (assert) => {
    executeTests(assert, setSearchCategory, SET_SEARCH_CATEGORY, ["value"]);
    executeTests(assert, setSearchInputValue, SET_SEARCH_INPUT_VALUE, ["value"]);
    executeTests(assert, setSearchSelectedIndex, SET_SEARCH_SELECTED_INDEX, ["value"]);
});
