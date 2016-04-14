import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    TOGGLE_FILTER_ITEM_CATEGORY, FILTER_ITEM_CATEGORY, UNFILTER_ITEM_CATEGORY, INIT_GRAPH_FILTER,
    toggleFilterItemCategory, filterItemCategory, unfilterItemCategory, initGraphFilter
} from "../GraphFilterActions";

test("Testing GraphFilterActiosn", (assert) => {
    executeTests(assert, toggleFilterItemCategory, TOGGLE_FILTER_ITEM_CATEGORY, ["category"]);
    executeTests(assert, filterItemCategory, FILTER_ITEM_CATEGORY, ["category"]);
    executeTests(assert, unfilterItemCategory, UNFILTER_ITEM_CATEGORY, ["category"]);
    executeTests(assert, initGraphFilter, INIT_GRAPH_FILTER, ["data"]);
});