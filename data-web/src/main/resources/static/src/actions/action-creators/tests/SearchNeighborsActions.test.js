import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    SEARCH_NEIGHBORS_START,
    searchNeighborsStart
} from "../SearchNeighborsActions";

test("Testing SearchNeighborsActions", (assert) => {
    executeTests(assert, searchNeighborsStart, SEARCH_NEIGHBORS_START, ["category", "key"]);
});