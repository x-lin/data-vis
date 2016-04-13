import test from "tape";

import createAction from "../createAction";

test("Testing createAction", (assert) => {
    assert.test("should create the right action", (assert) => {
        const expected = {type: "TEST_ME_TYPE", aprop: [], anotherProp: {n: "abc"}};
        const actual = createAction("TEST_ME_TYPE", {aprop: [], anotherProp: {n:"abc"}});

        assert.deepEqual(expected, actual);

        assert.end();
    });

    assert.test("should work with empty properties", (assert) => {
        const expected = {type: "TEST_ME_TYPE"};
        const actual = createAction("TEST_ME_TYPE", {});

        assert.deepEqual(expected, actual);

        assert.end();
    });

    assert.test("should work with no properties", (assert) => {
        const expected = {type: "TEST_ME_TYPE"};
        const actual = createAction("TEST_ME_TYPE");

        assert.deepEqual(expected, actual);

        assert.end();
    });
});