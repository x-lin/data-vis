import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    SET_SIDEBAR_PANEL,
    setTestCoverageVisibility, setVisibility
} from "../SidebarActions";

test("Testing LayoutActions", (assert) => {
    executeTests(assert, setVisibility, SET_SIDEBAR_PANEL, ["visible"]);

    assert.test("action should have a key test added", (assert) => {
        const expected = { type: SET_SIDEBAR_PANEL, key: "test", visible: false };
        const actual = setTestCoverageVisibility(false);

        assert.deepEqual(expected, actual);
        assert.end();
    });
});
