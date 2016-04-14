import { test } from "tape";

import { createNested, createPrimitive } from "./ActionsTestHelper";

export const executeTests = (assert, func, type, params) => {
    assert.test(`Testing ${func.name}`, (assert) => {
        assert.test("correct action should be created", (assert) => {
            const expected = createPrimitive(type, params);
            const actual = func.apply(null, getParamProps(params, expected));

            assert.deepEqual(actual, expected);
            assert.end();
        });

        assert.test("correct action should be created for nested types", (assert) => {
            const expected = createNested(type, params);
            const actual = func.apply(null, getParamProps(params, expected));

            assert.deepEqual(actual, expected);
            assert.end();
        });

        assert.test("should work with no parameter values", (assert) => {
            const expected = { type };

            if(params !== null && typeof params !== "undefined") {
                params.forEach((name) => {
                    expected[name] = undefined;
                });
            }

            const actual = func();

            assert.deepEqual(actual, expected);
            assert.end();
        });
    });
};

const getParamProps = (names, object) => {
    if(Array.isArray(names)) {
        return names.map((name) => {
            return object[name];
        });
    } else if(names === null || typeof names === "undefined") {
        return null;
    }
};