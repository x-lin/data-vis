import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    NODETYPE_FETCH_ERROR, NODETYPE_FETCH_START, NODETYPE_FETCH_SUCCESS,
    fetchNodeTypeError, fetchNodeTypeStart, fetchNodeTypeSuccess
} from "../FetchNodeTypeActions";

test("Testing FetchNodeTypeActions", (assert) => {
    executeTests(assert, fetchNodeTypeStart, NODETYPE_FETCH_START);
    executeTests(assert, fetchNodeTypeSuccess, NODETYPE_FETCH_SUCCESS, ["data"]);
    executeTests(assert, fetchNodeTypeError, NODETYPE_FETCH_ERROR, ["error"]);
});